# Next.js Tutorial

This is a tutorial that walks through starting a Next.js app from scratch, including adding storybooks and tests. We will eventually build this out to be a simple event booking system, demonstrating multi-part forms and state management.

## The technology stack is
- Node with PNPM
- Next.js
- Storybook
- Tailwind
- Vitest (for unit and storybook testing)
- playwright (for end to end testing)

## Prerequisites
- Node 22+
- PNPM configured for cloudsmith

## Chapter 1: Getting Started

Chapter 1 takes us through the inital setup and a simple message component and set of tests to get us started and make sure we have our local tooling installed correctly.

## Chapter 2: Routing, Layouts, and Styling

In Chapter 2, we expand the application by adding new pages, implementing shared layouts, and styling components with Tailwind CSS. We also continue our testing journey by adding unit and E2E tests for the new features.

[Go to Chapter 2](./chapter-2/README.md)

## Chapter 3: Dynamic Routes & Data Fetching

We will build the Event Listing and Details pages.
- Dynamic Routing with `/events/[id]`
- Server Components & Data Fetching strategies
- Handling Loading and Error UI states
- Mocking data for maintainable tests

[Go to Chapter 3](./chapter-3/README.md)

## Chapter 4: Forms & Server Actions (Planned)

We will implement the initial booking interaction.
- Using Next.js Server Actions for data mutation
- Form validation with Zod and React Hook Form
- Handling pending states with `useFormStatus`
- User feedback with Toast notifications

## Chapter 5: Advanced State Management (Planned)

We will build the multi-step booking wizard mentioned in the project goals.
- Managing complex state across multiple screens
- URL-state vs. React Context for wizards
- Deep-linking to specific booking steps

## Chapter 6: Production Readiness (Planned)

- Dynamic Metadata & SEO for event pages
- Image Optimization
- Accessibility (a11y) audit
- Final Build & Deployment prep