import { Item } from "../types";

export function matchAll<T>(
  ...predicates: ((x: T) => boolean)[]
): (x: T) => boolean {
  return (x: T) => {
    for (const predicate of predicates) {
      if (!predicate(x)) {
        return false;
      }
    }

    return true;
  };
}

export function notVanity(item: Item) {
  return !item.id.includes("UNIQUE_VANITY");
}

export function notArtefact(item: Item): boolean {
  return item.category !== "artefacts";
}

export function tiers(...tiers: number[]): (item: Item) => boolean {
  return (item) => tiers.includes(item.tier);
}

export function categories(...categories: string[]): (item: Item) => boolean {
  return (item) => categories.includes(item.category);
}

export function subCategories(
  ...subCategories: string[]
): (item: Item) => boolean {
  return (item) => subCategories.includes(item.subCategory);
}
