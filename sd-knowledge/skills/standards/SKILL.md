---
name: standards
description: This skill should be used when the user asks about Smart Data's coding standards, conventions, best practices, code review guidelines, naming conventions, or how the team prefers to structure code and projects.
---

# Smart Data Technical Standards

## General Principles

- Follow SOLID principles across all codebases
- Prefer simplicity over cleverness — code is read more than written
- Write tests for business logic; don't test framework behavior
- Every dependency must justify its existence

## Code Style

<!-- TODO: Fill in SD's actual coding standards per language -->

### TypeScript / JavaScript

- Use TypeScript for all new projects
- Strict mode enabled
- Prefer `const` over `let`, never use `var`
- Use named exports over default exports
- File naming: kebab-case (e.g., `user-service.ts`)

### .NET / C#

- Follow Microsoft's official C# conventions
- Use dependency injection throughout
- Async/await for all I/O operations

### Python

- Follow PEP 8
- Type hints on all public functions
- Use virtual environments for all projects

## Git Conventions

- Branch naming: `feature/`, `bugfix/`, `hotfix/` prefixes
- Commit messages: imperative mood, max 72 chars for subject
- Pull requests require at least one reviewer
- Squash merge to main/master

## Project Structure

<!-- TODO: Fill in SD's standard project layouts -->

## Code Review Checklist

- Does the code do what the PR description says?
- Are there tests for new behavior?
- Are error cases handled?
- Is the code readable without explanation?
- Are there any security concerns?
- Does it follow the project's existing patterns?
