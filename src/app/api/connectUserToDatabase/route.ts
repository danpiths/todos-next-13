export const runtime = "edge";

import { db } from "@/db";
import { users } from "@/db/schema/User";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const user = await currentUser();
  if (user?.emailAddresses[0].emailAddress) {
    await db.insert(users).values({
      id: userId,
      name: `${user?.firstName} ${user?.lastName}`,
      email: user?.emailAddresses[0].emailAddress,
    });
  }
  return redirect("/");
}
