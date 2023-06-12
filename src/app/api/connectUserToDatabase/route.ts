export const runtime = "edge";

import { db } from "@/db";
import { users } from "@/db/schema/User";
import { auth, currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const user = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.id, userId));

  if (user.length > 0) {
    return;
  }

  const userToCreate = await currentUser();
  if (userToCreate?.emailAddresses[0].emailAddress) {
    await db.insert(users).values({
      id: userId,
      name: `${userToCreate?.firstName} ${userToCreate?.lastName}`,
      email: userToCreate?.emailAddresses[0].emailAddress,
    });
  }
  return redirect("/");
}
