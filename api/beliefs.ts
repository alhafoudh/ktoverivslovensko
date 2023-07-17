import type { VercelRequest, VercelResponse } from "@vercel/node";
import { kv } from "@vercel/kv";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const beliefs = (await kv.get("beliefs:data")) as Record<string, string>[];
  response.json(beliefs || []);
}
