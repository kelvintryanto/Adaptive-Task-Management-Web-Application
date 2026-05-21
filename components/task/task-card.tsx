import { CalendarDays, Check, Pencil, Trash2, X } from "lucide-react";
import { Button } from "../ui/button";
import { TaskModal } from "./task-modal";

export type Task = {
  id: string;
  title: string;
  description?: string | null;
  dueDate: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  completed: boolean;
};

type Props = {
  task: Task;
  onDelete?: (id: string) => void;
  onUpdate?: () => void;
};

export function TaskCard({ task, onDelete, onUpdate }: Props) {
  async function handleDelete() {
    try {
      const res = await fetch(`/api/task/${task.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete task");
      }

      // refresh tasks
      onDelete?.(task.id);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCompleteUncomplete() {
    try {
      const res = await fetch(`/api/task/${task.id}/toggle-complete`, {
        method: "PATCH",
      });

      if (!res.ok) {
        throw new Error("Failed to toggle complete");
      }

      onUpdate?.();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="rounded-2xl border bg-white dark:bg-zinc-900 p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2
            className={`text-lg font-semibold ${task.completed ? "line-through" : ""}`}
          >
            {task.title}
          </h2>

          {task.description && (
            <p
              className={`mt-2 text-sm text-zinc-500 ${task.completed ? "line-through" : ""}`}
            >
              {task.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
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

          <div className="flex items-center gap-2"></div>
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

      <div className="grid grid-cols-3 items-center gap-2 mt-2">
        {/* COMPLETE */}
        <Button
          className="p-2 rounded-md transition"
          variant={"outline"}
          onClick={handleCompleteUncomplete}
        >
          {task.completed ? (
            <span className="flex items-center gap-1">
              <X className="w-4 h-4" /> Uncomplete
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4" /> Complete
            </span>
          )}
        </Button>

        {/* EDIT */}
        <TaskModal
          text="Edit"
          icon={Pencil}
          variant="secondary"
          task={task}
          onCreated={onUpdate}
        />

        {/* DELETE */}
        <Button
          className="p-2 rounded-md transition"
          variant={"destructive"}
          onClick={handleDelete}
        >
          <Trash2 className="w-4 h-4" /> Delete
        </Button>
      </div>
    </div>
  );
}
