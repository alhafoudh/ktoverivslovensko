import type { VercelRequest, VercelResponse } from "@vercel/node";
import { kv } from "@vercel/kv";
import fetch from "node-fetch";
import * as process from "process";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {

  // Beliefs
  const beliefsUrl = `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}/entries/?content_type=beliefs&order=sys.createdAt&access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}`;

  const beliefsRawData = await fetch(
    beliefsUrl
  ).then((response) => response.json());

  console.log(beliefsRawData);
  const beliefs: Record<string, string>[] = beliefsRawData.items.map((item: any) => {
    let image = "";

    console.log(item);
    const avatarAssetId = item.fields.avatar?.sys?.id;
    const avatarAsset = beliefsRawData.includes.Asset.find(
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

  // Activities

  const activitiesUrl = `https://dobrovolnictvo.onsinch.com/broadcast/v1/fetch`;

  const activitiesRawData = await fetch(
    activitiesUrl
  ).then((response) => response.json());

  const activities = activitiesRawData.map((activity: any) => {
    const beginning = new Date(activity.beginning.replace(' ', 'T') + "Z");
    const ending = new Date(activity.end.replace(' ', 'T') + "Z");

    return {
      id: activity.slotId,
      image: null,
      title: activity.job,
      utc_from: beginning.toISOString(),
      date_from: beginning.toLocaleDateString('sk'),
      time_from: beginning.toLocaleTimeString('sk'),
      utc_to: ending.toISOString(),
      date_to: ending.toLocaleDateString('sk'),
      time_to: ending.toLocaleTimeString('sk'),
      location: `${activity.location_name}, ${activity.location_note}`,
      city: activity.location_city,
      position: null,
      description: activity.description,
      url: activity.link,
      modifiedAt: activity.modified
    };
  });

  await kv.set("activities:data", JSON.stringify(activities));
  await kv.set("activities:updated_at", new Date().toISOString());

  response.json({ status: "ok" });
}
