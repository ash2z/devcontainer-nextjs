<!--
Sync Impact Report:
Version: 0.0.0 → 1.0.0 (Initial ratification)

Modified Principles:
- NEW: I. Test-Driven Development (TDD)
- NEW: II. Type Safety First
- NEW: III. Server-First Architecture
- NEW: IV. Security First
- NEW: V. Code Quality & Readability
- NEW: VI. Performance Optimization
- NEW: VII. Visual Documentation
- NEW: VIII. Chrome DevTools for Debugging

Added Sections:
- Core Principles (8 principles)
- Technology Standards
- Development Workflow
- Governance

Templates Requiring Updates:
- ✅ plan-template.md: Constitution Check section exists and will reference these principles
- ✅ spec-template.md: Aligns with user story prioritization and testability requirements
- ✅ tasks-template.md: Aligns with TDD principle (tests-first approach)
- ✅ checklist-template.md: Generic template, no changes needed
- ✅ agent-file-template.md: Generic template, no changes needed

Follow-up TODOs: None
-->

# Next.js DevContainer Project Constitution

## Core Principles

### I. Test-Driven Development (TDD) ✅ NON-NEGOTIABLE

**TDD is mandatory for all feature development.**

- Tests MUST be written before implementation code
- Follow strict Red-Green-Refactor cycle:
  1. **Red**: Write failing test that defines desired behavior
  2. **Green**: Write minimum code to make test pass
  3. **Refactor**: Improve code while keeping tests passing
- All tests MUST fail initially before implementation
- Implementation begins ONLY after tests are written and approved
- Test coverage requirements:
  - Unit tests for individual functions/components
  - Integration tests for component interactions
  - Contract tests for API endpoints and service boundaries
  - E2E tests for critical user workflows (when applicable)

**Rationale**: TDD ensures code correctness, prevents regressions, enables confident refactoring, and serves as living documentation. This principle is non-negotiable because it fundamentally improves code quality and maintainability.

### II. Type Safety First

**Never compromise on type safety.**

- FORBIDDEN: Using `any` type in TypeScript
- FORBIDDEN: Using `@ts-ignore` or `@ts-expect-error` without justification
- REQUIRED: Use `unknown` for truly unknown types, then narrow with type guards
- REQUIRED: Define explicit interfaces and types for all data structures
- REQUIRED: Use TypeScript strict mode (enabled in tsconfig.json)
- REQUIRED: Leverage TypeScript 5 features:
  - `const` type parameters for literal inference
  - `satisfies` operator for type safety with literal preservation
  - Stage 3 decorators for cross-cutting concerns
- Zero tolerance for type errors in builds

**Rationale**: Type safety catches errors at compile time, provides better IDE support, serves as documentation, and prevents entire classes of runtime errors.

### III. Server-First Architecture

**Default to Server Components, use Client Components only when necessary.**

- Server Components are the DEFAULT for all pages and layouts
- Client Components (`'use client'`) ONLY for:
  - Interactive features requiring browser APIs
  - Component state management (useState, useReducer)
  - Event handlers (onClick, onChange, etc.)
  - Browser-only APIs (localStorage, window, document)
  - React hooks that require client-side rendering
- Leverage React 19 Server Components features:
  - Async data fetching in Server Components
  - Streaming with Suspense boundaries
  - Server Actions for mutations
  - Automatic request deduplication
- Use Next.js 15 best practices:
  - Server Actions for form handling
  - Async request APIs (cookies, headers)
  - Partial Prerendering (PPR) when appropriate

**Rationale**: Server Components reduce bundle size, improve performance, enable better SEO, and simplify data fetching while maintaining security by keeping sensitive logic server-side.

### IV. Security First

**Security is not optional—it is foundational.**

- FORBIDDEN: Hardcoding API keys, credentials, or secrets
- FORBIDDEN: Exposing secrets in Client Components
- FORBIDDEN: Storing sensitive information in version control
- REQUIRED: Validate ALL user inputs with schema validation (e.g., Zod)
- REQUIRED: Sanitize user input before database operations
- REQUIRED: Use parameterized queries to prevent SQL injection
- REQUIRED: Implement CSRF protection for state-changing operations
- REQUIRED: Use `server-only` package for server-side utilities
- REQUIRED: Follow OWASP security guidelines
- REQUIRED: Regular dependency security audits
- REQUIRED: Proper environment variable management (never commit .env files)

**Rationale**: Security vulnerabilities can lead to data breaches, user harm, and loss of trust. Security must be built-in from the start, not bolted on later.

### V. Code Quality & Readability

**Code is read far more often than it is written.**

