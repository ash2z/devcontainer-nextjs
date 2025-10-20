# Development Guidelines

## Core Development Principles

### 1. Server-First Architecture

- **Default to Server Components**: Use Server Components for all non-interactive UI
- **Selective Client Components**: Only use 'use client' when you need:
  - Event handlers (onClick, onChange, etc.)
  - Browser APIs (localStorage, window, document)
  - State management (useState, useReducer)
  - Effects (useEffect, useLayoutEffect)
  - Third-party client-only libraries

### 2. Type Safety First

- **Strict TypeScript**: Never disable strict mode
- **Explicit Types**: Define types for all function parameters and return values
- **Avoid any**: Use `unknown` or specific types
- **Type Imports**: Use `import type` or inline type imports
- **Validate External Data**: Always validate API responses and user inputs

### 3. Performance Optimization

- **Lazy Loading**: Use dynamic imports for heavy components
- **Image Optimization**: Always use Next.js Image component
- **Code Splitting**: Leverage automatic code splitting
- **Caching**: Implement proper cache strategies for data fetching
- **Bundle Size**: Monitor and minimize client-side JavaScript

## React 19 & Next.js 15 Patterns

### Server Components Best Practices

```typescript
// ✅ Good - Server Component for static content
export default async function UserList() {
  const users = await fetchUsers() // Direct async data fetching

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
```

### Client Components Best Practices

```typescript
// ✅ Good - Client Component only for interactivity
'use client'
import { useState } from 'react'

export default function SearchBar() {
  const [query, setQuery] = useState('')

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}
```

### Data Fetching Patterns

```typescript
// Server Component - Direct fetching
async function ProductPage({ id }: { id: string }) {
  const product = await fetch(`/api/products/${id}`)
  return <ProductDetails product={product} />
}

// Client Component - Use hooks or effects
'use client'
function ProductUpdates({ id }: { id: string }) {
  const [product, setProduct] = useState(null)

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(setProduct)
  }, [id])

  return <div>...</div>
}
```

## API Development

### Route Handlers Structure

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Validate parameters
    const { searchParams } = new URL(request.url)

    // Fetch data
    const users = await getUsersFromDB()

    // Return response
    return NextResponse.json({ users })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    if (!body.name || !body.email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Process request
    const user = await createUser(body)

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
```

## Error Handling Strategies

### Comprehensive Error Handling

```typescript
// Use Error Boundaries for UI
export function ErrorBoundary({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}

// API Error Handling
class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500
  ) {
    super(message)
  }
}

// Graceful Degradation
async function fetchWithFallback<T>(
  fetcher: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await fetcher()
  } catch (error) {
    console.error('Fetch failed, using fallback:', error)
    return fallback
  }
}
```

## Testing Strategy

### Component Testing

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Button Component', () => {
  it('should handle click events', async () => {
    const handleClick = jest.fn()

    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button')
    await userEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### API Testing

```typescript
describe('API /api/users', () => {
  it('should return users list', async () => {
    const response = await fetch('/api/users')
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.users).toBeInstanceOf(Array)
  })
})
```

## Security Best Practices

### Input Validation

```typescript
import { z } from 'zod' // If using zod

const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().min(0).max(120).optional(),
})

function validateUser(data: unknown) {
  return UserSchema.parse(data)
}
```

### Authentication Pattern

```typescript
// Middleware for protected routes
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}
```

## Styling Guidelines

### Tailwind CSS Best Practices

```typescript
// ✅ Good - Semantic class grouping
<div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md">

// ✅ Good - Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// ✅ Good - State variants
<button className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300">

// ❌ Bad - Arbitrary values when utilities exist
<div className="w-[50%]"> // Use w-1/2 instead
```

### Component Styling Pattern

```typescript
// Create reusable component styles
const buttonStyles = {
  base: 'px-4 py-2 rounded font-medium transition-colors',
  variant: {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  },
  size: {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  },
}
```

## Performance Monitoring

### Key Metrics to Track

- **Core Web Vitals**: LCP, FID, CLS
- **Time to First Byte** (TTFB)
- **JavaScript Bundle Size**
- **API Response Times**
- **Database Query Performance**

### Performance Optimization Checklist

- [ ] Images optimized and lazy loaded
- [ ] Fonts optimized with next/font
- [ ] Critical CSS inlined
- [ ] JavaScript code-split
- [ ] API responses cached appropriately
- [ ] Database queries optimized
- [ ] Static assets served from CDN

## Development Workflow

### Feature Development Flow

1. **Plan**: Understand requirements and design
2. **Setup**: Create branch, update dependencies
3. **Implement**: Write code following conventions
4. **Test**: Write and run tests
5. **Optimize**: Check performance and bundle size
6. **Document**: Update docs and comments
7. **Review**: Self-review and peer review
8. **Deploy**: Merge and monitor

### Debugging Techniques

```bash
# Server-side debugging
console.log('Server:', data)

# Client-side debugging
if (typeof window !== 'undefined') {
  console.log('Client:', data)
}

# Next.js specific debugging
export const runtime = 'nodejs' // Force Node.js runtime
export const dynamic = 'force-dynamic' // Disable caching
```

## Deployment Considerations

### Environment Variables

```typescript
// Always validate environment variables
const requiredEnvVars = ['DATABASE_URL', 'API_KEY', 'NEXT_PUBLIC_API_URL']

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
})
```

### Build Optimization

```javascript
// next.config.ts
const config = {
  images: {
    domains: ['example.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
  },
}
```

## Monitoring and Logging

### Structured Logging

```typescript
const logger = {
  info: (message: string, data?: any) => {
    console.log(JSON.stringify({ level: 'info', message, data, timestamp: new Date() }))
  },
  error: (message: string, error?: any) => {
    console.error(JSON.stringify({ level: 'error', message, error, timestamp: new Date() }))
  },
}
```

## AI Guidelines Integration

The project includes comprehensive AI guidelines in `ai-guidelines/`:

- Follow `CODING_GUIDELINES.md` for universal best practices
- Apply `GENERAL_GUIDELINES.md` for AI interactions
- Use `COMMIT_AND_PR_GUIDELINES.md` for version control
- Reference `ISSUE_GUIDELINES.md` for issue management

These guidelines ensure consistency, quality, and best practices across all development efforts.
