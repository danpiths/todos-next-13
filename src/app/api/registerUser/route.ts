export const runtime = "edge";

import { db } from "@/db";
import { users } from "@/db/schema/User";
import { WebhookEvent } from "@clerk/nextjs/dist/types/server";

export async function POST(request: Request) {
  const { evt } = (await request.json()) as { evt: WebhookEvent };

  if (evt.type === "user.created") {
    await db.insert(users).values({
      id: evt.data.id,
      name: `${evt.data.first_name} ${evt.data.last_name}`,
      email: evt.data.email_addresses[0].email_address,
    });
  }
}
