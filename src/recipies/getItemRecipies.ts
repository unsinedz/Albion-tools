import type { ItemsResponse } from "./recipies.types";

import mapItemsResponse from "./mapItemsResponse";
import fetchJson from "../utils/fetchJson";
import measure from "../utils/measure";

export default async function getItemRecipies(url: string) {
  console.log(`Fetching recipies data`);

  const { data, elapsedSeconds } = await measure(async () => {
    const response = await fetchJson<ItemsResponse>(url);
    return mapItemsResponse(response);
  });

  console.log(`Time elapsed: ${elapsedSeconds} seconds`);

  return data;
}