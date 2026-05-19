import { AppShell } from "@/components/navigation/app-shell";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="p-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-zinc-500 mt-2">
          Welcome to Adaptive Task Management
        </p>
      </div>
    </AppShell>
  );
}
