"use client";

import { useState } from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TaskForm } from "./task-form";

type Props = {
  task?: Task;
  icon: LucideIcon;
  text: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link";
  onCreated?: () => void;
};

type Task = {
  id: string;
  title: string;
  description?: string | null;
  dueDate: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  completed: boolean;
};

export function TaskModal({
  task,
  icon: Icon,
  text,
  variant = "default",
  onCreated,
}: Props) {
  const [open, setOpen] = useState(false);

  function handleClick() {
    console.log("TaskModal clicked with task:", task); // Debug log
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} onClick={handleClick}>
          <Icon size={16} />

          <span>{text}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {text === "Create Task" ? "Create New Task" : "Edit Task"}
          </DialogTitle>

          <DialogDescription>
            {text === "Create Task"
              ? "Fill in the task details below."
              : "Update your task information."}
          </DialogDescription>
        </DialogHeader>

        <TaskForm
          task={task}
          onSuccess={() => {
            setOpen(false);

            onCreated?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
