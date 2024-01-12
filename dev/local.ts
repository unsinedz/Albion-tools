import getItemRecipies from "../src/recipies/getItemRecipies";

import { writeFile } from "fs";

const ItemsUrl =
  "https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/items.json";

async function main() {
  console.log(`Albion Online recipies parser`);
  console.log(`Fetch URL: ${ItemsUrl}`);

  const data = await getItemRecipies(ItemsUrl);

  await writeFileAsync("./test.json", JSON.stringify(data));
}

void main();

// -------

export function writeFileAsync(
  fileName: string,
  content: string
): Promise<void> {
  return new Promise((res) => writeFile(fileName, content, () => res()));
}
