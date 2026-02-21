# OptiWallet - Project Steering Guide

## Project Overview
OptiWallet is a credit card management and spending optimization application built with a modern full-stack architecture.

## Tech Stack

### Backend (Server)
- **Runtime**: Bun
- **Framework**: Elysia (TypeScript web framework)
- **Database**: Drizzle ORM
- **Logging**: Pino with pretty printing
- **Security**: Helmet middleware
- **API Documentation**: Swagger (dev only)
- **Port**: 3000 (default)

### Frontend (Client)
- **Framework**: SolidJS
- **Router**: @solidjs/router
- **State Management**: Zustand with solid-zustand
- **Styling**: TailwindCSS v4 with animations
- **UI Components**: Kobalte (headless components)
- **Charts**: ApexCharts with solid-apexcharts
- **Build Tool**: Vite
- **Testing**: Vitest with SolidJS Testing Library

## Project Structure

```
optiwallet/
├── server/                 # Backend API
│   ├── src/
│   │   ├── index.ts       # Entry point
│   │   ├── routes/        # API route handlers
│   │   ├── controllers/   # Business logic
│   │   ├── models/        # Database models
│   │   ├── repositories/  # Data access layer
│   │   ├── dto/           # Data transfer objects
│   │   ├── mappers/       # Entity-DTO mappers
│   │   └── utils/         # Utilities
│   ├── api-tests/         # HTTP test files
│   └── drizzle.config.ts  # Database config
│
└── client/                # Frontend app
    ├── src/
    │   ├── App.tsx        # Root component with routing
    │   ├── pages/         # Page components
    │   │   ├── home/      # Dashboard/home page
    │   │   ├── creditCards/
    │   │   ├── login/
    │   │   └── admin/
    │   ├── components/    # Reusable components
    │   ├── store/         # Zustand state stores
    │   ├── libs/          # Utility libraries
    │   └── assets/        # Static assets
    └── styles/            # Global styles
```

## Architecture Patterns

### Backend
- **Layered Architecture**: Routes → Controllers → Repositories → Models
- **Separation of Concerns**: DTOs for API contracts, mappers for transformations
- **Environment-based Config**: Production vs development features (e.g., Swagger)
- **Structured Logging**: Pino logger with custom configuration

### Frontend
- **Component-based**: SolidJS reactive components
- **Route-based Code Splitting**: Pages organized by route
- **Centralized State**: Zustand for global state management
- **Utility-first CSS**: TailwindCSS for styling
- **Headless UI Pattern**: Kobalte for accessible, unstyled components

## Development Workflow

### Server Commands
```bash
bun run dev      # Watch mode with lint, test, and auto-reload
bun run start    # Production start
bun run build    # Build for production
bun run lint     # ESLint with auto-fix
bun run test     # Run tests
bun run push-db  # Push database schema
```

### Client Commands
```bash
bun run dev      # Development server (Vite)
bun run build    # Production build
bun run serve    # Preview production build
bun run test     # Run Vitest tests
```

## Key Features
- Credit card management
- Spending tracking and visualization (charts)
- Spending optimization recommendations
- User authentication (login page)
- Admin functionality
- Dark mode support

## Coding Guidelines

### General
- Use TypeScript for type safety
- Keep components minimal and focused
- Follow existing project structure
- Use Bun as the package manager and runtime
- **Always use CSS theme variables when possible** - defined in `styles/globals.css`
  - Use `--primary`, `--secondary`, `--accent` for UI elements
  - Use `--foreground`, `--background` for text and backgrounds

### Backend
- Use Elysia's plugin system for middleware
- Keep routes thin, logic in controllers
- Use repositories for all database access
- Map between entities and DTOs at boundaries
- Log important operations with Pino

### Frontend
- Use SolidJS reactive primitives (createSignal, createEffect, etc.)
- Keep components pure and testable
- Use Zustand for cross-component state
- Follow TailwindCSS utility patterns
- Ensure accessibility with Kobalte components

## API Structure
- Base path: `/api`
- Current endpoints: Credit cards management
- Swagger docs available in development at `/swagger`

## Environment
- Server runs on port 3000 by default
- Environment variables configured in `server/.env`
- Production mode disables Swagger and adjusts logging

## Testing
- Backend: Bun test framework
- Frontend: Vitest with SolidJS Testing Library
- API tests: HTTP files in `server/api-tests/`

## Database
- ORM: Drizzle
- Schema generation: `bun run drizzle-kit generate`
- Schema push: `bun run push-db`
- Configuration: `server/drizzle.config.ts`
