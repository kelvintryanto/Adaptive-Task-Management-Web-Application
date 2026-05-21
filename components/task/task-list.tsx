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

  const today = new Date().toLocaleDateString("en-CA"); // format: YYYY-MM-DD
  console.log("today", today);
  console.log(
    "tasks due date",
    tasks.map((task) => task.dueDate),
  );
  const todayTodoTasks = tasks.filter(
    (task) =>
      !task.completed &&
      new Date(task.dueDate).toLocaleDateString("en-CA") <= today,
  );
  const todoTasks = tasks.filter(
    (task) =>
      !task.completed &&
      new Date(task.dueDate).toLocaleDateString("en-CA") > today,
  );
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="space-y-3 pb-14 md:pb-0">
      {/* RESPONSIVE LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className="md:col-span-1 lg:col-span-2 xl:col-span-3 space-y-4">
          {/* TODAY TODO TASKS */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              Today Alert ({todayTodoTasks.length})
            </h2>

            <div className="grid space-y-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {todayTodoTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              ))}
            </div>
          </div>

          {/* TODO TASKS */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              To-do Tasks ({todoTasks.length})
            </h2>

            <div className="grid space-y-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {todoTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              ))}
            </div>
          </div>
        </div>

        {/* COMPLETED */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">
            Completed ({completedTasks.length})
          </h2>

          <div className="space-y-4">
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              ))
            ) : (
              <div className="rounded-xl border border-dashed p-6 text-center text-sm text-zinc-500">
                No completed tasks yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
