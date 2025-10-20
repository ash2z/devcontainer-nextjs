# Suggested Commands

## Package Manager

**IMPORTANT**: This project uses **pnpm** exclusively. The package.json includes a preinstall script that enforces pnpm usage. Do not use npm or yarn.

## Development Commands

### Starting Development

```bash
pnpm dev              # Start dev server with Turbopack on http://localhost:3000
```

### Building and Production

```bash
pnpm build            # Create production build
pnpm start            # Start production server
```

## Code Quality Commands

### Linting

```bash
pnpm lint             # Run ESLint to check for issues
pnpm lint:fix         # Run ESLint and auto-fix issues
pnpm lint:debug       # Debug ESLint configuration
```

### Type Checking

```bash
pnpm typecheck        # Run TypeScript compiler without emitting files (tsc --noEmit)
```

### Formatting

```bash
pnpm format           # Format all files with Prettier
```

## Testing Commands

### Running Tests

```bash
pnpm test                        # Run all Jest tests
pnpm test:watch                  # Run tests in watch mode
pnpm test:coverage               # Generate test coverage report
pnpm test path/to/test.spec.ts  # Run specific test file
pnpm test -- --updateSnapshot    # Update test snapshots
```

## Git Commands (Linux System)

### Basic Operations

```bash
git status                          # Check current changes
git diff                            # View unstaged changes
git diff --staged                   # View staged changes
git add .                           # Stage all changes
git commit -m "message"             # Commit with message
git push                            # Push to remote
git pull                            # Pull from remote
```

### Branch Management

```bash
git checkout -b feature/name        # Create and switch to new branch
git checkout main                   # Switch to main branch
git merge feature/name              # Merge feature branch
git branch -d feature/name          # Delete local branch
```

## System Commands (Linux)

### File Operations

```bash
ls -la                              # List all files with details
cd directory                        # Change directory
mkdir directory                     # Create directory
rm -rf directory                    # Remove directory recursively
cp -r source dest                   # Copy directory recursively
mv source dest                      # Move/rename files
```

### Search and Find

```bash
grep -r "pattern" .                 # Search for pattern recursively
find . -name "*.tsx"                # Find files by pattern
```

### Process Management

```bash
ps aux | grep node                  # Find Node.js processes
kill -9 PID                         # Force kill process
pkill -f "node"                     # Kill processes by name pattern
```

## pnpm Commands

### Package Management

```bash
pnpm install                        # Install dependencies (or just: pnpm i)
pnpm add package-name               # Install specific package
pnpm add -D package-name            # Install as dev dependency
pnpm remove package-name            # Remove package
pnpm list                           # List installed packages
pnpm outdated                       # Check for outdated packages
pnpm update                         # Update packages
pnpm store prune                    # Clean up pnpm store
```

### pnpm-specific Features

```bash
pnpm why package-name               # Show why a package is installed
pnpm audit                          # Check for security vulnerabilities
pnpm audit --fix                    # Fix security vulnerabilities
```

## Development Workflow

### Before Committing Code

1. `pnpm lint` - Check for linting issues
2. `pnpm typecheck` - Verify TypeScript types
3. `pnpm test` - Run all tests
4. `pnpm format` - Format code

### Starting New Feature

1. `git checkout main` - Switch to main branch
2. `git pull` - Get latest changes
3. `git checkout -b feature/name` - Create feature branch
4. `pnpm install` - Ensure dependencies are up to date

### Debugging

```bash
node --inspect pnpm dev             # Start with Node debugger
pnpm lint:debug                     # Debug ESLint configuration
```

## Important Notes

- Always use `pnpm` - npm and yarn are not supported
- Always run `pnpm lint` and `pnpm typecheck` before committing
- Use `pnpm format` to ensure consistent code style
- Tests should be in `src/` directory with `.test.ts` or `.spec.ts` extensions
- The root `tests/` folder is excluded (reserved for standalone scripts)
- pnpm uses a content-addressable store, which saves disk space
- Use `pnpm i` as a shorthand for `pnpm install`
