"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { Task } from "./task-card";

type Props = {
  task?: Task;
  onSuccess?: () => void;
};

export function TaskForm({ task, onSuccess }: Props) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? task.dueDate.split("T")[0] : "",
  );
  const [priority, setPriority] = useState<Task["priority"]>(
    task?.priority || "MEDIUM",
  );
  const [loading, setLoading] = useState(false);

  const isEdit = !!task;
  const endpoint = isEdit ? `/api/task/${task.id}` : "/api/task";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(endpoint, {
        method: isEdit ? "PUT" : "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title,
          description,
          dueDate,
          priority,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create task");
      }

      // reset form
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("MEDIUM");

      onSuccess?.();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* TITLE */}
      <div className="space-y-2">
        <Label>Title</Label>

        <Input
          placeholder="Finish dashboard UI..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-2">
        <Label>Description</Label>

        <Textarea
          placeholder="Optional task description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* DUE DATE */}
      <div className="space-y-2">
        <Label>Due Date</Label>

        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>

      {/* PRIORITY */}
      <div className="space-y-2">
        <Label>Priority</Label>

        <Select
          value={priority}
          onValueChange={(value) =>
            setPriority(value as "LOW" | "MEDIUM" | "HIGH")
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="LOW">Low</SelectItem>

            <SelectItem value="MEDIUM">Medium</SelectItem>

            <SelectItem value="HIGH">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* SUBMIT */}
      <Button type="submit" className="w-full">
        {loading
          ? isEdit
            ? "Updating..."
            : "Creating..."
          : isEdit
            ? "Update Task"
            : "Create Task"}
      </Button>
    </form>
  );
}
