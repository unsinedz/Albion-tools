import type { Item } from "../types";

export default function extractItemIds(items: Item[]) {
  return new Set(items.map((x) => x.id));
}
