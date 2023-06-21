export const runtime = "edge";

import { db } from "@/db";
import { users } from "@/db/schema/User";
import { env } from "@/env.mjs";
import { WebhookEvent } from "@clerk/nextjs/dist/types/server";
import { IncomingMessage } from "http";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { buffer } from "micro";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

const secret = env.CLERK_WEBHOOK_USER_CREATED_SECRET;

export async function POST(request: IncomingMessage) {
  const payload = (await buffer(request)).toString();
  const headers = request.headers as Record<string, string>;

  const wh = new Webhook(secret);

  let evt;

  try {
    evt = wh.verify(payload, headers) as WebhookEvent;
    if (evt.type === "user.created") {
      await db.insert(users).values({
        id: evt.data.id,
        name: `${evt.data.first_name} ${evt.data.last_name}`,
        email: evt.data.email_addresses[0].email_address,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Unauthorized, could not verify token" },
      {
        status: StatusCodes.UNAUTHORIZED,
        statusText: ReasonPhrases.UNAUTHORIZED,
      }
    );
  }
}
