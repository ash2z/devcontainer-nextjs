# Code Style Conventions

## TypeScript Conventions

### Type System

- **Strict Mode**: Always enabled, no implicit any
- **Type Imports**: Use inline type imports (`import { type User }`)
- **Explicit Types**: Prefer explicit types for function parameters
- **Avoid any**: Use `unknown` or specific types instead
- **Non-null Assertions**: Use sparingly, prefer optional chaining

### Naming Conventions

- **Variables/Functions**: camelCase (`getUserData`)
- **React Components**: PascalCase (`UserProfile`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRIES`)
- **Types/Interfaces**: PascalCase (`UserData`)
- **Files**: Component files in PascalCase, others in kebab-case

## React/Next.js Patterns

### Component Structure

```typescript
// Server Component (default)
export default function UserProfile({ userId }: { userId: string }) {
  // Server-side logic here
  return <div>...</div>
}

// Client Component (when needed)
'use client'
export default function InteractiveForm() {
  // Client-side hooks and handlers
  return <form>...</form>
}
```

### Component Guidelines

- Server Components by default
- Client Components only for:
  - Browser APIs (localStorage, window)
  - Event handlers (onClick, onChange)
  - State management (useState, useReducer)
  - Third-party client libraries
- Keep components small and focused
- Use functional components with hooks

### Props Sorting (Enforced by ESLint)

```typescript
<Component
  key={id}              // Reserved props first
  id={id}               // Shorthand props
  isActive              // Boolean shorthand
  className="..."       // Regular props alphabetically
  title="..."
  onClick={handler}     // Callbacks last
/>
```

## Import Organization (Enforced)

Order of imports:

1. Built-in modules
2. External modules (React, Next.js first)
3. Internal modules (@/\*)
4. Parent/sibling imports
5. Type imports

Example:

```typescript
import fs from 'fs'

import React from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

import { Button } from '@/components/ui'
import { useAuth } from '@/hooks'

import { validateUser } from '../utils'
import { UserCard } from './UserCard'

import type { User } from '@/types'
```

## Prettier Formatting Rules

### General

- **Semicolons**: None (semi: false)
- **Quotes**: Single quotes (singleQuote: true)
- **Tab Width**: 2 spaces
- **Trailing Commas**: ES5 style
- **Print Width**: 100 characters max
- **Bracket Spacing**: true (`{ foo: bar }`)
- **Arrow Parens**: Always (`(x) => x`)
- **End of Line**: LF (Unix style)

### Tailwind CSS

- Tailwind classes automatically sorted by prettier-plugin-tailwindcss
- Order: Layout → Spacing → Typography → Colors → Effects

## ESLint Specific Rules

### TypeScript

- Unused variables with `_` prefix are allowed
- Consistent type imports required
- No explicit any (warning)
- No non-null assertions (warning)

### React

- No React import needed (Next.js provides it)
- Props sorting enforced
- Hooks rules strictly enforced
- Display names not required

### Next.js

- Use Next.js Link component (no <a> tags)
- Use Next.js Image component (no <img> tags)
- No synchronous scripts
- No custom fonts in pages

### Accessibility

- Alt text required for images
- Valid ARIA props required
- Proper role attributes
- Keyboard navigation support

## File Organization

### Directory Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   ├── globals.css      # Global styles
│   └── api/             # API routes
│       └── route.ts     # Route handlers
├── components/          # Reusable components
│   ├── ui/              # UI components
│   └── features/        # Feature-specific components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── types/               # TypeScript type definitions
└── __tests__/           # Test files
```

### File Naming

- React Components: `UserProfile.tsx`
- Utilities: `format-date.ts`
- Types: `user.types.ts`
- Tests: `UserProfile.test.tsx` or `UserProfile.spec.tsx`
- API Routes: `route.ts`

## Testing Conventions

### Test Structure

```typescript
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Arrange
    const props = { ... }

    // Act
    render(<Component {...props} />)

    // Assert
    expect(screen.getByText('...')).toBeInTheDocument()
  })
})
```

### Test Guidelines

- Place tests in `__tests__` folders or as `.test.ts/.spec.ts` files
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies
- Test user behavior, not implementation

## Error Handling

### Pattern

```typescript
try {
  const result = await riskyOperation()
  return { success: true, data: result }
} catch (error) {
  console.error('Operation failed:', error)
  return { success: false, error: 'User-friendly message' }
}
```

## Performance Guidelines

### Best Practices

- Use Server Components for static content
- Implement lazy loading with dynamic imports
- Optimize images with Next.js Image
- Use proper caching strategies
- Minimize client-side JavaScript

## Comments and Documentation

### When to Comment

- Complex business logic
- Non-obvious implementations
- TODO items with context
- API endpoint documentation

### JSDoc Example

```typescript
/**
 * Calculates the user's subscription status
 * @param userId - The unique user identifier
 * @returns The subscription status and expiry date
 */
async function getSubscriptionStatus(userId: string) {
  // Implementation
}
```

## Git Commit Messages

### Format

```
type(scope): description

- Additional details if needed
- Another detail

Closes #123
```

### Types

- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Testing
- chore: Maintenance

## Ignored Patterns

ESLint and testing ignore:

- node_modules/
- .next/
- out/
- build/
- dist/
- public/
- coverage/
- Config files
- Test files (for ESLint)
