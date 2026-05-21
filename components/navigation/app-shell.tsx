"use client";

import { ReactNode } from "react";
import { DesktopSidebar } from "./desktop-sidebar";
import { TabletSidebar } from "./tablet-sidebar";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { TopNavbar } from "./top-navbar";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
        {/* DESKTOP */}
        <DesktopSidebar />

        {/* TABLET */}
        <TabletSidebar />

        {/* CONTENT */}
        <main className="flex flex-col flex-1 md:pb-0 md:ml-20 lg:ml-72">
          <TopNavbar />

          {children}
        </main>

        {/* MOBILE */}
        <MobileBottomNav />
      </div>
    </SessionProvider>
  );
}
