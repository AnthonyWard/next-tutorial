# Next.js Training Series

This repository contains a step-by-step tutorial for developers and testers to learn Next.js, Storybook, and Testing strategies.

## Structure

### Chapter 1: Foundation & Setup
The files for this chapter are located in the [chapter-01](./chapter-01) directory.
- **01 Setup Next.js**: Initializing the project with TypeScript, Tailwind, and ESLint.
- **02 Setup Storybook**: Integrating Storybook for component development.
- **03 Unit Testing**: Setting up Vitest and React Testing Library.
- **04 Storybook Testing**: Using Storybook's interaction tests.
- **05 E2E Testing**: Configuring Playwright for End-to-End testing.

### Chapter 2: Dynamic Content & API Integration (Proposed)
The next chapter focuses on working with data, which is critical for real-world applications.
- **06 Creating API Routes**: Simulating a backend API using Next.js Route Handlers.
- **07 Server Components**: Fetching and displaying data using React Server Components.
- **08 Network Mocking**: Advanced testing strategies for data-dependent components (MSW/Playwright routing).
- **09 Asynchronous Stories**: Handling loading and data states in Storybook.

### Chapter 3: Forms & Mutations (Proposed)
Moving beyond reading data, this chapter focuses on user interaction, forms, and updating data.
- **10 Server Actions**: Using the modern Next.js pattern for handling form submissions and data mutations directly from components.
- **11 Form Validation**: Implementing client and server-side validation using **Zod** and **React Hook Form**.
- **12 Interactive Stories**: Using Storybook's `play` function to script complex multi-step form interactions (e.g., fill form, validation error, success state).
- **13 Advanced E2E Flows**: Testing "Create" and "Update" workflows with Playwright, including checking for validation feedback and successful submission states.
