# Docker Setup for PetCare Web

This document provides instructions for running the PetCare frontend with Docker.

## Prerequisites

- Docker 20.10+
- Docker Compose 2.0+
- Backend API running at `http://localhost:8000` (or configured API URL)

## Development Mode

### Quick Start

```bash
docker network create gateway_net

docker compose up -d

docker compose logs -f petcare-web
```

Access the application at `http://localhost:3000`

### Development Features

- **Hot Reload**: Code changes are automatically reflected
- **Volume Mounting**: Source code is mounted for live editing
- **Fast Startup**: No build step required

### Development Commands

```bash
# Start development server
docker compose up -d

# View logs
docker compose logs -f petcare-web

# Restart container
docker compose restart petcare-web

# Stop container
docker compose down

# Rebuild container
docker compose up -d --build
```

## Production Mode

### Build Production Image

```bash
docker compose -f docker-compose.prod.yml build
```

### Run Production Container

```bash
docker compose -f docker-compose.prod.yml up -d
```

### Production Features

- **Optimized Build**: Multi-stage build for minimal image size
- **Standalone Output**: Next.js standalone mode for faster startup
- **Production Server**: Runs on Node.js production server
- **Environment Variables**: Configured via `.env.production`

## Environment Configuration

### Development (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_BASE_PATH=/api/v1
NEXT_PUBLIC_APP_NAME=PetCare
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Production (.env.production)

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_API_BASE_PATH=/api/v1
NEXT_PUBLIC_APP_NAME=PetCare
NEXT_PUBLIC_APP_URL=https://your-frontend-domain.com
```

## Docker Network

The application uses the `gateway_net` network to communicate with the backend:

```bash
# Create network
docker network create gateway_net

# Verify network
docker network ls | grep gateway_net

# Inspect network
docker network inspect gateway_net
```

## Troubleshooting

### Port Already in Use

```bash
# Check what's using port 3000
sudo lsof -i :3000

# Kill process if needed
sudo kill -9 <PID>
```

### Container Won't Start

```bash
# Check logs
docker compose logs petcare-web

# Check container status
docker compose ps

# Remove and rebuild
docker compose down
docker compose up -d --build
```

### Changes Not Reflecting

```bash
# In development
docker compose restart petcare-web

# In production
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d --build
```

### Clear Docker Cache

```bash
# Remove all stopped containers
docker container prune -f

# Remove unused images
docker image prune -a -f

# Remove unused volumes
docker volume prune -f
```

## Image Details

### Development Image

- **Base**: `node:20-alpine`
- **Size**: ~500MB
- **Startup**: ~3-5 seconds
- **Use Case**: Local development

### Production Image

- **Base**: `node:20-alpine` (multi-stage)
- **Size**: ~150MB (optimized)
- **Startup**: ~1-2 seconds
- **Use Case**: Production deployment

## Deployment Automation

The project includes a `deploy.sh` script for automated production deployment:

```bash
./deploy.sh
```

This script:

1. Runs pre-flight checks
2. Creates backups
3. Builds new image
4. Stops current container
5. Starts new container
6. Performs health checks
7. Rolls back on failure

See the script for detailed documentation.

## Best Practices

### Development

- Use `docker-compose.yml` for local development
- Mount source code as volumes for hot reload
- Use `.env.local` for environment variables

### Production

- Use `docker-compose.prod.yml` for production
- Build optimized images with multi-stage builds
- Use `.env.production` for environment variables
- Always test builds before deployment
- Keep images updated with security patches

## Additional Resources

- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
