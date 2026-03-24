export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="h-10 w-48 bg-gray-200 dark:bg-zinc-800 rounded mb-8 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-48 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}