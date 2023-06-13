export const runtime = "edge";

import { db } from "@/db";
import { categories } from "@/db/schema/Category";
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

  const req: { id: string } = await request.json();

  await db.delete(categories).where(eq(categories.nanoid, req.id));

  revalidateTag("user-categories");

  return NextResponse.json(
    { data: "Category Deleted" },
    { status: StatusCodes.OK, statusText: ReasonPhrases.OK }
  );
}
