import type { Supporter } from "../env";

export const personInitiators = [
  "Lucia Pašková",
  "Zuzana Suchová",
  "Michaela Benedigová",
  "Juraj Bartoš",
  "Alžbeta Brozmanová Gregorová",
  "Dominika Hradiská",
  "Milan Šemelák",
  "Tomáš Kriššák",
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
];

export const supporters: Supporter[] = [
  {
    name: "Organizácia",
    amount: "100 000,00 €",
    note: "finančná pomoc",
  },
  {
    name: "Organizácia",
    amount: "100 000,00 €",
    note: "finančná pomoc",
  },
  {
    name: "Organizácia",
    amount: "100 000,00 €",
    note: "finančná pomoc",
  },
  {
    name: "Organizácia",
    amount: "100 000,00 €",
    note: "finančná pomoc",
  },
  {
    name: "Organizácia",
    amount: "100 000,00 €",
    note: "finančná pomoc",
  },
  {
    name: "Organizácia",
    amount: "100 000,00 €",
    note: "finančná pomoc",
  },
  {
    name: "Organizácia",
    amount: "100 000,00 €",
    note: "finančná pomoc",
  },
  {
    name: "Organizácia",
    amount: "100 000,00 €",
    note: "finančná pomoc",
  },
];

export const donationUrl = "https://www.donio.sk/prispevok/2479";

export const donationAmounts = [10, 25, 50];

export const donationUrlWithAmount = (amount: number | "") =>
  `https://www.donio.sk/prispevok/2479?amount=${amount}`;