import { TaskCard } from "./task-card";
import { TaskEmpty } from "./task-empty";

type Task = {
  id: string;
  title: string;
  description?: string | null;
  dueDate: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  completed: boolean;
};

type Props = {
  tasks: Task[];
  onDelete?: (id: string) => void;
  onUpdate?: () => void;
};

export function TaskList({ tasks, onDelete, onUpdate }: Props) {
  if (tasks.length === 0) {
    return <TaskEmpty />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-14">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
