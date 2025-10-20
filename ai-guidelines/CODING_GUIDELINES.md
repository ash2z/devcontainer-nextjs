# CODING_GUIDELINE_FOR_NEXTJS_TYPESCRIPT_TAILWIND

## Version Requirements
- Next.js: 15.x
- React: 19.x
- TypeScript: 5.x
- Tailwind CSS: 4.x

## Core Principles
- **Type Safety**: Never use `any`. Use `unknown` or proper types
- **Server-First**: Default to Server Components (React 19)
- **Performance**: Leverage Turbopack, Server Actions, streaming
- **Zero Config**: Utilize automatic detection features

## Project Structure
```
src/
├── app/              # App Router (Next.js 15)
│   ├── _components/  # Route-specific components
│   ├── actions/      # Server Actions
│   └── (routes)/     # Grouped routes
├── components/       # Shared components
├── lib/             # Utilities
├── hooks/           # Custom hooks
└── types/           # TypeScript definitions
```

## TypeScript 5 Rules

### Strict Type Safety
```typescript
// ❌ FORBIDDEN
const data: any = fetch()
export default function(props: any) {}

// ✅ REQUIRED
const data: unknown = fetch()
interface Props { id: string; name: string }
export default function Component({ id, name }: Props) {}
```

### Const Type Parameters
```typescript
// Use const modifier for literal inference
function getData<const T>(data: T): T {
  return data
}
const result = getData(['a', 'b']) // Type: readonly ["a", "b"]
```

### Decorators (Stage 3)
```typescript
// Modern decorators for cross-cutting concerns
function log(_target: any, context: ClassMethodDecoratorContext) {
  const name = String(context.name)
  return function(this: any, ...args: any[]) {
    console.log(`[${name}] called`)
    return context.method!.apply(this, args)
  }
}

class Service {
  @log
  process() {}
}
```

### Satisfies Operator
```typescript
// Ensure type safety while preserving literal types
const config = {
  port: 3000,
  host: 'localhost'
} satisfies Record<string, string | number>
```

## Next.js 15 Best Practices

### Server Components (Default)
```typescript
// app/page.tsx - Server Component by default
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }
  })
  return <div>{data}</div>
}
```

### Client Components (When Needed)
```typescript
'use client'
// Only for interactivity, hooks, browser APIs
import { useState } from 'react'

export default function Interactive() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

### Server Actions
```typescript
// app/actions.ts
'use server'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2)
})

export async function createUser(formData: FormData) {
  const validated = schema.parse(Object.fromEntries(formData))
  await db.user.create(validated)
  revalidatePath('/users')
}
```

### Form Component (Next.js 15)
```tsx
import Form from 'next/form'
import { createUser } from './actions'

export default function UserForm() {
  return (
    <Form action={createUser}>
      <input name="email" type="email" required />
      <button type="submit">Submit</button>
    </Form>
  )
}
```

### Error Handling (onRequestError)
```typescript
// app/instrumentation.ts
export async function onRequestError(
  error: Error,
  request: Request,
  context: { route: string }
) {
  await fetch('https://monitoring.example.com', {
    method: 'POST',
    body: JSON.stringify({ error: error.message, route: context.route })
  })
}
```

### After API (Cleanup)
```typescript
import { unstable_after as after } from 'next/server'

export async function POST() {
  const response = await processRequest()
  
  after(() => {
    // Cleanup, analytics, logging after response
    analytics.track('api_called')
  })
  
  return response
}
```

## React 19 Features

### Actions & Transitions
```typescript
'use client'
import { useActionState, useFormStatus } from 'react'

function Form({ action }: { action: (data: FormData) => Promise<void> }) {
  const [state, formAction, isPending] = useActionState(action, null)
  
  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return <button disabled={pending}>Submit</button>
}
```

### use() Hook
```typescript
'use client'
import { use, Suspense } from 'react'

function DataComponent({ promise }: { promise: Promise<Data> }) {
  const data = use(promise) // Replaces useEffect + useState
  return <div>{data.value}</div>
}

// Usage with Suspense
<Suspense fallback={<Loading />}>
  <DataComponent promise={fetchData()} />
</Suspense>
```

### Optimistic Updates
```typescript
'use client'
import { useOptimistic } from 'react'

