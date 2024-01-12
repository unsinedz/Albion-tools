export interface ItemsResponse {
  items: {
    simpleitem: UnknownItem[];
    equipmentitem: UnknownItem[];
    weapon: UnknownItem[];
  };
}

interface BaseItem {
  "@uniquename": string;
  "@shopcategory": string;
  "@shopsubcategory1": string;
  "@tier": string;
}

export type UnknownItem = ResourceItem | EquipmentItem | WeaponItem;

export interface ResourceItem extends BaseItem, CraftableItem {
  "@shopcategory": "resources";
}

export interface EquipmentItem extends BaseItem, CraftableItem {
  "@slottype": string;
}

export interface WeaponItem extends BaseItem, CraftableItem {
  "@twohanded": string;
}

export function isResourceItem(item: UnknownItem): item is ResourceItem {
  return item["@shopcategory"] === "resources";
}

export function isEquipmentItem(item: UnknownItem): item is EquipmentItem {
  return typeof (item as EquipmentItem)["@slottype"] === "string";
}

export function isWeaponItem(item: UnknownItem): item is WeaponItem {
  return typeof (item as WeaponItem)["@twohanded"] === "string";
}

interface CraftableItem {
  craftingrequirements?: CraftingRequirements;
}

interface CraftingRequirements {
  "@silver": string;
  "@craftingfocus"?: string;
  craftresource?: CraftResource | CraftResource[];
}

interface CraftResource {
  "@uniquename": string;
  "@count": string;
  "@enchantmentlevel"?: string;
}
