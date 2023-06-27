import type { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const data = await fetch("https://www.donio.sk/widget/2479.json").then(
    (response) => response.json()
  );

  response.json(data);
}
