export const runtime = "edge";

import { CategoryFormBody } from "@/components/forms/CategoryForm";
import { db } from "@/db";
import { categories } from "@/db/schema/Category";
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

  const req: CategoryFormBody = await request.json();

  const userCategories = await db
    .select({ name: categories.name })
    .from(categories)
    .where(eq(categories.userId, userId));

  if (
    userCategories.find(
      (category) => category.name.toLowerCase() === req.name.toLowerCase()
    )
  ) {
    return NextResponse.json(
      { error: "Category Already Exists" },
      { status: StatusCodes.CONFLICT, statusText: ReasonPhrases.CONFLICT }
    );
  }

  await db
    .insert(categories)
    .values({ name: req.name, userId, nanoid: nanoid() });

  revalidateTag("user-categories");

  return NextResponse.json(
    { data: "Category Added" },
    { status: StatusCodes.CREATED, statusText: ReasonPhrases.CREATED }
  );
}
