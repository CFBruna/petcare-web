# Quality Tools Setup Guide

## 🚀 Quick Setup

After cloning the repository, run:

```bash
pnpm install
pnpm exec husky init
```

The Husky hooks will be automatically configured.

## 📋 What Gets Checked

### Pre-commit Hook

Runs automatically before every commit:

- **ESLint**: Fixes linting issues
- **Prettier**: Formats code
- **TypeScript**: Type checking (in CI only)

### Commit Message Hook

Validates commit messages follow Conventional Commits:

- ✅ `feat(auth): add login page`
- ✅ `fix(ui): button alignment`
- ✅ `chore(deps): update dependencies`
- ❌ `updated stuff`
- ❌ `fix bug`

### CI Pipeline (GitHub Actions)

Runs on every push and pull request:

1. Type Check (`tsc --noEmit`)
2. Lint Check (`pnpm run lint`)
3. Build Check (`pnpm run build`)

## 🔧 Available Commands

```bash
pnpm run format          # Format all files with Prettier
pnpm run lint            # Check linting
pnpm run type-check      # Check TypeScript types
pnpm run build           # Build for production
```

## 🎯 Commit Scopes

Valid scopes for commits:

- `ui` - UI components and styling
- `api` - API integration
- `auth` - Authentication
- `pets` - Pet management
- `appointments` - Appointment scheduling
- `store` - Product store
- `health` - Health records
- `config` - Configuration changes
- `deps` - Dependency updates
- `ci` - CI/CD changes

## ⚠️ Bypassing Hooks (Not Recommended)

```bash
git commit --no-verify
```

**Warning**: CI will still catch issues, so this only delays the feedback.
