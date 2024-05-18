import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = Number(params.id);

    const { title } = await req.json();

    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });

    return NextResponse.json({ message: "OK" });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = Number(params.id);

    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    await prisma.task.update({
      where: {
        id,
      },
      data: {
        status: !task.status,
      },
    });

    return NextResponse.json({ message: "OK" });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = Number(params.id);

    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    await prisma.task.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "OK" });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
