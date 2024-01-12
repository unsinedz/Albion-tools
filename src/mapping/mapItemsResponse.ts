import {
  type Equipment,
  type EquipmentItem,
  type Item,
  type ItemsResponse,
  type Resource,
  type ResourceItem,
  type UnknownItem,
  type Weapon,
  type WeaponItem,
  isEquipmentItem,
  isResourceItem,
  isWeaponItem,
} from "../types";

import {
  matchAll,
  notArtefact,
  notVanity,
  subCategories,
  tiers,
} from "./itemFilters";

const CommonFilter = matchAll(
  notVanity,
  notArtefact,
  tiers(2, 3, 4, 5, 6),
  subCategories("sword", "leather_helmet", "leather_shoes", "arcanestaff", "froststaff", "shield", "book")
);

export default function (itemsResponse: ItemsResponse) {
  const {
    items: { equipmentitem, simpleitem, weapon: weaponItem },
  } = itemsResponse;

  const equipment = equipmentitem
    .filter(CommonFilter)
    .filter(isEquipmentItem)
    .map(mapEquipmentItem);
  const resource = simpleitem
    .filter(CommonFilter)
    .filter(isResourceItem)
    .map(mapResourceItem);
  const weapon = weaponItem
    .filter(CommonFilter)
    .filter(isWeaponItem)
    .map(mapWeaponItem);
  return { equipment, resource, weapon };
}

function mapResourceItem(item: ResourceItem): Resource {
  return {
    ...mapBaseItem(item),
    type: "resource",
    category: "resources",
  };
}

function mapEquipmentItem(item: EquipmentItem): Equipment {
  return {
    ...mapBaseItem(item),
    type: "equipment",
  };
}

function mapWeaponItem(item: WeaponItem): Weapon {
  return {
    ...mapBaseItem(item),
    type: "weapon",
  };
}

function mapBaseItem(item: UnknownItem): Omit<Item, "type"> {
  return {
    category: item["@shopcategory"],
    subCategory: item["@shopsubcategory1"],
    tier: parseInt(item["@tier"]),
    id: item["@uniquename"],
    craftingRequirements:
      typeof item.craftingrequirements === "undefined"
        ? undefined
        : Array.isArray(item.craftingrequirements)
        ? item.craftingrequirements.map(mapCraftingRequirements)
        : [mapCraftingRequirements(item.craftingrequirements)],
  };
}

function mapCraftingRequirements(
  requirements: ArrayItem<NonNullable<UnknownItem["craftingrequirements"]>>
): ArrayItem<Item["craftingRequirements"]> {
  return {
    focus: requirements["@craftingfocus"]
      ? parseInt(requirements["@craftingfocus"])
      : undefined,
    silver: parseInt(requirements["@silver"]),
    craftingResources: !requirements.craftresource
      ? []
      : Array.isArray(requirements.craftresource)
      ? requirements.craftresource.map(mapCraftingResource)
      : [mapCraftingResource(requirements.craftresource)],
  };
}

function mapCraftingResource(
  resource: ArrayItem<
    ArrayItem<NonNullable<UnknownItem["craftingrequirements"]>>["craftresource"]
  >
): ArrayItem<
  ArrayItem<NonNullable<Item["craftingRequirements"]>>["craftingResources"]
> {
  return {
    id: resource["@uniquename"],
    count: parseInt(resource["@count"]),
    enchantmentLevel: parseInt(resource["@enchantmentlevel"] ?? "0"),
  };
}

type ArrayItem<T> = T extends Array<infer U> ? U : never;