Core quality principles MUST be followed:
- **Single Responsibility Principle (SRP)**: Each function/component has one clear purpose
- **Don't Repeat Yourself (DRY)**: Extract shared logic into reusable utilities
- **Keep It Simple, Stupid (KISS)**: Choose simplest solution that works
- **You Aren't Gonna Need It (YAGNI)**: Don't build for hypothetical future needs
- **Composition over Inheritance**: Prefer functional composition

Code standards:
- Readability over cleverness—code should be self-documenting
- Consistent naming conventions (camelCase for variables, PascalCase for components)
- Descriptive names that reveal intent (avoid abbreviations unless widely understood)
- Comments explain "why" not "what" (code should explain "what")
- All code comments and identifiers in English for international collaboration
- Maximum function/component complexity: If it needs extensive comments, refactor

Quality gates:
- Zero linter errors/warnings (`pnpm lint` must pass)
- Zero TypeScript errors (`pnpm typecheck` must pass)
- Consistent formatting (`pnpm format` with Prettier)
- All tests passing (`pnpm test`)

**Rationale**: High-quality, readable code reduces maintenance burden, accelerates onboarding, enables effective code review, and prevents bugs.

### VI. Performance Optimization

**Deliver fast, efficient user experiences.**

Performance requirements:
- Leverage Turbopack for fast development builds
- Use Server Components to reduce JavaScript bundle size
- Implement streaming with Suspense for progressive rendering
- Optimize images with Next.js Image component
- Implement proper caching strategies (revalidate, cache tags)
- Use dynamic imports for code splitting
- Implement pagination for large datasets
- Monitor and optimize Web Core Vitals (LCP, FID, CLS)

Performance workflow:
- Profile before optimizing (avoid premature optimization)
- Use Next.js 15 performance features:
  - Turbopack for development
  - Server Actions for efficient mutations
  - Parallel Routes for concurrent rendering
  - Partial Prerendering (PPR) for hybrid pages
- Use Tailwind CSS 4 efficiently (purge unused styles automatically)
- Implement async operations for I/O (never block main thread)

**Rationale**: Performance directly impacts user experience, SEO rankings, and conversion rates. Poor performance leads to user abandonment and business loss.

### VII. Visual Documentation ✅ MANDATORY FOR PRs/ISSUES

**All pull requests and complex issues MUST include Mermaid diagrams.**

Requirements for Pull Requests:
- MANDATORY: At least one Mermaid diagram visualizing the changes
- Diagram types based on change type:
  - **Flowcharts**: For workflow changes, algorithm logic, process flows
  - **Sequence diagrams**: For API interactions, component communication
  - **Class diagrams**: For data model changes, architecture updates
  - **State diagrams**: For state management changes, user flows
  - **Entity-relationship diagrams**: For database schema changes
- Diagrams MUST be included in PR description under "Visual Overview" section
- Diagrams aid reviewers in understanding changes quickly

Requirements for Issues:
- Use Mermaid diagrams when they improve clarity
- Examples: architecture diagrams, flow diagrams for bug reproduction
- Carefully consider placement for maximum impact

**Rationale**: Visual documentation accelerates code review, improves understanding, reduces miscommunication, and serves as living documentation. Complex changes cannot be effectively reviewed without visual aids.

### VIII. Chrome DevTools for Debugging ✅ TOOL REQUIREMENT

**Use chrome-devtools MCP server for all UI debugging and testing.**

Requirements:
- ALL UI/frontend debugging MUST use chrome-devtools MCP server
- Use DevTools for:
  - Visual regression testing (screenshots, snapshots)
  - Performance analysis (Core Web Vitals, trace recordings)
  - Network request monitoring and analysis
  - Console error detection and logging
  - UI interaction testing (clicks, forms, navigation)
  - Browser compatibility verification
  - Responsive design validation
- Integration with testing workflow:
  - Capture screenshots for test evidence
  - Monitor console for errors during test runs
  - Analyze network requests for performance issues
  - Validate UI state changes with snapshots
- Document debugging findings with screenshots and trace data

**Rationale**: chrome-devtools MCP provides automated, reproducible debugging capabilities that are essential for modern web development. Manual browser testing is error-prone and inconsistent; automated DevTools integration ensures reliable, documented debugging.

## Technology Standards

**Required versions for this project:**

- **Next.js**: 15.x (App Router, Server Components, Server Actions)
- **React**: 19.x (Server Components, Actions, Transitions, `use()` hook)
- **TypeScript**: 5.x (Strict mode, const type parameters, satisfies operator)
- **Tailwind CSS**: 4.x (CSS-first configuration, container queries, 3D transforms)
- **Node.js**: Compatible with Next.js 15 requirements
- **Package Manager**: pnpm (enforced via preinstall script)
- **Testing**: Jest with Testing Library (@testing-library/react, @testing-library/jest-dom)
- **Build Tool**: Turbopack (stable in Next.js 15)

