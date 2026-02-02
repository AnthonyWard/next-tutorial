# Step 2: Adding Storybook

Storybook is a frontend workshop for building UI components and pages in isolation.

## 1. Initialize Storybook
Inside your project directory (`nextjs-training`), runs the following command:

```bash
pnpm dlx storybook@latest init
```

If asked if you want to run the "init" command, press `y`.
If asked about ESLint migration, you can accept.

This command detects your project type (Next.js) and sets up the necessary configuration. It will:
- Add `.storybook` folder.
- Add `src/stories` with example components.
- Update `package.json` with scripts.

## 2. Run Storybook
Start the Storybook server:

```bash
pnpm storybook
```

This will open Storybook locally on port 6006.

## 3. Verify Setup
You should see the "Example/Button" and "Example/Header" stories in the sidebar. This confirms Storybook is correctly reading TypeScript components.
