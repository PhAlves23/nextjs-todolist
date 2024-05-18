"use client";

import { AlertConfirmDeleteTask } from "@/components/alert-confirm-delete-task";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { TaskType } from "@/types/task";
import { Check, Edit, Loader2, Plus, X } from "lucide-react";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Task() {
  const [isLoadingAddTask, setIsLoadingAddTask] = useState<boolean>(false);
  const [isLoadingDeleteTask, setIsLoadingDeleteTask] =
    useState<boolean>(false);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [title, setTitle] = useState<string>("");

  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState<string>("");

  const getTasks = useCallback(async () => {
    const response = await fetch("http://localhost:3000/api/task", {
      method: "GET",
    });
    const data = await response.json();
    setTasks(data.tasks);
  }, []);

  async function handleDeleteTask(id: string) {
    try {
      setIsLoadingDeleteTask(true);
      setDeletingTaskId(id);
      const response = await fetch(`http://localhost:3000/api/task/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.message === "OK") {
        toast.success("Tarefa deletada com sucesso!");
        getTasks();
      }
    } catch (err) {
      console.error("error - deletar tarefa ->", err);
      toast.error("Erro ao deletar tarefa!");
    } finally {
      setIsLoadingDeleteTask(false);
      setDeletingTaskId(null);
    }
  }

  async function handleCreateTask(e: FormEvent) {
    try {
      e.preventDefault();
      setIsLoadingAddTask(true);

      const response = await fetch(`http://localhost:3000/api/task`, {
        method: "POST",
        body: JSON.stringify({
          title: title,
          status: false,
        }),
      });

      const data = await response.json();

      if (data.message === "OK") {
        toast.success("Tarefa criada com sucesso!");
        setTitle("");
        getTasks();
      }
    } catch (err) {
      console.error("error - criar tarefa ->", err);
      toast.error("Erro ao criar tarefa!");
    } finally {
      setIsLoadingAddTask(false);
    }
  }

  async function handleUpdateTask(id: string, status: boolean) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.status = !status;
      }
      return task;
    });

    setTasks(updatedTasks);

    const response = await fetch(`http://localhost:3000/api/task/${id}`, {
      method: "PATCH",
    });

    const data = await response.json();

    if (data.message === "OK") {
      toast.success("Tarefa atualizada com sucesso!");
    }
  }

  async function handleUpdateTaskTitle(id: string) {
    try {
      const response = await fetch(`http://localhost:3000/api/task/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: editingTaskTitle,
        }),
      });

      const data = await response.json();

      if (data.message === "OK") {
        toast.success("Título da tarefa atualizado com sucesso!");
        getTasks();
        setEditingTask(null);
        setEditingTaskTitle("");
      }
    } catch (err) {
      console.error("error - atualizar título da tarefa ->", err);
      toast.error("Erro ao atualizar título da tarefa!");
    }
  }

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  console.log("tasks", tasks);

  return (
    <div className="h-screen w-full py-20">
      <div className="mx-auto my-0 flex h-full w-full max-w-3xl flex-col items-center pb-10 pt-20">
        <h1 className="mb-10 text-center text-2xl font-semibold">Tarefas</h1>

        <form action="POST" className="mb-20">
          <div className="flex w-full items-center justify-center gap-3">
            <div className="w-full">
              <Input
                type="text"
                id="title"
                name="title"
                className="w-full lg:w-96"
                placeholder="Digite o nome da tarefa..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="flex items-center gap-1"
              onClick={(e) => handleCreateTask(e)}
            >
              {isLoadingAddTask ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Plus />
              )}
            </Button>
          </div>
        </form>

        <ul className="h-full w-full space-y-2 overflow-y-auto rounded-md p-3">
          {tasks?.map((task) => {
            return (
              <li
                key={task.id}
                className="flex items-center justify-between rounded-md border px-4 py-3"
              >
                <div className="flex items-center gap-5">
                  <Checkbox
                    checked={task.status}
                    onCheckedChange={() =>
                      handleUpdateTask(task.id, task.status)
                    }
                    className="h-5 w-5"
                  />
                  {editingTask === task.id ? (
                    <div className="flex w-full items-center gap-2">
                      <Input
                        type="text"
                        value={editingTaskTitle}
                        onChange={(e) => setEditingTaskTitle(e.target.value)}
                      />
                      <div className="flex items-center gap-1">
                        <Button
                          variant="destructive"
                          size="icon"
                          className="min-w-10"
                          onClick={() => setEditingTask(null)}
                        >
                          <X className="h-7 w-7" />
                        </Button>
                        <Button
                          variant="success"
                          size="icon"
                          className="min-w-10"
                          onClick={() => handleUpdateTaskTitle(task.id)}
                        >
                          <Check className="h-7 w-7" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <h3
                      className={`font-medium ${
                        task.status ? "text-gray-500 line-through" : ""
                      }`}
                    >
                      {task.title}
                    </h3>
                  )}
                </div>
                <div className="flex items-center justify-center gap-5">
                  <Button
                    variant="warning"
                    size="icon"
                    onClick={() => {
                      setEditingTask(task.id);
                      setEditingTaskTitle(task.title);
                    }}
                  >
                    <Edit className="h-7 w-7" />
                  </Button>

                  <AlertConfirmDeleteTask
                    taskId={task.id}
                    handleDeleteTask={handleDeleteTask}
                    isLoadingDeleteTask={isLoadingDeleteTask}
                    deletingTaskId={deletingTaskId}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
