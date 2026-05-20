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
};

export function TaskList({ tasks }: Props) {
  if (tasks.length === 0) {
    return <TaskEmpty />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
