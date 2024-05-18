import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";

interface IAlertConfirmDeleteTaskProps {
  taskId: string;
  handleDeleteTask: (id: string) => void;
  isLoadingDeleteTask: boolean;
  deletingTaskId: string | null;
}

export function AlertConfirmDeleteTask({
  taskId,
  handleDeleteTask,
  isLoadingDeleteTask,
  deletingTaskId,
}: IAlertConfirmDeleteTaskProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          {isLoadingDeleteTask && deletingTaskId === taskId ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Trash2 className="h-7 w-7" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja remover a tarefa?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente sua
            tarefa.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteTask(taskId)}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
