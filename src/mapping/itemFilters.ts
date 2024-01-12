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
  const set = new Set(tiers);
  return (item) => set.has(item.tier);
}

export function categories(...categories: string[]): (item: Item) => boolean {
  const set = new Set(categories);
  return (item) => set.has(item.category);
}

export function tiersForSubCategory(
  subCategory: string,
  tier1: number,
  ...tiers: number[]
): (item: Item) => boolean {
  const tiersSet = new Set([...tiers, tier1]);
  return (item) => item.subCategory !== subCategory || tiersSet.has(item.tier);
}

export function subCategories(
  ...subCategories: string[]
): (item: Item) => boolean {
  const set = new Set(subCategories);
  return (item) => set.has(item.subCategory);
}

export function doesNotRequireArtefact(item: Item) {
  function isArtefactResource(id: string) {
    return id.includes("ARTEFACT");
  }

  return (
    item.craftingRequirements.findIndex(
      (x) =>
        // there is a recipe without artifacts
        x.craftingResources.findIndex((z) => isArtefactResource(z.id)) === -1
    ) !== -1
  );
}
