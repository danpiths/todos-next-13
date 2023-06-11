export const runtime = "edge";

import { db } from "@/db";
import { categories } from "@/db/schema/Category";
import { auth } from "@clerk/nextjs";
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

  const res: { name: string } = await request.json();

  await db
    .insert(categories)
    .values({ name: res.name, userId, nanoid: nanoid() });

  revalidateTag("user-categories");

  return NextResponse.json(
    { data: "Category Added" },
    { status: StatusCodes.CREATED, statusText: ReasonPhrases.CREATED }
  );
}
