import type { VercelRequest, VercelResponse } from "@vercel/node";
import fetch, { Response } from "node-fetch";
import type { Belief } from "../src/env";

const parseCsv = (str: string): Record<string, string>[] => {
  const arr: string[][] = [];
  let quote = false; // true means we're inside a quoted field
  let col, c;

  // iterate over each character, keep track of current row and column (of the returned array)
  for (let row = (col = c = 0); c < str.length; c++) {
    let cc = str[c],
      nc = str[c + 1]; // current character, next character
    arr[row] = arr[row] || []; // create a new row if necessary
    arr[row][col] = arr[row][col] || ""; // create a new column (start with empty string) if necessary

    // If the current character is a quotation mark, and we're inside a
    // quoted field, and the next character is also a quotation mark,
    // add a quotation mark to the current column and skip the next character
    if (cc == '"' && quote && nc == '"') {
      arr[row][col] += cc;
      ++c;
      continue;
    }

    // If it's just one quotation mark, begin/end quoted field
    if (cc == '"') {
      quote = !quote;
      continue;
    }

    // If it's a comma and we're not in a quoted field, move on to the next column
    if (cc == "," && !quote) {
      ++col;
      continue;
    }

    // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
    // and move on to the next row and move to column 0 of that new row
    if (cc == "\r" && nc == "\n" && !quote) {
      ++row;
      col = 0;
      ++c;
      continue;
    }

    // If it's a newline (LF or CR) and we're not in a quoted field,
    // move on to the next row and move to column 0 of that new row
    if (cc == "\n" && !quote) {
      ++row;
      col = 0;
      continue;
    }
    if (cc == "\r" && !quote) {
      ++row;
      col = 0;
      continue;
    }

    // Otherwise, append the current character to the current column
    arr[row][col] += cc;
  }

  let header = arr[0];
  let rest = arr.slice(1);

  return rest.map((r) => {
    return r.reduce((acc, v, i) => {
      const key = header[i];
      acc[key] = v;
      return acc;
    }, {} as Record<string, string>);
  });
};

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const data = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRWh3_i8t2YWS2tXJU7dUIGv15Yb0hk55sgJV1kG7gQmN2j15_Tf7RBUJpPRBevBSfaINJ-gqwwOWea/pub?gid=1697726807&single=true&output=csv"
  ).then((response) => response.text());

  const parsedData = parseCsv(data).filter((row) => row["Zverejniť"] === "áno");

  const beliefs: Belief[] = parsedData.map((row) => ({
    id: row["Timestamp"],
    name: row["Meno a priezvisko ALEBO názov firmy či organizácie"],
    text: row["V čo alebo komu na Slovensku veríte?"],
    city: row["Mesto odkiaľ ste"],
    image: row["Nahrajte vašu fotku ALEBO logo firmy či organizácie"],
  }));
  response.json(beliefs);
}
