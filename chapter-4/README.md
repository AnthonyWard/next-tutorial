# Chapter 4: Forms & Server Actions

In this chapter, we will implement the initial booking interaction for our events. Next.js App Router provides Server Actions, a powerful way to handle form submissions and data mutations.

## Overview

We will cover the following topics:

1. **Server Actions**: Using Next.js Server Actions for data mutation.
2. **Form Validation**: Using Zod and React Hook Form for robust validation.
3. **Pending States**: Handling pending states with `useFormStatus` and React's `useActionState`.
4. **User Feedback**: Providing feedback with Toast notifications upon form submission.
5. **Testing Forms**: Adding unit tests and E2E coverage for our booking flow validations and interactions.

## Prerequisites

Ensure you have the `chapter-4-start` codebase ready. This should be a copy of your completed Chapter 3 work.

Run the development server to make sure everything is working:

```bash
cd chapter-4-start
pnpm install
pnpm dev
```

Visit `http://localhost:3000` to see your application.
