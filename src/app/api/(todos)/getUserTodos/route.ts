export const runtime = "edge";

import { db } from "@/db";
import { todos } from "@/db/schema/Todo";
import { auth } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json(
      { error: "Not Logged In" },
      { status: StatusCodes.FORBIDDEN, statusText: ReasonPhrases.FORBIDDEN }
    );
  }

  const userTodos = await db
    .select({
      id: todos.nanoid,
      title: todos.title,
      completed: todos.completed,
      categoryId: todos.categoryId,
      description: todos.description,
      createdAt: todos.createdAt,
    })
    .from(todos)
    .where(eq(todos.userId, userId))
    .orderBy(todos.completed, desc(todos.createdAt));

  return NextResponse.json(
    { data: userTodos },
    { status: StatusCodes.OK, statusText: ReasonPhrases.OK }
  );
}

export type UserTodos = {
  data: {
    id: string;
    title: string;
    completed: boolean;
    categoryId: string;
    description: string;
    createdAt: string;
  }[];
};
