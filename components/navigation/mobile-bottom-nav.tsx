"use client";

import Link from "next/link";

import { LayoutDashboard, CheckSquare, BadgeCheck, LogOut } from "lucide-react";

import { signOut } from "next-auth/react";
import { ThemeToggle } from "../ToggleTheme";

export function MobileBottomNav() {
  return (
    <div>
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white dark:bg-zinc-950 dark:border-zinc-800 md:hidden">
        <div className="grid grid-cols-4">
          <Link
            href="/dashboard"
            className="flex flex-col items-center justify-center py-3 text-xs"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            href="/tasks"
            className="flex flex-col items-center justify-center py-3 text-xs"
          >
            <CheckSquare size={20} />
            Tasks
          </Link>

          <Link
            href="/completed"
            className="flex flex-col items-center justify-center py-3 text-xs"
          >
            <BadgeCheck size={20} />
            Completed
          </Link>

          <button
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
            className="flex flex-col items-center justify-center py-3 text-xs"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </nav>

      <div className="fixed top-2 right-4 z-50">
        <ThemeToggle withText />
      </div>
    </div>
  );
}
