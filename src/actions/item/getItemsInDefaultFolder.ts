"use server";

import { IItem } from "@/interfaces";
import { Item } from "@/models";
import mongo from "@/lib/mongodb";

export async function getItemsInDefaultFolder({
  dbID,
  default_folder
}: {
  dbID: string;
  default_folder: string;
}): Promise<IItem[]> {
  let items: IItem[] = [];
  await mongo();
  try {
    items = await Item.find({
      owner: dbID,
      in_folder: default_folder,
    }).then((docs) => JSON.parse(JSON.stringify(docs)));
  } catch (error) {
    console.error("Error fetching items: ", error);
  }

  return items;
}
