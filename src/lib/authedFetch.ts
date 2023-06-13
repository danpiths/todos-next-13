import { env } from "@/env.mjs";
import { auth } from "@clerk/nextjs";

export async function authedFetch({
  apiToCall,
  tags,
  method,
  body,
}: {
  apiToCall: string;
  tags?: string[];
  method: "GET" | "POST" | "PATCH" | "DELETE";
  body?: { [key: string]: any };
}) {
  const { getToken } = auth();

  return await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/${apiToCall}`, {
    next: { tags: tags ? (tags.length > 0 ? tags : undefined) : undefined },
    headers: { Authorization: `Bearer ${await getToken()}` },
    body: body ? JSON.stringify(body) : undefined,
    method,
  });
}
