# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BeeAt Backend is a Node.js/TypeScript automation testing learning platform API built with Fastify and managed using Nx monorepo structure.

## Development Commands

### Core Development
```bash
# Start development server
npx nx serve apis

# Build for production  
npx nx build apis

# Run tests
npx nx test

# Run E2E tests
npx nx test apis-e2e

# View all available commands for a project
npx nx show project apis

# Docker build
npx nx docker-build apis
```

### Code Quality
```bash
# Lint code
npx nx lint

# Format code
npx nx format
```

## Architecture Overview

### Monorepo Structure (Nx Workspace)
- **Main API**: `/apps/apis/` - Fastify-based REST API
- **E2E Tests**: `/apps/apis-e2e/` - End-to-end testing with Jest + axios
- **Documentation**: `/docs/api-reference.md` - Comprehensive API specifications

### Tech Stack
- **Framework**: Fastify with autoloading plugins and routes
- **Language**: TypeScript (ES2022, strict mode)
- **Build Tool**: ESBuild via Nx
- **Testing**: Jest for unit tests, separate E2E app
- **Database**: Planned Supabase integration (not yet implemented)
- **Authentication**: Planned Supabase Auth integration

### Key Directories
- **`/apps/apis/src/app/plugins/`** - Reusable Fastify plugins (sensible.ts for HTTP errors)
- **`/apps/apis/src/app/routes/`** - API route handlers (autoloaded by Fastify)
- **`/apps/apis/src/main.ts`** - Application entry point

### Current Implementation State
- ✅ Basic Fastify server with plugin autoloading
- ✅ Nx monorepo setup with build/test pipelines
- ✅ Docker containerization
- ✅ TypeScript strict configuration
- ✅ Comprehensive API documentation planned
- ❌ Most API endpoints not yet implemented (only root endpoint exists)
- ❌ Database layer not implemented
- ❌ Authentication not implemented

### Development Notes
- Server runs on `localhost:3000` by default (configurable via HOST/PORT env vars)
- Uses Fastify's autoload system for plugin and route discovery
- Nx handles all build, test, and development workflows
- Docker image uses Node.js Alpine with non-root user `beeat-be-apis`