export default function List({ items }: { items: Item[] }) {
  const [optimisticItems, addOptimistic] = useOptimistic(
    items,
    (state, newItem) => [...state, newItem]
  )
  
  async function formAction(formData: FormData) {
    const item = { id: Date.now(), text: formData.get('text') }
    addOptimistic(item)
    await createItem(item)
  }
  
  return <form action={formAction}>...</form>
}
```

### Direct Ref Props (No forwardRef)
```typescript
// React 19 - refs as props
interface ButtonProps {
  ref?: React.Ref<HTMLButtonElement>
  children: React.ReactNode
}

export function Button({ ref, children }: ButtonProps) {
  return <button ref={ref}>{children}</button>
}
```

## Tailwind CSS 4 Configuration

### Installation (Vite/Next.js)
```typescript
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'

export default {
  plugins: [tailwindcss()]
}
```

### CSS Configuration
```css
/* app/globals.css */
@import "tailwindcss";

/* Customize in CSS, not JS */
@theme {
  --color-primary: oklch(59% 0.2 260);
  --font-sans: "Inter", system-ui, sans-serif;
  --breakpoint-3xl: 1920px;
}

/* Custom utilities */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

### Container Queries
```tsx
// Native container queries in v4
<div className="@container">
  <div className="grid @sm:grid-cols-2 @lg:grid-cols-3">
    {items.map(item => (
      <Card key={item.id} {...item} />
    ))}
  </div>
</div>
```

### 3D Transforms
```tsx
<div className="perspective-1000">
  <div className="rotate-x-45 rotate-y-30 transform-3d">
    3D Content
  </div>
</div>
```

### Modern CSS Features
```tsx
// Wide-gamut colors
<div className="bg-[oklch(70%_0.2_120)]" />

// Native nesting & layers handled automatically
// Vendor prefixing automatic via Lightning CSS
```

## Component Patterns

### Server Component with Streaming
```typescript
import { Suspense } from 'react'

async function SlowData() {
  const data = await slowFetch()
  return <div>{data}</div>
}

export default function Page() {
  return (
    <>
      <h1>Instant Header</h1>
      <Suspense fallback={<Skeleton />}>
        <SlowData />
      </Suspense>
    </>
  )
}
```

### Type-Safe Server Action
```typescript
'use server'

export async function updateProfile(
  prevState: { message?: string },
  formData: FormData
): Promise<{ message?: string }> {
  const result = await db.update(formData)
  return { message: result.success ? 'Updated' : 'Failed' }
}
```

## Performance Optimization

### Turbopack (Stable in Next.js 15)
```json
// package.json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build"
  }
}
```

### Parallel Routes
```typescript
// app/layout.tsx
export default function Layout({
  children,
  modal
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}
```

### PPR (Partial Prerendering)
```typescript
// Enable for specific routes
export const experimental_ppr = true
```

## Data Fetching

### Request Deduplication
```typescript
// Automatic deduplication in single render
async function getData() {
  // Called multiple times, fetched once
  return fetch('/api/data').then(r => r.json())
}
```

### Async Request APIs
```typescript
// Next.js 15 - async by default
import { cookies, headers } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const headersList = await headers()
  
  const token = cookieStore.get('token')
  const userAgent = headersList.get('user-agent')
}
```

## Typed Routes (Next.js 15)
```typescript
// next.config.ts
export default {
  experimental: {
    typedRoutes: true
  }
}

// Usage
import Link from 'next/link'
<Link href="/blog/post-1">Post</Link> // Type-checked
```

## Testing Patterns
```typescript
// With React 19 & Next.js 15
import { render } from '@testing-library/react'
import { expect, test } from 'vitest'

test('Server Component', async () => {
  const Component = await import('./page')
  const { container } = render(await Component.default())
  expect(container).toHaveTextContent('Expected')
})
```

## Environment Variables
```typescript
// Type-safe with Zod
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXT_PUBLIC_API_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test'])
})

export const env = envSchema.parse(process.env)
```

## Common Utilities

### cn() for Tailwind v4
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Security Best Practices
- Validate Server Actions with Zod
- Use CSRF protection
- Sanitize user input before database operations
- Never expose secrets in Client Components
- Use `server-only` package for server utilities

## Accessibility Requirements
- Semantic HTML
- ARIA labels for interactive elements
- Focus management in Client Components
- Keyboard navigation
- Color contrast (WCAG AA)
- Alt text for images

## Forbidden Practices
- ❌ `any` type
- ❌ `@ts-ignore`
- ❌ Synchronous data fetching in components
- ❌ Direct DOM manipulation
- ❌ Inline styles (use Tailwind)
- ❌ `var` declarations
- ❌ Mutating state directly
- ❌ Client Components for static content
- ❌ Blocking the main thread