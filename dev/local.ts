import type { Item } from "../src/types";

import extractItemIds from "../src/recipies/extractItemIds";
import getItemRecipies from "../src/recipies/getItemRecipies";

import getItemPrices from "../src/prices/getItemPrices";

import { writeFile } from "fs";

async function main() {
  console.log(`Albion Online recipies parser`);

  const { equipment, resource, weapon } = await getItemRecipies();

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

  const locations = ["Lymhurst"];
  const items = ["T4_MAIN_AXE"];
  const prices = getItemPrices(items, locations);

  await writeFileAsync("./test.json", JSON.stringify(prices));
}

void main();

// -------

export function writeFileAsync(
  fileName: string,
  content: string
): Promise<void> {
  return new Promise((res) => writeFile(fileName, content, () => res()));
}
