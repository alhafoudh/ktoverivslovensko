import type { VercelRequest, VercelResponse } from "@vercel/node";
import { kv } from "@vercel/kv";
import process from "process";
import fetch from "node-fetch";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const activities = (await kv.get("activities:data")) as Record<string, string>[];
  response.json(activities || []);
}
