# Architecture Patterns

## Project Architecture Overview

### Technology Stack Layers

```
┌─────────────────────────────────────┐
│         Client Browser              │
├─────────────────────────────────────┤
│     Next.js App Router (React 19)   │
├─────────────────────────────────────┤
│   Server Components │ Client Comp.  │
├─────────────────────────────────────┤
│      API Routes (Route Handlers)    │
├─────────────────────────────────────┤
│     Business Logic / Services       │
├─────────────────────────────────────┤
│      Data Layer / Database          │
└─────────────────────────────────────┘
```

## Directory Structure Pattern

### Feature-Based Organization

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route groups
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/                # Feature routes
│   │   ├── layout.tsx           # Nested layout
│   │   ├── page.tsx             # Page component
│   │   └── loading.tsx          # Loading state
│   ├── api/                     # API endpoints
│   │   ├── auth/
│   │   │   └── route.ts
│   │   └── users/
│   │       └── route.ts
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
│
├── components/                   # Shared components
│   ├── ui/                      # Generic UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   └── features/                # Feature-specific components
│       ├── auth/
│       │   ├── LoginForm.tsx
│       │   └── AuthProvider.tsx
│       └── dashboard/
│           ├── StatsCard.tsx
│           └── UserTable.tsx
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts
│   ├── useDebounce.ts
│   └── useLocalStorage.ts
│
├── lib/                          # Core utilities
│   ├── api/                     # API client utilities
│   │   ├── client.ts
│   │   └── endpoints.ts
│   ├── db/                      # Database utilities
│   │   ├── client.ts
│   │   └── queries.ts
│   └── utils/                   # General utilities
│       ├── format.ts
│       └── validation.ts
│
├── services/                     # Business logic
│   ├── auth.service.ts
│   ├── user.service.ts
│   └── payment.service.ts
│
├── types/                        # TypeScript definitions
│   ├── api.types.ts
│   ├── db.types.ts
│   └── user.types.ts
│
└── middleware.ts                 # Next.js middleware
```

## Component Architecture Patterns

### Server Component Pattern

```typescript
// Default pattern for data fetching and static content
// app/users/page.tsx
export default async function UsersPage() {
  // Direct data fetching in component
  const users = await getUsersFromDB()

  return (
    <div>
      <h1>Users</h1>
      <UserList users={users} />
    </div>
  )
}

// components/features/users/UserList.tsx
export function UserList({ users }: { users: User[] }) {
  return (
    <ul>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </ul>
  )
}
```

### Client Component Pattern

```typescript
// Only for interactive features
// components/features/users/UserSearch.tsx
'use client'

import { useState, useTransition } from 'react'

export function UserSearch({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSearch = () => {
    startTransition(() => {
      onSearch(query)
    })
  }

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={isPending}
      />
      <button onClick={handleSearch} disabled={isPending}>
        Search
      </button>
    </div>
  )
}
```

### Hybrid Pattern (Server + Client)

```typescript
// Server Component wrapper
// app/products/[id]/page.tsx
export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  return (
    <div>
      <ProductDetails product={product} />
      <ProductActions productId={product.id} /> {/* Client Component */}
    </div>
  )
}

// Client Component for interactions
// components/features/products/ProductActions.tsx
'use client'

export function ProductActions({ productId }: { productId: string }) {
  const handleAddToCart = () => {
    // Client-side logic
  }

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  )
}
```

## Data Flow Patterns

### Server-Side Data Flow

```
User Request → Route Handler → Server Component → Data Fetching → Render → Response
```

### Client-Side Data Flow

```
User Interaction → Event Handler → State Update → Re-render → UI Update
```

### API Route Pattern

```typescript
// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUserById(params.id)

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

## State Management Patterns

### Server State (Recommended)

```typescript
// Use Server Components for server state
async function ProductList() {
  const products = await getProducts() // Server-side fetch
  return <ProductGrid products={products} />
}
```

### Client State Pattern

```typescript
// Use React hooks for client state
'use client'

function useCart() {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (item: CartItem) => {
    setItems((prev) => [...prev, item])
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return { items, addItem, removeItem }
}
```

### Context Pattern (When Needed)

```typescript
// components/providers/ThemeProvider.tsx
'use client'

const ThemeContext = createContext<ThemeContextType>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
```

## Service Layer Pattern

### Business Logic Separation

```typescript
// services/user.service.ts
export class UserService {
  static async createUser(data: CreateUserDTO): Promise<User> {
    // Validate data
    const validated = validateUserData(data)

    // Business logic
    const hashedPassword = await hashPassword(validated.password)

    // Database operation
    const user = await db.user.create({
      ...validated,
      password: hashedPassword,
    })

    // Send welcome email
    await EmailService.sendWelcome(user.email)

    return user
  }

  static async getUserById(id: string): Promise<User | null> {
    return db.user.findUnique({ where: { id } })
  }
}
```

## Error Handling Patterns

### Centralized Error Handling

```typescript
// lib/errors.ts
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR')
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND')
  }
}
```

### Error Boundary Pattern

```typescript
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

## Authentication Pattern

### Middleware-Based Auth

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')

  // Protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
}
```

## Caching Patterns

### Data Caching

```typescript
// Next.js built-in caching
export const revalidate = 60 // Revalidate every 60 seconds

async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 } // Cache for 1 hour
  })
  return res.json()
}

// On-demand revalidation
import { revalidatePath, revalidateTag } from 'next/cache'

export async function updateProduct(id: string) {
  // Update product
  await db.product.update({ where: { id }, data: {...} })

  // Revalidate cache
  revalidatePath(`/products/${id}`)
  revalidateTag('products')
}
```

## Testing Patterns

### Component Testing Pattern

```typescript
// __tests__/components/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })
})
```

### Integration Testing Pattern

```typescript
// __tests__/api/users.test.ts
describe('/api/users', () => {
  it('creates a new user', async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test', email: 'test@example.com' }),
    })

    expect(response.status).toBe(201)
    const data = await response.json()
    expect(data.user).toHaveProperty('id')
  })
})
```

## Performance Patterns

### Code Splitting Pattern

```typescript
// Dynamic imports for code splitting
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Disable SSR if not needed
})
```

### Image Optimization Pattern

```typescript
import Image from 'next/image'

export function OptimizedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      loading="lazy"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  )
}
```

## Deployment Patterns

### Environment Configuration

```typescript
// lib/config.ts
const getConfig = () => {
  const env = process.env.NODE_ENV

  return {
    api: {
      url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
      timeout: parseInt(process.env.API_TIMEOUT || '5000'),
    },
    features: {
      enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
      enableBeta: process.env.NEXT_PUBLIC_ENABLE_BETA === 'true',
    },
  }
}

export const config = getConfig()
```

## Design Patterns Summary

### Key Patterns Used

1. **Server-First Rendering**: Default to Server Components
2. **Progressive Enhancement**: Add interactivity only where needed
3. **Separation of Concerns**: Clear layer separation
4. **Single Responsibility**: Each component/function has one job
5. **Dependency Injection**: Services receive dependencies
6. **Error Boundaries**: Graceful error handling
7. **Composition over Inheritance**: Use component composition
8. **Immutability**: Prefer immutable state updates
9. **Lazy Loading**: Load resources only when needed
10. **Caching Strategy**: Multi-level caching for performance
