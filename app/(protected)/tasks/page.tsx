"use client";

import { useCallback, useEffect, useState } from "react";

import { TaskList } from "@/components/task/task-list";

import { TaskModal } from "@/components/task/task-modal";
import LoadingComponent from "@/components/LoadingComponent";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [search, setSearch] = useState("");

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams();

      if (search) {
        query.set("search", search);
      }

      if (sortBy) {
        query.set("sortBy", sortBy);
      }

      if (order) {
        query.set("order", order);
      }

      const res = await fetch(`/api/task?${query.toString()}`);
      const data = await res.json();

      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [sortBy, order, search]);

  // delete task
  async function handleDeleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  useEffect(() => {
    async function loadTasks() {
      await fetchTasks();
    }

    loadTasks();
  }, [sortBy, order, search, fetchTasks]);

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

      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        {/* SEARCH FIELD */}
        <div className="flex items-center gap-3 w-full sm:min-w-md md:w-sm">
          <p className="text-sm text-zinc-500">Search</p>
          <Input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* SORT FIELD */}
        <div className="flex items-center gap-3 w-full sm:min-w-md md:w-sm justify-end">
          <p className="text-sm text-zinc-500">Sort by</p>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="priority">Priority</SelectItem>

              <SelectItem value="dueDate">Due Date</SelectItem>
            </SelectContent>
          </Select>

          {/* ORDER */}
          <Select
            value={order}
            onValueChange={(value) => setOrder(value)}
            disabled={!sortBy}
          >
            <SelectTrigger className="w-35">
              <SelectValue placeholder="Order" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>

              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* CONTENT */}
      {loading ? (
        <LoadingComponent />
      ) : (
        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onUpdate={fetchTasks}
        />
      )}
    </div>
  );
}
