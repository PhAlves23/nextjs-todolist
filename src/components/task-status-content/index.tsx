"use client";

import { updateTaskStatusAction } from "@/actions/update-task-status";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Task } from "@prisma/client";
import { useTransition } from "react";
import { toast } from "sonner";

type TaskStatusCheckboxProps = Pick<Task, "id" | "title" | "status">;

export function TaskStatusContent({
  id,
  title,
  status,
}: TaskStatusCheckboxProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      try {
        await updateTaskStatusAction(id, status);
        toast.success("Tarefa atualizada com sucesso");
      } catch (error) {
        toast.error("Erro ao atualizar tarefa");
      }
    });
  };

  return (
    <div className="flex items-center gap-2" onClick={handleClick}>
      <Checkbox key={id} className="h-5 w-5" checked={status} />

      <span
        className={cn(
          "cursor-pointer text-lg text-accent-foreground",
          status && "text-muted-foreground line-through",
        )}
      >
        {title}
      </span>
    </div>
  );
}
