import { ReactNode } from "react";
import { DesktopSidebar } from "./desktop-sidebar";
import { TabletSidebar } from "./tablet-sidebar";
import { MobileBottomNav } from "./mobile-bottom-nav";

type Props = {
  children: ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      {/* DESKTOP */}
      <DesktopSidebar />

      {/* TABLET */}
      <TabletSidebar />

      {/* CONTENT */}
      <main className="flex flex-col flex-1 md:pb-0 md:ml-20 lg:ml-72">
        {children}
      </main>

      {/* MOBILE */}
      <MobileBottomNav />
    </div>
  );
}
