interface BaseItem {
  id: string;
  category: string;
  subCategory: string;
  tier: number;
}

export type Item = Resource | Equipment | Weapon;

export interface Resource extends BaseItem, CraftableItem {
  type: "resource";
  category: "resources";
}

export interface Equipment extends BaseItem, CraftableItem {
  type: "equipment";
}

export interface Weapon extends BaseItem, CraftableItem {
  type: "weapon";
}

interface CraftableItem {
  craftingRequirements: CraftingRequirements[];
}

interface CraftingRequirements {
  silver: number;
  focus?: number;
  craftingResources: CraftResource[];
}

interface CraftResource {
  id: string;
  count: number;
  enchantmentLevel: number;
}
