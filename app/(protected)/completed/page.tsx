"use client";

import { useCallback, useEffect, useState } from "react";

import LoadingComponent from "@/components/LoadingComponent";
import { TaskCard } from "@/components/task/task-card";

type Task = {
  id: string;
  title: string;
  description?: string | null;
  dueDate: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  completed: boolean;
};

export default function CompletedPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCompletedTasks = useCallback(async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams({
        completed: "true",
      });

      const res = await fetch(`/api/task?${query.toString()}`);

      const data = await res.json();

      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // delete task
  async function handleDeleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  useEffect(() => {
    async function loadTasks() {
      await fetchCompletedTasks();
    }

    loadTasks();
  }, [fetchCompletedTasks]);

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Completed Tasks</h1>

        <p className="mt-2 text-zinc-500">All tasks you have completed.</p>
      </div>

      {/* CONTENT */}
      {loading ? (
        <LoadingComponent />
      ) : tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onUpdate={fetchCompletedTasks}
              hideLineThrough
              showPriority
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed p-8 text-center text-zinc-500">
          No completed tasks yet.
        </div>
      )}
    </div>
  );
}
