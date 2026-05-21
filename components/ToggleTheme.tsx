"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useSyncExternalStore } from "react";
import clsx from "clsx";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export interface ThemeToggleProps {
  withText?: boolean;
  variant?: "default" | "bottom-nav";
}

export function ThemeToggle({
  withText = false,
  variant = "default",
}: ThemeToggleProps) {
  const isClient = useIsClient();

  const { theme, setTheme, systemTheme } = useTheme();

  if (!isClient) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  if (!currentTheme) return null;

  const isDark = currentTheme === "dark";

  const Icon = isDark ? Moon : Sun;

  const label = isDark ? "Dark" : "Light";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      tabIndex={-1}
      className={clsx(
        "cursor-pointer transition",
        variant === "default" && "flex items-center gap-2 rounded-full w-full",
        variant === "bottom-nav" &&
          "flex flex-col items-center justify-center text-center text-xs",
      )}
    >
      <Icon size={20} />

      {withText && <span>{label}</span>}
    </button>
  );
}
