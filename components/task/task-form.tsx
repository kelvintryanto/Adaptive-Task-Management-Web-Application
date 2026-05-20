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

type Props = {
  onSuccess?: () => void;
};

export function TaskForm({ onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/tasks", {
        method: "POST",

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
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating..." : "Create Task"}
      </Button>
    </form>
  );
}
