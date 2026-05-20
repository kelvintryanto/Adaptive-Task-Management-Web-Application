import { CalendarDays } from "lucide-react";

type Task = {
  id: string;
  title: string;
  description?: string | null;
  dueDate: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  completed: boolean;
};

type Props = {
  task: Task;
};

export function TaskCard({ task }: Props) {
  return (
    <div className="rounded-2xl border bg-white dark:bg-zinc-900 p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">{task.title}</h2>

          {task.description && (
            <p className="mt-2 text-sm text-zinc-500">{task.description}</p>
          )}
        </div>

        <div
          className={`
            rounded-full px-2 py-1 text-xs font-medium
            ${
              task.priority === "HIGH"
                ? "bg-red-100 text-red-600"
                : task.priority === "MEDIUM"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
            }
          `}
        >
          {task.priority}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <CalendarDays size={16} />

          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>

        <div
          className={`
            rounded-full px-3 py-1 text-xs font-medium
            ${
              task.completed
                ? "bg-green-100 text-green-700"
                : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            }
          `}
        >
          {task.completed ? "Completed" : "To do"}
        </div>
      </div>
    </div>
  );
}
