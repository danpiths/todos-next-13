export const runtime = "edge";

import { db } from "@/db";
import { categories } from "@/db/schema/Category";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json(
      { error: "Not Logged In" },
      { status: StatusCodes.FORBIDDEN, statusText: ReasonPhrases.FORBIDDEN }
    );
  }

  const userCategories = await db
    .select({ id: categories.id, name: categories.name })
    .from(categories)
    .where(eq(categories.userId, userId));

  return NextResponse.json(
    { data: userCategories },
    { status: StatusCodes.OK, statusText: ReasonPhrases.OK }
  );
}

export type UserCategories = {
  data: {
    id: number;
    name: string;
  }[];
};
