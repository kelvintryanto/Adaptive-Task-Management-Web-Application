"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useSyncExternalStore } from "react";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export interface ThemeToggleProps {
  withText?: boolean;
}

export function ThemeToggle({ withText = false }: ThemeToggleProps) {
  const isClient = useIsClient();
  const { theme, setTheme, systemTheme } = useTheme();

  if (!isClient) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  if (!currentTheme) return null;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="cursor-pointer py-2 rounded-full w-full"
      tabIndex={-1}
    >
      {currentTheme === "dark" ? (
        withText ? (
          <div className="flex gap-2 items-center">
            <Moon size={18} />
            <span>Dark</span>
          </div>
        ) : (
          <Moon size={18} />
        )
      ) : withText ? (
        <div className="flex gap-2 items-center">
          <Sun size={18} />
          <span>Light</span>
        </div>
      ) : (
        <Sun size={18} />
      )}
    </button>
  );
}
