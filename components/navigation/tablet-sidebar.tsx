"use client";

import Link from "next/link";

import { LayoutDashboard, CheckSquare, BadgeCheck, LogOut } from "lucide-react";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ToggleTheme";

const menus = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    href: "/completed",
    icon: BadgeCheck,
  },
];

export function TabletSidebar() {
  return (
    <aside className="hidden md:flex lg:hidden w-20 border-r bg-white dark:bg-zinc-950 dark:border-zinc-800 flex-col items-center py-4">
      <div className="flex-1 space-y-4">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className="flex items-center justify-center rounded-xl p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
            >
              <Icon size={20} />
            </Link>
          );
        })}
      </div>

      <div className="flex rounded-xl gap-3 px-4 py-3 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">
        <ThemeToggle />
      </div>
      <Button
        onClick={() =>
          signOut({
            callbackUrl: "/",
          })
        }
        variant={"ghost"}
        className="rounded-xl p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
      >
        <LogOut size={20} />
      </Button>
    </aside>
  );
}
