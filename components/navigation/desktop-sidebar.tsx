"use client";

import Link from "next/link";

import { LayoutDashboard, CheckSquare, BadgeCheck, LogOut } from "lucide-react";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

const menus = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    label: "Completed",
    href: "/completed",
    icon: BadgeCheck,
  },
];

export function DesktopSidebar() {
  return (
    <aside className="hidden lg:flex w-72 border-r bg-white dark:bg-zinc-950 dark:border-zinc-800 flex-col">
      {/* LOGO */}
      <div className="p-6 border-b dark:border-zinc-800">
        <h1 className="text-2xl font-bold">Turboly Tasks</h1>

        <p className="text-sm text-zinc-500 mt-1">Adaptive Task Management</p>
      </div>

      {/* MENU */}
      <nav className="flex-1 p-4 space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
            >
              <Icon size={18} />

              <span>{menu.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t dark:border-zinc-800">
        <Button
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
          variant={"ghost"}
          className="flex w-full justify-start gap-3 px-4 py-6 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-950 text-red-500 transition"
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>
    </aside>
  );
}
