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