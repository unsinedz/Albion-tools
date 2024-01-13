import type { Item } from "../src/types";

import extractItemIds from "../src/recipies/extractItemIds";
import getItemRecipies from "../src/recipies/getItemRecipies";

import { writeFile } from "fs";

const ItemsUrl =
  "https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/items.json";

async function main() {
  console.log(`Albion Online recipies parser`);
  console.log(`Fetch URL: ${ItemsUrl}`);

  const { equipment, resource, weapon } = await getItemRecipies(ItemsUrl);

  console.log(
    `Loaded recipies: ${equipment.length} equipment, ${resource.length} resources, ${weapon.length} weapon`
  );

  const itemIds = extractItemIds((<Item[]>equipment).concat(weapon, resource));
  const idsArray = Array.from(itemIds);
  idsArray.sort((a, b) => a.substring(3).localeCompare(b.substring(3)));

  const inputFriendlyIds = idsArray.reduce((acc, cur) => {
    acc[cur] = 0.0;
    return acc;
  }, <any>{});

  await writeFileAsync(
    "./recipies.json",
    JSON.stringify({ resource, weapon, equipment })
  );
  await writeFileAsync("./test.json", JSON.stringify(inputFriendlyIds));
}

void main();

// -------

export function writeFileAsync(
  fileName: string,
  content: string
): Promise<void> {
  return new Promise((res) => writeFile(fileName, content, () => res()));
}
