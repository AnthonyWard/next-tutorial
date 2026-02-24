# Step 2: Layouts and Templates

Next.js provides a way to create shared UI segments using `layout.tsx`.

## 1. Understanding the Root Layout

Open `src/app/layout.tsx`. This is the **Root Layout**. It is required and must contain `html` and `body` tags. Any UI defined here is shared across **all** pages of your application.

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ... font configurations ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

## 2. Create a Nested Layout

Layouts can also be nested. Let's create a layout specifically for a "dashboard" section of our app.

1. Create a folder `src/app/dashboard`.
2. Create `src/app/dashboard/page.tsx` with some dummy content.
3. Create `src/app/dashboard/settings/page.tsx` with some dummy content.
4. Now, create `src/app/dashboard/layout.tsx`:

```tsx
// src/app/dashboard/layout.tsx
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-zinc-900 p-4">
        <nav className="flex flex-col gap-2">
          <div className="font-bold text-lg mb-4">Dashboard</div>
          <Link href="/dashboard" className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded">
            Overview
          </Link>
          <Link href="/dashboard/settings" className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded">
            Settings
          </Link>
          <Link href="/" className="mt-8 text-sm text-gray-500">
            &larr; Back Home
          </Link>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
```

## 3. Verify Nesting

Navigate to `/dashboard`. You will see the sidebar.
Navigate to `/dashboard/settings`. You will see the **same** sidebar. The layout persists and does not re-render, only the `{children}` part changes.

## 4. Templates (Concept)

A `template.tsx` is similar to a layout, but it creates a new instance for each child on navigation. This means state is not preserved. For now, `layout.tsx` is what we usually want for navigation shells.
