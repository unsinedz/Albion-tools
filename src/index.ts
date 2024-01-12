import type { ItemsResponse } from "./types";

import { writeFileAsync } from "./asyncFs";
import measure from "./measure";
import mapItemsResponse from "./mapping/mapItemsResponse";

const ItemsUrl =
  "https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/items.json";

async function main() {
  console.log(`Albion Online recipies parser`);
  console.log(`Fetch URL: ${ItemsUrl}`);

  console.log(`Fetching items data`);

  const { data, elapsedSeconds } = await measure(() =>
    fetchData<ItemsResponse>(ItemsUrl)
  );

  console.log(`Time elapsed: ${elapsedSeconds}`);

  const items = mapItemsResponse(data);
  await writeFileAsync("./test.json", JSON.stringify(items));
}

void main();

// -------

async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Received invalid response from the server");
  }

  return response.json();
}
