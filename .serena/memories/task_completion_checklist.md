# Task Completion Checklist

## Before Starting Any Task

### 1. Understand Requirements

- [ ] Read the task description thoroughly
- [ ] Identify all acceptance criteria
- [ ] Ask for clarification if needed
- [ ] Check existing code for patterns to follow

### 2. Setup

- [ ] Pull latest changes from main branch
- [ ] Create feature branch if needed
- [ ] Run `pnpm install` to ensure dependencies are current
- [ ] Run `pnpm dev` to verify setup works

## During Development

### 3. Code Implementation

- [ ] Follow existing code patterns and conventions
- [ ] Use Server Components by default
- [ ] Add Client Components only when necessary
- [ ] Implement proper TypeScript types
- [ ] Handle errors appropriately
- [ ] Add loading and error states for async operations
- [ ] Validate and sanitize all inputs
- [ ] Never hardcode secrets or API keys

### 4. Testing

- [ ] Write tests for new functionality
- [ ] Update existing tests if behavior changes
- [ ] Ensure all tests pass: `pnpm test`
- [ ] Check test coverage if applicable
- [ ] Test edge cases and error scenarios

## Before Committing Code

### 5. Code Quality Checks

**IMPORTANT**: Use `pnpm` for all commands (not npm)

**Run these commands in order:**

```bash
# 1. Check TypeScript types
pnpm typecheck

# 2. Run linter
pnpm lint

# 3. Fix auto-fixable lint issues
pnpm lint:fix

# 4. Format code
pnpm format

# 5. Run all tests
pnpm test

# 6. Build for production (if significant changes)
pnpm build
```

### 6. Pre-Commit Verification

- [ ] ✅ No TypeScript errors (`pnpm typecheck`)
- [ ] ✅ No ESLint errors (`pnpm lint`)
- [ ] ✅ Code is properly formatted (`pnpm format`)
- [ ] ✅ All tests pass (`pnpm test`)
- [ ] ✅ Build succeeds if applicable (`pnpm build`)
- [ ] ✅ No console.logs left (except warnings/errors)
- [ ] ✅ No commented-out code
- [ ] ✅ No TODO comments without context

## After Task Completion

### 7. Documentation

- [ ] Update README if functionality changes
- [ ] Add JSDoc comments for complex functions
- [ ] Update API documentation if endpoints change
- [ ] Document breaking changes

### 8. Git Operations

- [ ] Stage relevant files: `git add .`
- [ ] Write clear commit message
- [ ] Push changes to remote
- [ ] Create pull request if needed
- [ ] Request code review

### 9. Final Verification

- [ ] Feature works as expected
- [ ] No regression in existing features
- [ ] Performance is acceptable
- [ ] Accessibility requirements met
- [ ] Mobile responsiveness verified (if applicable)

## Common Issues to Check

### Performance

- [ ] No unnecessary re-renders
- [ ] Images optimized with Next.js Image
- [ ] Code splitting implemented where needed
- [ ] No memory leaks
- [ ] API calls properly cached

### Security

- [ ] No exposed sensitive data
- [ ] Input validation implemented
- [ ] SQL injection prevention (if applicable)
- [ ] XSS prevention measures
- [ ] CSRF protection (if applicable)

### Accessibility

- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Proper ARIA labels
- [ ] Color contrast sufficient
- [ ] Focus indicators visible

## Quick Command Reference

### Essential Commands to Run

```bash
# Before committing (in this order)
pnpm typecheck       # TypeScript check
pnpm lint            # ESLint check
pnpm format          # Prettier format
pnpm test            # Run tests

# Optional but recommended
pnpm build           # Verify production build
```

### If Issues Found

```bash
pnpm lint:fix        # Auto-fix ESLint issues
pnpm format          # Auto-format with Prettier
pnpm test -- -u      # Update test snapshots if needed
```

## Red Flags - Stop and Fix

⚠️ **Do NOT commit if:**

- TypeScript compilation fails
- ESLint shows errors (not warnings)
- Tests are failing
- Build is broken
- Sensitive data is exposed
- Performance degradation noticed

## Green Flags - Good to Go

✅ **Ready to commit when:**

- All commands pass without errors
- Code follows project conventions
- Tests provide good coverage
- Documentation is updated
- Code is reviewed (self-review at minimum)
- Feature works in development mode
- No regression in existing features

## Notes

- **This project uses pnpm exclusively** - Do not use npm or yarn
- This checklist applies to all code changes, big or small
- For hotfixes, minimum requirements are: lint, typecheck, and related tests
- For major features, all checks are mandatory
- When in doubt, run all checks
- Always test in development mode before committing
- Use `pnpm i` as a shorthand for `pnpm install`
