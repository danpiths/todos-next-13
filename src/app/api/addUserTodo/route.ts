export const runtime = "edge";

import { TodoFormBody } from "@/components/forms/TodoForm";
import { db } from "@/db";
import { categories } from "@/db/schema/Category";
import { todos } from "@/db/schema/Todo";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid";
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

  const { completed, title, description, category }: TodoFormBody =
    await request.json();

  let categoryId: number | null = null;

  if (category) {
    const res = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.nanoid, category));
    categoryId = res[0].id;
  }

  await db.insert(todos).values({
    nanoid: nanoid(),
    title,
    description: description ? description : null,
    completed,
    userId,
    categoryId,
  });

  revalidateTag("user-todos");

  return NextResponse.json(
    { data: "Todo Added" },
    { status: StatusCodes.CREATED, statusText: ReasonPhrases.CREATED }
  );
}
