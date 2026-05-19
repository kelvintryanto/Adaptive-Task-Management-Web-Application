import { ReactNode } from "react";

import { AppShell } from "@/components/navigation/app-shell";

type Props = {
  children: ReactNode;
};

export default function ProtectedLayout({ children }: Props) {
  return <AppShell>{children}</AppShell>;
}
