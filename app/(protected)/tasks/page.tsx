"use client";

import { useEffect, useState } from "react";

import { TaskList } from "@/components/task/task-list";

import { TaskModal } from "@/components/task/task-modal";
import LoadingComponent from "@/components/LoadingComponent";
import { Plus } from "lucide-react";

type Task = {
  id: string;
  title: string;
  description?: string | null;
  dueDate: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  completed: boolean;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchTasks() {
    try {
      const res = await fetch("/api/task");

      const data = await res.json();

      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // delete task
  async function handleDeleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  useEffect(() => {
    async function loadTasks() {
      await fetchTasks();
    }

    loadTasks();
  }, []);

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>

          <p className="mt-2 text-zinc-500">
            Manage your daily tasks efficiently.
          </p>
        </div>

        <TaskModal text="Create Task" onCreated={fetchTasks} icon={Plus} />
      </div>

      {/* CONTENT */}
      {loading ? (
        <LoadingComponent />
      ) : (
        <TaskList tasks={tasks} onDelete={handleDeleteTask} />
      )}
    </div>
  );
}
