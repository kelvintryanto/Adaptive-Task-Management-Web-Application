import { ClipboardList } from "lucide-react";

export function TaskEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed p-12 text-center">
      <ClipboardList size={48} className="text-zinc-400" />

      <h2 className="mt-4 text-xl font-semibold">No tasks yet</h2>

      <p className="mt-2 text-sm text-zinc-500">
        Create your first task to get started.
      </p>
    </div>
  );
}
