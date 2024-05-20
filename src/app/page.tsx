import { getTaskAction } from "@/actions/get-task";
import { TaskItem } from "@/components/task-item";
import { Notebook } from "lucide-react";

export default async function Home() {
  const tasks = await getTaskAction();

  return tasks.length === 0 ? (
    <div className="flex flex-col items-center justify-center gap-6 rounded-lg bg-muted/50 p-8">
      <Notebook className="h-8 w-8 text-muted-foreground" />
      <div className="flex flex-col items-center">
        <h2 className="text-balance text-lg font-semibold text-muted-foreground">
          Nenhuma tarefa encontrada
        </h2>
        <span className="w-3/4 text-center text-sm text-muted-foreground">
          Comece a se organizar adicionando uma nova tarefa.
        </span>
      </div>
    </div>
  ) : (
    tasks.map((task) => <TaskItem key={task.id} {...task} />)
  );
}
