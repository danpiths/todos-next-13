import { db } from "@/db";
import { users } from "@/db/schema/User";
import { env } from "@/env.mjs";
import { WebhookEvent } from "@clerk/nextjs/dist/types/server";
import { StatusCodes } from "http-status-codes";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import { Webhook } from "svix";

export const config = {
  api: {
    bodyParser: false,
  },
};

const secret = env.CLERK_WEBHOOK_USER_CREATED_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const payload = (await buffer(req)).toString();
    const headers = req.headers as Record<string, string>;
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
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Unauthorized, could not verify token" });
    }
  } else {
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .json({ error: "Method not allowed" });
  }
}
