import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const tasks = await prisma.task.findMany();

    if (!tasks) {
      return NextResponse.json({ message: "No tasks found" });
    }

    return NextResponse.json({ message: "OK", tasks }, { status: 200 });
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

export async function POST(req: NextRequest) {
  try {
    const { title, status } = await req.json();

    if (!title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 },
      );
    }

    if (typeof status !== "boolean") {
      return NextResponse.json(
        { message: "Status is required" },
        { status: 400 },
      );
    }

    await prisma.task.create({
      data: {
        title,
        status,
      },
    });

    return NextResponse.json({ message: "OK" }, { status: 201 });
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
