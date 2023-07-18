import type { VercelRequest, VercelResponse } from "@vercel/node";
import { kv } from "@vercel/kv";

export default async function handler(_: VercelRequest, response: VercelResponse) {
  const supporters = (await kv.get("supporters:data")) as Record<string, string>[];
  response.json(supporters || []);
}
