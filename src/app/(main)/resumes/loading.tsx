// src/app/resumes/loading.tsx

export default function Loading() {
    return (
      <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6 animate-pulse">
        <div className="h-10 w-40 bg-zinc-800 rounded" />
        <div className="h-6 w-20 bg-zinc-700 rounded" />
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-48 w-full bg-zinc-900 rounded-lg shadow-md"
            />
          ))}
        </div>
      </main>
    );
  }