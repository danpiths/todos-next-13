export const runtime = "edge";

import { ChangeCompletedBody } from "@/components/Todos/TodoCompledtedSwitch";
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

  const req: ChangeCompletedBody = await request.json();

  await db
    .update(todos)
    .set({ completed: req.completed })
    .where(eq(todos.nanoid, req.id));

  revalidateTag("user-todos");

  return NextResponse.json(
    { data: "Todo Status Changed" },
    { status: StatusCodes.OK, statusText: ReasonPhrases.OK }
  );
}
