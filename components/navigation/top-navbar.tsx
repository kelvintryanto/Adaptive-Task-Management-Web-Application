"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function TopNavbar() {
  const { data: session } = useSession();
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    function updateTime() {
      const now = new Date();

      const formatted = now.toLocaleString("en-CA", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setCurrentTime(formatted);
    }

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 h-10 border-b bg-white/80 dark:bg-zinc-950/80 backdrop-blur border-zinc-200 dark:border-zinc-800">
      <div className="flex h-full w-full items-center justify-between px-6">
        <h2 className="text-xs lg:text-lg font-semibold">
          Welcome, {session?.user?.name || "User"} 👋
        </h2>
        <span className="text-xs md:text-md text-zinc-500">{currentTime}</span>
      </div>
    </header>
  );
}
