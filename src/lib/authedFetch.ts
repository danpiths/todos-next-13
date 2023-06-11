import { env } from "@/env.mjs";
import { auth } from "@clerk/nextjs";

export async function authedFetch({
  apiToCall,
  tags,
  method,
}: {
  apiToCall: string;
  tags?: string[];
  method: "GET" | "POST" | "PATCH" | "DELETE";
}) {
  const { getToken } = auth();

  return await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/${apiToCall}`, {
    next: { tags },
    headers: { Authorization: `Bearer ${await getToken()}` },
    method,
  });
}
