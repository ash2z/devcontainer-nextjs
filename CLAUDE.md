# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application using the App Router with TypeScript, React 19, Tailwind CSS v4, and Jest for testing. The project uses Turbopack for fast development builds.

**Package Manager**: This project uses **pnpm** exclusively. The package.json includes a preinstall script that enforces pnpm usage.

## Essential Commands

### Development

```bash
pnpm dev              # Start dev server with Turbopack on http://localhost:3000
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm lint:fix         # Run ESLint and fix auto-fixable issues
pnpm format           # Format code with Prettier
pnpm typecheck        # Type check without emitting files
```

### Testing

```bash
pnpm test             # Run all Jest tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Generate coverage report
pnpm test path/to/test.spec.ts  # Run specific test file
```

## Architecture

### Directory Structure

```
src/
└── app/              # Next.js App Router pages and layouts
    ├── layout.tsx    # Root layout
    ├── page.tsx      # Home page
    ├── globals.css   # Global styles (Tailwind)
    └── api/          # API routes
```

### Key Technologies

- **Next.js 15**: App Router for file-based routing
- **React 19**: Latest React features including server components
- **TypeScript**: Strict mode enabled
- **Tailwind CSS v4**: Utility-first CSS framework with PostCSS
- **Prettier**: Code formatting with Tailwind plugin
- **Jest + Testing Library**: Component and unit testing
- **Path Alias**: `@/*` maps to `src/*`

## Testing Strategy

### Test Configuration

- Tests are located alongside components in `__tests__` folders or as `.test.ts/.spec.ts` files
- Test environment: `jest-environment-jsdom` for browser simulation
- Custom matchers from `@testing-library/jest-dom` available
- Tests should be placed in `src/` directory only
- The root `tests/` folder is excluded from test runs (reserved for standalone scripts)

## Development Guidelines

### Code Style

- Follow existing patterns in the codebase
- Use TypeScript strict mode
- Components should be functional with hooks
- Server Components by default, Client Components only when needed (`'use client'`)
- Use Tailwind CSS for styling
- Prettier is configured with Tailwind plugin for consistent formatting

### Component Structure

- Server Components: Default for pages and layouts
- Client Components: Only for interactive features requiring browser APIs, state, or event handlers
- Keep components small and focused on single responsibility

### API Routes

- Located in `src/app/api/`
- Use Route Handlers (route.ts files)
- Support standard HTTP methods (GET, POST, PUT, DELETE, etc.)

### Best Practices

- Always validate and sanitize inputs
- Use proper error boundaries
- Implement loading and error states
- Follow React 19 and Next.js 15 patterns
- Use async/await for data fetching in Server Components
- Implement proper TypeScript types

### Performance

- Leverage Server Components for better performance
- Use dynamic imports for code splitting
- Optimize images with Next.js Image component
- Implement proper caching strategies

## Commit and PR Guidelines

When implementing features:

1. Ensure all tests pass before committing
2. Run `pnpm lint` and fix any issues
3. Run `pnpm typecheck` to verify no TypeScript errors
4. Run `pnpm format` to ensure consistent code formatting
5. Write clear, descriptive commit messages
6. Update tests for any new functionality

## Important Notes

- The project uses Turbopack for faster development builds
- ESLint configuration extends from Next.js defaults with Prettier integration
- Jest is configured with ts-jest for TypeScript support
- The `tests/` folder in root is excluded from test runs (for standalone scripts)

## AI Guidelines Reference

The repository includes comprehensive AI guidelines in `ai-guidelines/` directory:

- `CODING_GUIDELINES.md`: Universal coding best practices
- `GENERAL_GUIDELINES.md`: General AI interaction guidelines
- `COMMIT_AND_PR_GUIDELINES.md`: Version control practices
- `ISSUE_GUIDELINES.md`: Issue management practices

Follow these guidelines for consistency and quality.
