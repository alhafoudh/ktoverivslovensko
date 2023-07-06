import type { VercelRequest, VercelResponse } from "@vercel/node";
import { kv } from "@vercel/kv";
import fetch from "node-fetch";
import * as process from "process";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const beliefsUrl = `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}/entries/?content_type=beliefs&order=sys.createdAt&access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}`;

  const data = await fetch(
    beliefsUrl
  ).then((response) => response.json());

  console.log(data);
  const beliefs: Record<string, string>[] = data.items.map((item: any) => {
    let image = "";

    console.log(item);
    const avatarAssetId = item.fields.avatar?.sys?.id;
    const avatarAsset = data.includes.Asset.find(
      (asset: any) => avatarAssetId && asset.sys.id === avatarAssetId
    );
    if (avatarAsset) {
      image = `${avatarAsset.fields.file.url}?w=512&h=512&fit=fill`;
    }
    return {
      id: item.sys.id,
      name: item.fields.name,
      organization: item.fields.organization,
      text: item.fields.text,
      image
    };
  });

  console.log(beliefs);

  await kv.set("beliefs:data", JSON.stringify(beliefs));
  await kv.set("beliefs:updated_at", new Date().toISOString());

  response.json({ status: "ok" });
}
