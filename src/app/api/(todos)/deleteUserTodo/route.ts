export const runtime = "edge";

import { DeleteTodoBody } from "@/components/Todos/TodoX";
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

  const req: DeleteTodoBody = await request.json();

  await db.delete(todos).where(eq(todos.nanoid, req.id));

  revalidateTag("user-todos");

  return NextResponse.json(
    { data: "Todo Deleted" },
    { status: StatusCodes.OK, statusText: ReasonPhrases.OK }
  );
}
