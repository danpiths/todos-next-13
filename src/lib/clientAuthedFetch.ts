import { env } from "@/env.mjs";

export async function clientAuthedFetch({
  apiToCall,
  tags,
  method,
  getToken,
  body,
}: {
  apiToCall: string;
  tags?: string[];
  method: "GET" | "POST" | "PATCH" | "DELETE";
  getToken: (options?: {
    template?: string;
    leewayInSeconds?: number;
    skipCache?: boolean;
  }) => Promise<string | null>;
  body?: { [key: string]: any };
}) {
  return await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/${apiToCall}`, {
    next: { tags: tags ? (tags.length > 0 ? tags : undefined) : undefined },
    headers: { Authorization: `Bearer ${await getToken()}` },
    body: body ? JSON.stringify(body) : undefined,
    method,
  });
}