**Framework-specific requirements:**

- Use Next.js App Router exclusively (no Pages Router)
- Use Next.js 15 Form component for forms with Server Actions
- Use async/await for data fetching in Server Components
- Use Tailwind CSS 4 @theme directive for customization (not tailwind.config.js)
- Use Prettier with Tailwind plugin for formatting
- Use ESLint config extending Next.js defaults

**Forbidden technologies/patterns:**

- ❌ Pages Router (use App Router)
- ❌ Client-side data fetching for static content (use Server Components)
- ❌ Inline styles (use Tailwind CSS)
- ❌ Direct DOM manipulation (use React)
- ❌ `var` declarations (use `const` or `let`)
- ❌ Mutating state directly (use immutable updates)
- ❌ Synchronous blocking operations in components

## Development Workflow

### Code Implementation Process

**Before writing code:**
1. Understand existing code patterns (read related files)
2. Check for existing reusable components/functions
3. Define types/interfaces properly
4. Write tests FIRST (TDD principle)

**During implementation:**
1. Write failing tests
2. Get user approval on tests
3. Implement minimum code to pass tests
4. Refactor while keeping tests green
5. Follow existing architectural patterns
6. Use descriptive variable/function names

**After writing code:**
1. Run linter: `pnpm lint` (fix with `pnpm lint:fix`)
2. Run type checker: `pnpm typecheck`
3. Run tests: `pnpm test` (all tests must pass)
4. Run formatter: `pnpm format`
5. Build check: `pnpm build` (must succeed)
6. Review error handling implementation
7. Verify accessibility requirements (semantic HTML, ARIA labels)
8. Update documentation if needed

### Git Commit Standards

**Commit message format:**
```
<type>(<scope>): <subject>

<body>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Types**: feat, fix, docs, style, refactor, test, chore, perf, ci

**Commit principles:**
- Atomic commits (one logical change per commit)
- Clear, descriptive messages focusing on "why"
- Always include AI attribution
- Handle pre-commit hook changes gracefully

### Pull Request Standards

**Required PR structure:**
```markdown
## Summary
- Brief description (1-3 bullet points)

## Visual Overview
[MANDATORY: Include relevant Mermaid diagrams]

## Detailed Changes
[Comprehensive list of modifications]

## Test Results
[Test outcomes with metrics]

## Impact Analysis
[Risk assessment and compatibility notes]

## Deployment Checklist
- [ ] Code review completed
- [ ] Tests passing
- [ ] Documentation updated

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

**PR best practices:**
- Review ALL commits in branch (not just latest)
- Include at least one Mermaid diagram (mandatory)
- Provide specific testing instructions
- Link related issues
- Include quantitative test results

### Issue Creation Standards

**Issue title format:** `[Type] Brief, clear description`

**Types**: [Bug], [Feature], [Enhancement], [Documentation], [Refactor], [Performance]

**Required sections:**
- Description (clear, concise summary)
- Steps to Reproduce (for bugs)
- Acceptance Criteria (for features)
- Technical Details (environment, versions, errors)
- Use Mermaid diagrams when they improve clarity

## Governance

### Amendment Procedure

1. Amendments MUST be documented with clear rationale
2. Changes require:
   - Clear description of what changed and why
   - Impact analysis on existing code/processes
   - Migration plan if needed
   - Update to dependent templates and documentation
3. Version bumping rules:
   - **MAJOR**: Backward incompatible changes, principle removals
   - **MINOR**: New principles added, material expansions
   - **PATCH**: Clarifications, wording improvements, typo fixes
4. Each amendment updates LAST_AMENDED_DATE and increments version

### Compliance & Enforcement

- All PRs/code reviews MUST verify compliance with these principles
- TDD compliance: Tests written before implementation (verified in git history)
- Type safety compliance: Zero TypeScript errors
- Security compliance: No secrets in code, all inputs validated
- Performance compliance: Build succeeds, no blocking operations
- Visual documentation compliance: PRs have required diagrams

### Constitution Supersedes All

- This constitution takes precedence over any conflicting practices
- Any deviation MUST be explicitly justified and documented
- Complexity that violates principles requires approval and documentation
- Use `ai-guidelines/` directory for detailed implementation guidance
- For runtime development: refer to CLAUDE.md and ai-guidelines/

### Exceptions & Justification

If a principle must be violated:
1. Document in PR description or issue
2. Explain why the principle cannot be followed
3. Describe simpler alternatives considered and why rejected
4. Get explicit approval from reviewers
5. Create follow-up issue to eliminate exception if possible

**Version**: 1.0.0 | **Ratified**: 2025-10-20 | **Last Amended**: 2025-10-20
