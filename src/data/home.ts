import type { Activity, Belief, Supporter } from "src/env";

const { CONTENTFUL_SPACE_ID, CONTENTFUL_ENVIRONMENT, CONTENTFUL_ACCESS_TOKEN } = import.meta.env;

const getContentfulUrl = (contentType: string) =>
  `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries/?content_type=${contentType}&order=sys.createdAt&access_token=${CONTENTFUL_ACCESS_TOKEN}`;

export const personInitiators = [
  "Lucia Pašková",
  "Zuzana Suchová",
  "Michaela Benedigová",
  "Juraj Bartoš",
  "Alžbeta Brozmanová Gregorová",
  "Dominika Hradiská",
  "Milan Šemelák",
  "Tomáš Kriššák",
  "Kristína Felová",
  "Romana Umrianová",
  "Jana Mračnová",
  "Jakub Ptačin",
  "Milan Marcinčo",
  "Ahmed Al Hafoudh",
];

export const companyInitiators = [
  "Curaprox",
  "Donio",
  "Seesame",
  "Free Andy",
  "Platforma dobrovoľníckych centier a organizácií",
  "Kto pomôže Slovensku",
  "Kto pomôže Ukrajine",
  "Ide nám o život",
  "Growni",
  "Nexteria",
  "ADMA",
  "Chcem tu zostať",
  "Sebavedomé Slovensko",
  "Dásato – I AMbitious",
  "Studio Echt",
  "freevision",
  "Veselé paradajky",
  "Bystriny",
];

export const beliefFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSeyO4pwS0698OYq5DiOdEI7xhSHsIMlxl0R1hYMP48efYqNvA/viewform";

export const donationUrl = "https://www.donio.sk/prispevok/2479";

export const donationAmounts = [10, 25, 50];

export const donationUrlWithAmount = (amount: number | "") => `https://www.donio.sk/prispevok/2479?amount=${amount}`;

export const currentDonationAmount = await fetch("https://www.donio.sk/widget/2479.json")
  .then(response => response.json())
  .then(data => data.currentAmount as number);

export const beliefs = await (async () => {
  const beliefsUrl = getContentfulUrl("beliefs");

  const beliefsRawData = await fetch(beliefsUrl).then(response => response.json());

  const beliefs: Belief[] = beliefsRawData.items.map((item: any) => {
    let image = "";

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
      image,
    };
  });

  return beliefs;
})();

export const supporters = await (async () => {
  const supportersUrl = getContentfulUrl("supporters");

  const supportersRawData = await fetch(supportersUrl).then(response => response.json());

  const supporters: Supporter[] = supportersRawData.items.map((item: any) => ({
    id: item.sys.id,
    name: item.fields.name,
    amount: item.fields.amount,
    note: item.fields.note,
  }));

  return supporters;
})();

export const activities = await (async () => {
  const formatTime = (time: string) => {
    const [h, m, _] = time.split(":");
    return `${h}:${m}`;
  };

  const activitiesUrl = `https://dobrovolnictvo.onsinch.com/broadcast/v1/fetch`;

  const activitiesRawData = await fetch(activitiesUrl).then(response => response.json());

  const activities: Activity[] = activitiesRawData.map((activity: any) => {
    const beginning = new Date(activity.beginning.replace(" ", "T") + "Z");
    const ending = new Date(activity.end.replace(" ", "T") + "Z");

    const timeZone = "Europe/Bratislava";

    return {
      id: activity.slotId,
      image: null,
      title: activity.job,
      utc_from: beginning.toISOString(),
      date_from_iso: beginning.toISOString().split('T')[0],
      date_from: beginning.toLocaleDateString("sk"),
      time_from: formatTime(beginning.toLocaleTimeString("sk", { timeZone })),
      utc_to: ending.toISOString(),
      date_to: ending.toLocaleDateString("sk"),
      time_to: formatTime(ending.toLocaleTimeString("sk", { timeZone })),
      location: `${activity.location_name}${activity.location_note !== '' ? ', ' + activity.location_note : ''}`,
      city: activity.location_city,
      position: null,
      description: activity.description,
      size: Number.parseInt(activity.size),
      attendance_count: activity.attendanceCount,
      url: activity.link,
      modifiedAt: activity.modified,
    };
  });

  return activities;
})();
