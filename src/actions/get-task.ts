"use server";

import prisma from "@/lib/db";

export async function getTaskAction() {
  const allTasks = await prisma.task.findMany();

  if (allTasks.length === 0) {
    return [];
  }

  const orderedTasks = allTasks.sort((a, b) => {
    if (a.status === b.status) {
      return a.id - b.id;
    }

    return a.status ? 1 : -1;
  });

  return orderedTasks;
}
