"use client";

import { ThemeToggle } from "@/components/ToggleTheme";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 dark:bg-black">
      <div className="flex justify-end px-5 bg-zinc-50 dark:bg-transparent">
        <ThemeToggle withText />
      </div>
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center mx-auto">
        <h1 className="text-6xl font-bold text-center">Hello world!</h1>
      </main>
    </div>
  );
}
