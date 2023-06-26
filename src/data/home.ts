import type { Supporter } from "../env";

export const personInitiators = [
  "Lucia Pašková",
  "Zuzana Suchová",
  "Michaela Benedigova",
  "Juraj Bartoš",
  "Alžbeta Brozmanova",
  "Dominika Hradiská",
  "Romana Umrianová",
  "Milan Šemelák",
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
  "My sme les",
  "Growni",
  "Nexteria",
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

export const donationUrlWithAmount = (amount: number) =>
  `https://www.donio.sk/prispevok/2479?amount=${amount}`;

export const beliefModalFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSeyO4pwS0698OYq5DiOdEI7xhSHsIMlxl0R1hYMP48efYqNvA/viewform";
