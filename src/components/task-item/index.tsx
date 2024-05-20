import { cn } from "@/lib/utils";
import { Task } from "@prisma/client";
import { TaskStatusContent } from "../task-status-content";
import { EditTaskForm } from "../edit-task-form";
import { DeleteTaskButton } from "../delete-task-button";

type TaskItemProps = Pick<Task, "title" | "id" | "status">;

export function TaskItem({ title, id, status }: TaskItemProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-4 rounded-lg px-4 py-2 transition-all duration-300 hover:bg-muted",
        status && "opacity-75 hover:opacity-100",
      )}
    >
      <TaskStatusContent id={id} title={title} status={status} />

      <div className="flex items-center gap-3">
        {!status && <EditTaskForm id={id} title={title} />}
        <DeleteTaskButton id={id} />
      </div>
    </div>
  );
}
