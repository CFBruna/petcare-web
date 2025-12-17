#!/bin/bash

# ============================================
# PetCare Web - Production Deployment Script
# ============================================

set -e  # Exit on error

echo "🚀 Starting PetCare Web deployment..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
BACKUP_DIR="backups"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_NAME="petcare-web-${TIMESTAMP}"

# ============================================
# 1. Pre-flight Checks
# ============================================
echo -e "${YELLOW}[1/7] Running pre-flight checks...${NC}"

# Check if running on correct branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${RED}Error: Not on main branch. Currently on: $CURRENT_BRANCH${NC}"
    exit 1
fi

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo -e "${RED}Error: Uncommitted changes detected. Please commit or stash changes.${NC}"
    exit 1
fi

# Pull latest changes
echo "Pulling latest changes from main..."
git pull origin main

echo -e "${GREEN}✓ Pre-flight checks passed${NC}"

# ============================================
# 2. Create Backup
# ============================================
echo -e "${YELLOW}[2/7] Creating backup...${NC}"

mkdir -p $BACKUP_DIR

# Create backup directory
mkdir -p "$BACKUP_DIR/$BACKUP_NAME"

# Backup current deployment (if exists)
if [ -f "docker-compose.prod.yml" ]; then
    docker compose -f docker-compose.prod.yml ps -q petcare-web > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        docker commit petcare-web-prod "$BACKUP_NAME" || true
    fi
fi

echo -e "${GREEN}✓ Backup created: $BACKUP_NAME${NC}"

# ============================================
# 3. Build Docker Image
# ============================================
echo -e "${YELLOW}[3/7] Building Docker image...${NC}"

# Load environment variables
if [ -f ".env.production" ]; then
    export $(cat .env.production | grep -v '^#' | xargs)
fi

# Build production image
docker compose -f docker-compose.prod.yml build --no-cache

echo -e "${GREEN}✓ Docker image built${NC}"

# ============================================
# 4. Stop Current Container
# ============================================
echo -e "${YELLOW}[4/7] Stopping current container...${NC}"

docker compose -f docker-compose.prod.yml down || true

echo -e "${GREEN}✓ Current container stopped${NC}"

# ============================================
# 5. Start New Container
# ============================================
echo -e "${YELLOW}[5/7] Starting new container...${NC}"

docker compose -f docker-compose.prod.yml up -d

echo -e "${GREEN}✓ New container started${NC}"

# ============================================
# 6. Health Check
# ============================================
echo -e "${YELLOW}[6/7] Running health checks...${NC}"

# Wait for container to be ready
echo "Waiting for container to be healthy..."
RETRIES=15
WAIT_TIME=2

for i in $(seq 1 $RETRIES); do
    if docker compose -f docker-compose.prod.yml ps | grep -q "healthy"; then
        echo -e "${GREEN}✓ Container is healthy${NC}"
        break
    fi
    
    if [ $i -eq $RETRIES ]; then
        echo -e "${RED}Error: Container failed health check${NC}"
        echo "Rolling back..."
        docker compose -f docker-compose.prod.yml down
        if docker images | grep -q "$BACKUP_NAME"; then
            docker tag "$BACKUP_NAME" petcare-web-prod
            docker compose -f docker-compose.prod.yml up -d
        fi
        exit 1
    fi
    
    echo "Attempt $i/$RETRIES - waiting ${WAIT_TIME}s..."
    sleep $WAIT_TIME
done

# Test HTTP endpoint
echo "Testing HTTP endpoint..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 || echo "000")

if [ "$HTTP_CODE" != "200" ]; then
    echo -e "${RED}Error: HTTP health check failed (code: $HTTP_CODE)${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Health checks passed${NC}"

# ============================================
# 7. Cleanup
# ============================================
echo -e "${YELLOW}[7/7] Cleaning up...${NC}"

# Remove old backups (keep last 5)
cd $BACKUP_DIR
ls -t | tail -n +6 | xargs -r rm -rf
cd ..

# Remove dangling images
docker image prune -f

echo -e "${GREEN}✓ Cleanup completed${NC}"

# ============================================
# Deployment Summary
# ============================================
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}   Deployment Successful! 🎉${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Container Status:"
docker compose -f docker-compose.prod.yml ps
echo ""
echo "Access the application at:"
echo "  → http://localhost:3000"
echo ""
echo "View logs:"
echo "  → docker compose -f docker-compose.prod.yml logs -f petcare-web"
echo ""
echo "Backup saved as: $BACKUP_NAME"
echo ""
