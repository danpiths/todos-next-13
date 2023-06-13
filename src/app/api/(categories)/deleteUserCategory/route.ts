export const runtime = "edge";

import { DeleteCategoryBody } from "@/components/forms/TodoForm";
import { db } from "@/db";
import { categories } from "@/db/schema/Category";
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

  const req: DeleteCategoryBody = await request.json();

  await db.delete(todos).where(eq(todos.categoryId, req.id));
  await db.delete(categories).where(eq(categories.nanoid, req.id));

  revalidateTag("user-categories");
  revalidateTag("user-todos");

  return NextResponse.json(
    { data: "Category Deleted" },
    { status: StatusCodes.OK, statusText: ReasonPhrases.OK }
  );
}
