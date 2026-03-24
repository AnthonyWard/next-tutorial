import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">About Us</h1>
      <p className="mb-4">
        Welcome to our Next.js tutorial application. We are learning how to build modern web apps.
      </p>
      <Link href="/" className="text-blue-500 hover:underline">
        Go Home
      </Link>
    </div>
  );
}