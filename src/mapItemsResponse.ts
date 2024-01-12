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
} from "./types";

import {
  doesNotRequireArtefact,
  matchAll,
  notArtefact,
  notVanity,
  subCategories,
  tiers,
  tiersForSubCategory,
} from "./itemFilters";

const CommonFilter = matchAll(
  notVanity,
  notArtefact,
  tiers(2, 3, 4),
  subCategories("sword", "leather_helmet", "leather_shoes", "firestaff", "arcanestaff", "froststaff", "shield", "book"),
  tiersForSubCategory("firestaff", 2, 3),
  tiersForSubCategory("shield", 3),
  tiersForSubCategory("book", 3),
  doesNotRequireArtefact,
);

export default function (itemsResponse: ItemsResponse) {
  const {
    items: { equipmentitem, simpleitem, weapon: weaponItem },
  } = itemsResponse;

  const equipment = equipmentitem
    .filter(isEquipmentItem)
    .map(mapEquipmentItem)
    .filter(CommonFilter);
  const resource = simpleitem
    .filter(isResourceItem)
    .map(mapResourceItem)
    .filter(CommonFilter);
  const weapon = weaponItem
    .filter(isWeaponItem)
    .map(mapWeaponItem)
    .filter(CommonFilter);
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
        ? []
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
