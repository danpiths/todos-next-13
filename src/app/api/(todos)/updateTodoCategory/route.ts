export const runtime = "edge";

import { CategoryUpdateBody } from "@/components/Todos/TodoCombobox";
import { db } from "@/db";
import { todos } from "@/db/schema/Todo";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json(
      { error: "Not Logged In" },
      { status: StatusCodes.FORBIDDEN, statusText: ReasonPhrases.FORBIDDEN }
    );
  }

  const req: CategoryUpdateBody = await request.json();

  await db
    .update(todos)
    .set({ categoryId: req.categoryId })
    .where(eq(todos.nanoid, req.todoId));

  revalidateTag("user-todos");

  return NextResponse.json(
    { data: "Todo Category Updated" },
    { status: StatusCodes.OK, statusText: ReasonPhrases.OK }
  );
}
