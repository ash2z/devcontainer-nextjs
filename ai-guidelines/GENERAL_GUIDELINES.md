# CLAUDE.md

This file provides guidance to Claude (claude.ai) when working with code in this repository.

## Language Settings

**Output Language Rules**:

- When users ask questions in Japanese → Respond in Japanese
- Code comments should be in English for better international collaboration
- Variable names, function names, and identifiers must be in English
- Documentation in code files should be in English

## Core Development Principles

### 1. Code Quality First

- **Readability over cleverness**: Code is read more often than written
- **Maintainability**: Consider the next developer (including future AI assistants)
- **Simplicity**: Choose the simplest solution that works
- **Consistency**: Follow existing codebase patterns

### 2. Security First

- Never hardcode API keys, credentials, or secrets
- Validate and sanitize all user inputs
- Use environment variables properly
- Never commit sensitive information
- Follow OWASP security guidelines

### 3. Error Handling

- Handle all error cases appropriately
- Provide user-friendly error messages
- Log errors properly for debugging
- Use language-appropriate error handling patterns
- Implement proper retry logic where needed

## Coding Standards

**For detailed coding guidelines, refer to:**
@ai-guidelines/CODING_GUIDELINES.md

### Must Follow:

1. **Type Safety**: Use type checking where available (TypeScript, mypy, etc.)
2. **Linting**: Zero errors/warnings from project linter
3. **Formatting**: Maintain consistent code formatting
4. **Naming Conventions**:
   - Follow language-specific conventions
   - Be descriptive but concise
   - Use consistent terminology
   - Avoid abbreviations unless widely understood

## Best Practices Checklist

Before writing code:

- [ ] Understand existing code patterns
- [ ] Check for existing reusable components/functions
- [ ] Define types/interfaces properly (if applicable)
- [ ] Consider the appropriate design pattern

After writing code:

- [ ] Run linter - no errors/warnings
- [ ] Run build - builds successfully
- [ ] Run tests - all tests pass
- [ ] Implement proper error handling
- [ ] Add comments where necessary
- [ ] Consider performance implications
- [ ] Meet accessibility requirements (if applicable)
- [ ] Update documentation

## Git Workflow

### Branch Strategy

- `main` or `master`: Production branch
- `develop`: Development branch (if using git-flow)
- `feature/*`: Feature development branches
- `bugfix/*` or `fix/*`: Bug fix branches
- `hotfix/*`: Emergency fix branches
- `release/*`: Release preparation branches

## Performance Considerations

1. **Resource Optimization**:
   - Optimize algorithms and data structures
   - Implement appropriate caching strategies
   - Use lazy loading where applicable
   - Monitor memory usage

2. **Code Optimization**:
   - Avoid premature optimization
   - Profile before optimizing
   - Use async operations for I/O
   - Implement pagination for large datasets

3. **Build Optimization**:
   - Minimize bundle sizes
   - Remove dead code
   - Use production builds for deployment
   - Implement code splitting where appropriate

## Testing Requirements

1. **Unit Tests**:
   - Test individual functions/methods
   - Mock external dependencies
   - Aim for high code coverage

2. **Integration Tests**:
   - Test component interactions
   - Test API integrations
   - Verify data flow

3. **End-to-End Tests**:
   - Test complete user workflows
   - Verify critical business paths
   - Test across different environments

4. **Other Testing**:
   - Performance testing
   - Security testing
   - Accessibility testing
   - Cross-browser/platform testing (if applicable)

## Code Quality Standards

### Clean Code Principles

- Single Responsibility Principle (SRP)
- Don't Repeat Yourself (DRY)
- Keep It Simple, Stupid (KISS)
- You Aren't Gonna Need It (YAGNI)
- Composition over Inheritance

### Code Review Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Code builds without warnings
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] No debugging code left
- [ ] Security implications considered
- [ ] Performance impact assessed

## Documentation Standards

### Code Comments

- Comment complex logic in English
- Explain "why" not "what"
- Use documentation generators when available (JSDoc, Sphinx, etc.)
- Keep comments up-to-date with code changes
- Include examples for complex functions

### Project Documentation

- Keep README up-to-date
- Document setup procedures
- Include troubleshooting guide
- Maintain changelog
- Document API endpoints (if applicable)

## Dependency Management

- Keep dependencies up-to-date
- Review security vulnerabilities regularly
- Document why each dependency is needed
- Prefer well-maintained packages
- Consider bundle size impact
- Lock dependency versions for reproducibility

## AI Assistant Guidelines

Guidelines for AI assistants (Claude, etc.) when working with code:

### 1. Understanding Context

- Always read related files before making changes
- Understand the project's architecture
- Follow existing patterns and conventions
- Ask for clarification when uncertain

### 2. Implementation Approach

- Break large changes into small, testable steps
- Write tests alongside code changes
- Make atomic commits
- Refactor separately from feature changes
- Consider backward compatibility

### 3. Communication

- Explain implementation plans before starting
- Provide reasoning for design decisions
- Highlight potential risks or breaking changes
- Suggest alternatives when appropriate
- Document assumptions made

### 4. Code Generation Rules

- Generate code that matches existing style
- Include appropriate error handling
- Add necessary type annotations
- Write self-documenting code
- Include tests for generated code

## Security Considerations

⚠️ **Never**:

- Store secrets in code
- Log sensitive information
- Use unsafe functions without validation
- Ignore security warnings
- Implement custom cryptography

✅ **Always**:

- Validate and sanitize inputs
- Use parameterized queries
- Implement rate limiting (where applicable)
- Keep dependencies updated
- Follow security best practices for the language/framework

## Debugging and Monitoring

### Development

- Use appropriate debugging tools
- Remove debug code before committing
- Use structured logging
- Include correlation IDs for tracing

### Production

- Implement comprehensive logging
- Set up error tracking
- Monitor performance metrics
- Create alerting rules
- Maintain audit logs (where required)

## Response Language Protocol

**IMPORTANT**:

- If user asks in Japanese → Respond in Japanese
- If user asks in other languages → Respond in that language if possible, otherwise in English

---

**Last Updated**: 2025  
**Version**: 1.0

This is a generic template. Customize sections marked with [Project-specific] for your particular project needs.
