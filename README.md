# PetCare - Modern Pet Care Management System

[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-9.0-f69220?logo=pnpm)](https://pnpm.io/)
[![Code Style: Prettier](https://img.shields.io/badge/Code_Style-Prettier-ff69b4?logo=prettier)](https://prettier.io/)
[![Commits: Conventional](https://img.shields.io/badge/Commits-Conventional-fe5196?logo=conventionalcommits)](https://conventionalcommits.org/)

A comprehensive pet care management platform built with **Next.js 15** and **Django 5**, following **Clean Architecture** and **Domain-Driven Design** principles.

## 🌟 Features

### For Pet Owners

- **Pet Management**: Register and manage multiple pets with detailed profiles
- **Appointment Scheduling**: Book grooming, veterinary, and vaccination services
- **Health Records**: Track medical history and vaccination status
- **Product Store**: Browse and purchase pet care products
- **Dashboard**: Unified view of upcoming appointments and pet information

### For Administrators

- **Service Management**: Configure available services and pricing
- **Appointment Calendar**: Visual calendar with appointment management
- **AI-Powered Scheduling**: Intelligent appointment suggestions based on history
- **Customer Analytics**: Track customer engagement and revenue
- **Inventory Management**: Manage product catalog and stock

## 🏗️ Architecture

This frontend follows **Clean Architecture** with clear separation of concerns:

```
src/
├── core/
│   ├── domain/              # Entities, Value Objects, Repository Interfaces
│   │   ├── entities/        # Pet, Customer, Appointment, Product, HealthRecord
│   │   └── repositories/    # Interface definitions
│   └── application/         # Use Cases and DTOs
├── infrastructure/          # External concerns (API Client, Repository Implementations)
├── presentation/            # React Components, Hooks, UI Layer
│   ├── components/          # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   └── lib/                 # Utilities and helpers
└── app/                     # Next.js App Router (Routes and Pages)
```

### Layer Responsibilities

1. **Domain Layer**: Pure business entities and business rules
2. **Application Layer**: Use cases orchestrating business logic
3. **Infrastructure Layer**: API communication, data persistence
4. **Presentation Layer**: UI components, user interactions, styling

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 20.x or higher
- **npm** or **yarn**
- **Backend**: Django API running at `http://localhost:8000`

### Installation

#### Option 1: Docker (Recommended)

```bash
docker network create gateway_net

docker compose up -d

docker compose logs -f petcare-web
```

Access: `http://localhost:3000`

For production deployment, see [DOCKER.md](DOCKER.md).

#### Option 2: Local Development

```bash
pnpm install

cp .env.local.example .env.local

pnpm run dev
```

### Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📦 Tech Stack

### Core

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript 5.7](https://www.typescriptlang.org/)** - Type safety (strict mode)

### State Management & Data Fetching

- **[TanStack Query](https://tanstack.com/query)** - Server state and caching
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Global client state
- **[Axios](https://axios-http.com/)** - HTTP client with interceptors

### Styling & UI

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **Custom Design System** - Consistent color palette and typography

### Forms & Validation

- **[React Hook Form](https://react-hook-form.com/)** - Performant forms
- **[Zod](https://zod.dev/)** - Schema validation

## 🎨 Design System

### Color Palette

```css
Primary (Trust & Professionalism):   #0ea5e9 (Sky Blue)
Secondary (Energy & Warmth):          #f59e0b (Amber)
Accent (Health & Success):            #10b981 (Green)
Neutral Grays:                        #f3f4f6 to #1f2937
```

### Typography

- **Headings**: [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts)
- **Body Text**: [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)

## 📡 API Integration

### Backend Endpoints

The frontend consumes Django REST API endpoints:

| Module         | Endpoint            | Description               |
| -------------- | ------------------- | ------------------------- |
| Authentication | `/api/v1/auth/`     | Login, register, logout   |
| Accounts       | `/api/v1/accounts/` | Customer profiles         |
| Pets           | `/api/v1/pets/`     | Pet management            |
| Schedule       | `/api/v1/schedule/` | Appointments and services |
| Store          | `/api/v1/store/`    | Products and orders       |
| Health         | `/api/v1/health/`   | Medical records           |

### Authentication

Uses **Token-based authentication**:

- Tokens stored in `localStorage`
- `Authorization: Token <token>` header on all requests
- Automatic redirect to `/login` on 401 responses
- CSRF protection with `X-CSRFToken` header

## 📂 Project Structure

```
petcare-web/
├── public/                  # Static assets
│   └── images/              # Image assets organized by category
├── src/
│   ├── app/                 # Next.js pages and routing
│   │   ├── (auth)/          # Authentication pages
│   │   └── (customer)/      # Customer portal
│   ├── core/                # Business logic
│   ├── infrastructure/      # External integrations
│   └── presentation/        # UI layer
├── .env.local.example       # Environment template
├── docker-compose.yml       # Docker configuration
├── Dockerfile               # Multi-stage build
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
└── tsconfig.json            # TypeScript configuration
```

## 🛠️ Available Scripts

```bash
pnpm run dev          # Start development server
pnpm run build        # Create production build
pnpm run start        # Start production server
pnpm run lint         # Run ESLint
pnpm run type-check   # Run TypeScript compiler check
pnpm run format       # Format code with Prettier
```

## ✨ Code Quality

This project uses professional quality gates:

- **Husky**: Pre-commit hooks for automatic linting and formatting
- **lint-staged**: Runs linters only on staged files
- **Commitlint**: Enforces [Conventional Commits](https://www.conventionalcommits.org/)
- **GitHub Actions**: CI pipeline with type checking and build verification

See [QUALITY.md](QUALITY.md) for detailed setup and usage instructions.

## 🐳 Docker

### Development

```bash
docker compose up -d
docker compose logs -f petcare-web
```

### Production

```bash
./deploy.sh
```

See [DOCKER.md](DOCKER.md) for detailed Docker documentation.

## 🔐 Security

- **HTTPS Only** in production
- **CSRF Protection** on all mutations
- **Token Expiration** handling
- **Input Sanitization** with Zod schemas
- **Environment Variables** for sensitive configuration

## 🧪 Testing

```bash
npm run test          # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Generate coverage report
```

## 📝 Code Style

- **TypeScript Strict Mode** enabled
- **ESLint** for code quality
- **Prettier** for formatting
- **Clean Architecture** principles
- **English** for all code (Portuguese only for user-facing UI text)

## 📄 License

This project is **proprietary software**. All rights reserved.

**Copyright (c) 2025 Bruna Menezes**

Unauthorized copying, distribution, or use of this software is strictly prohibited. See the [LICENSE](LICENSE) file for details.

For licensing inquiries, please visit [brunadev.com](https://brunadev.com).

## 👥 Author

**Bruna Menezes**

- Portfolio: [brunadev.com](https://brunadev.com)
- LinkedIn: [bruna-c-menezes](https://www.linkedin.com/in/bruna-c-menezes/)
- GitHub: [github.com/CFBruna/petcare-web](https://github.com/CFBruna/petcare-web)

---

**Built with ❤️ using Next.js, TypeScript, and Clean Architecture**
