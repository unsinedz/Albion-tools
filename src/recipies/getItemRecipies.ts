import type { ItemsResponse } from "./recipies.types";

import mapItemsResponse from "./mapItemsResponse";
import fetchJson from "../utils/fetchJson";
import measure from "../utils/measure";

const ItemsUrl =
  "https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/items.json";

export default async function getItemRecipies() {
  console.log(`Fetching recipies data`);

  const { data, elapsedSeconds } = await measure(async () => {
    const response = await fetchJson<ItemsResponse>(ItemsUrl);
    return mapItemsResponse(response);
  });

  console.log(`Time elapsed: ${elapsedSeconds} seconds`);

  return data;
}