# Chapter 3: Dynamic Routes & Data Fetching

In this chapter, we will build out the core functionality of our event booking system: listing events and viewing their details. Next.js excels at these patterns through Dynamic Routes and Server Components.

## Overview

We will cover the following topics:

1.  **Dynamic Routing**: Creating routes that depend on external data (e.g., `/events/[id]`).
2.  **Server Components**: Fetching data directly in your components without client-side `useEffect`.
3.  **Loading & Error UI**: Using `loading.tsx` and `error.tsx` file conventions for better UX.
4.  **Mocking Data**: How to test components that fetch data.

## Prerequisites

Ensure you have the `chapter-3-start` codebase ready. This should be a copy of your completed Chapter 2 work.

Run the development server to make sure everything is working:

```bash
cd chapter-3-start
pnpm install
pnpm dev
```

Visit `http://localhost:3000` to see your application.
