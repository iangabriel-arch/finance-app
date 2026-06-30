# Engineering Decisions

This document records the important technical decisions made throughout the development of **The Iron Archive**.

The goal is not only to remember *what* was decided, but also *why* it was decided.

---

## ED-001 — Framework

**Decision**

Use Next.js (App Router) with TypeScript.

**Why**

- Excellent performance
- SEO-friendly
- Modern React architecture
- Great developer experience
- Industry standard
- Easy deployment to Vercel

**Trade-offs**

- Slight learning curve with Server and Client Components.
- Some third-party libraries require additional setup.

---

## ED-002 — Project Philosophy

**Decision**

Build a product, not a portfolio.

**Why**

The purpose of this project is to demonstrate software engineering thinking, architecture, and craftsmanship—not just visual design.

Every feature must either:

- Improve the user experience
- Demonstrate engineering ability
- Strengthen the story

If it does none of the above, it doesn't belong in the project.

---

## ED-003 — Architecture

**Decision**

Adopt a feature-first architecture.

**Why**

As the project grows, related files stay together, making the codebase easier to navigate, maintain, and scale.