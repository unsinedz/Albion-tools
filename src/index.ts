import type { ItemsResponse } from "./types";

import { writeFileAsync } from "./utils/asyncFs";
import measure from "./utils/measure";
import mapItemsResponse from "./mapItemsResponse";

const ItemsUrl =
  "https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/items.json";

async function main() {
  console.log(`Albion Online recipies parser`);
  console.log(`Fetch URL: ${ItemsUrl}`);

  console.log(`Fetching items data`);

  const { data, elapsedSeconds } = await measure(async () => {
    const response = await fetchData<ItemsResponse>(ItemsUrl);
    // await writeFileAsync("./response.json", JSON.stringify(response));
    return mapItemsResponse(response);
  });

  console.log(`Time elapsed: ${elapsedSeconds} seconds`);

  await writeFileAsync("./test.json", JSON.stringify(data));
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
