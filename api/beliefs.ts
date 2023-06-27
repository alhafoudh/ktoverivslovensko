import type { VercelRequest, VercelResponse } from "@vercel/node";
import { kv } from "@vercel/kv";
import fetch, { Response } from "node-fetch";
import type { Belief } from "../src/env";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const beliefs = (await kv.get("beliefs:data")) as Belief[];
  console.log(beliefs);
  response.json(beliefs || []);
}
