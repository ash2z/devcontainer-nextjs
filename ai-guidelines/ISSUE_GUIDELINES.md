# AI Guidelines for Automatic GitHub Issue Creation

This document outlines the guidelines for AI systems (like Claude) to automatically create well-structured GitHub issues.

## Issue Creation Standards

### 1. Issue Title

- **Format**: `[Type] Brief, clear description`
- **Types**: `[Bug]`, `[Feature]`, `[Enhancement]`, `[Documentation]`, `[Refactor]`, `[Performance]`
- **Length**: 50-80 characters maximum
- **Example**: `[Bug] Navigation menu not responsive on mobile devices`

### 2. Issue Body Structure

#### Required Sections

**Description**

- Provide a clear, concise summary of the issue
- Include context and background information
- State the expected vs actual behavior (for bugs)

**Steps to Reproduce** (for bugs)

```markdown
1. Navigate to [specific page/feature]
2. Perform [specific action]
3. Observe [unexpected result]
```

**Acceptance Criteria** (for features/enhancements)

- [ ] Clear, measurable outcomes
- [ ] Testable requirements
- [ ] User-facing benefits

**Technical Details**

- Environment information (OS, browser, versions)
- Error messages or logs (in code blocks)
- Screenshots or recordings (if applicable)

### 3. Labels and Metadata

Applicable labels should be obtained from GitHub's label list and the appropriate one selected.
`gh label list`
- Priority Labels
- Type Labels
- Status Labels

### 4. Best Practices

#### DO:

- Search existing issues before creating duplicates
- Use markdown formatting for clarity
- Include relevant code snippets in triple backticks
- Reference related issues/PRs with `#` notation
- Provide minimal reproducible examples
- Include version numbers and environment details

#### DON'T:

- Create vague or ambiguous issues
- Include sensitive information (passwords, API keys)
- Combine multiple unrelated problems in one issue
- Use excessive capitalization or emojis
- Create issues without proper research

### 5. Template Example

```markdown
## Description

Brief description of the issue and its impact.

## Current Behavior

What happens currently.

## Expected Behavior

What should happen instead.

## Steps to Reproduce

1. Step one
2. Step two
3. Step three

## Environment

- OS: [e.g., macOS 14.0]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 20.11.0]
- Project version: [e.g., 1.2.3]

## Additional Context

Any other relevant information, screenshots, or logs.

## Possible Solution

(Optional) Suggest a fix or reason for the bug.
```

### 6. Automation Guidelines

When creating issues programmatically:

1. **Validate Required Fields**
   - Title must be non-empty and descriptive
   - Body must include description
   - At least one label should be applied

2. **Format Consistency**
   - Use consistent markdown formatting
   - Ensure code blocks have language hints
   - Maintain proper heading hierarchy

3. **Context Gathering**
   - Collect system information automatically
   - Include relevant file paths and line numbers
   - Add commit hash or version information

4. **Error Handling**
   - Check for duplicate issues before creation
   - Handle API rate limits gracefully
   - Provide fallback for missing information

5. **Use mermaid diagrams**
   - Actively use mermaid diagrams when you determine that they are efficient for understanding.
   - Carefully consider where to insert diagrams.

### 7. Issue Lifecycle

1. **Creation**: Follow these guidelines
2. **Triage**: Team reviews and assigns priority
3. **Development**: Issue moves to in-progress
4. **Review**: Code review and testing
5. **Closure**: Issue resolved and closed with notes

### 8. Special Considerations

**Security Issues**

- Never include sensitive data
- Use private security advisories for vulnerabilities
- Follow responsible disclosure practices

**Performance Issues**

- Include benchmarks or metrics
- Specify impact on user experience
- Provide profiling data if available

**Documentation Issues**

- Link to specific documentation pages
- Suggest concrete improvements
- Include examples of better documentation

## Summary

Well-structured GitHub issues accelerate development by providing clear, actionable information. AI systems should prioritize clarity, completeness, and consistency when creating issues automatically.
