import { UnknownItem } from "../types";

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

export function notVanity(item: UnknownItem) {
  return !item["@uniquename"].includes("UNIQUE_VANITY");
}

export function notArtefact(item: UnknownItem): boolean {
  return item["@shopcategory"] !== "artefacts";
}

export function tiers(...tiers: number[]): (item: UnknownItem) => boolean {
  return (item) =>
    tiers.findIndex((x) => item["@tier"] === x.toString()) !== -1;
}

export function categories(
  ...categories: string[]
): (item: UnknownItem) => boolean {
  return (item) => categories.includes(item["@shopcategory"]);
}

export function subCategories(
  ...subCategories: string[]
): (item: UnknownItem) => boolean {
  return (item) => subCategories.includes(item["@shopsubcategory1"]);
}
