import { Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex items-center gap-3">
          <Shield className="w-10 h-10 text-purple-600" />
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Welcome to the Bharat Knowledge admin panel
        </p>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
          </li>
          <li>Manage content and users from this dashboard</li>
        </ol>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="text-sm text-gray-500">
          © 2026 Bharat Knowledge Admin. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
