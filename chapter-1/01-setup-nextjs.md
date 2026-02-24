# Step 1: Setting up Next.js with TypeScript and pnpm

This section covers initializing a robust Next.js application using standard industry practices.

## Prerequisites
- Node.js (v18 or later)
- pnpm installed (`npm install -g pnpm`)

## 1. Initialize the Project
We will use `create-next-app` to set up the boilerplate. We will use specific flags to ensure a consistent setup without interactive prompts.

Run the following command in your terminal:

```bash
pnpm create next-app@latest nextjs-training \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-pnpm \
  --no-git \
  --react-compiler
```

**Flags explained:**
- `--typescript`: Initialize with TypeScript.
- `--tailwind`: Initialize with Tailwind CSS.
- `--eslint`: Configure ESLint.
- `--app`: Use the App Router (modern Next.js architecture).
- `--src-dir`: Store code in a `src` directory.
- `--import-alias "@/*"`: Configure path aliases.
- `--use-pnpm`: Force usage of pnpm.

## 2. Verify Installation
Enter the directory and run the development server:

```bash
cd nextjs-training
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app running.

## 3. Project Structure
Your project should look like this:
- `src/app`: Contains your routes and pages.
- `src/components`: (You will create this) for reusable UI components.
- `public`: Static assets.
- `package.json`: Dependencies and scripts.
