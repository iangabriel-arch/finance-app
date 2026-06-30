# Development Standards

These standards apply to every file in The Iron Archive.

## Philosophy

Write code that is easy to understand, easy to maintain, and easy to extend.

Code is written for humans first, computers second.

---

## General Principles

- Prioritize readability over cleverness.
- Keep components small and focused.
- Avoid duplication.
- Prefer composition over complexity.
- Use strict TypeScript types.
- Every decision must earn its place.

---

## Components

- One responsibility per component.
- Keep files under ~200 lines where practical.
- Move reusable logic into hooks or utilities.
- Reuse before rewriting.

---

## Styling

- Tailwind CSS only.
- Use the `cn()` utility for class names.
- Avoid inline styles unless absolutely necessary.
- Follow the design system.

---

## Naming

Components:
PascalCase

Example:

Button.tsx

ProjectCard.tsx

Functions:
camelCase

Example:

getProjects()

formatDate()

Constants:
UPPER_SNAKE_CASE

Example:

MAX_PROJECTS

DEFAULT_THEME

---

## Comments

Comment **why**, not **what**.

Bad:

// Increment i

Good:

// Prevent duplicate requests while the previous request is pending.

---

## Git

Commit messages follow Conventional Commits.

Examples:

feat:

fix:

refactor:

docs:

style:

test:

chore:

Every commit should represent one logical change.