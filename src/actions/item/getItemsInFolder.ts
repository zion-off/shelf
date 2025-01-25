"use server"

import { IItem } from "@/interfaces";
import models from "@/models";
import mongo from "@/lib/mongodb";
import { auth } from "@/auth";

export async function getItemsInFolder({
  folderID,
}: {
  folderID: string;
}): Promise<IItem[]> {
  const session = await auth();
  const dbID = session?.user?.id;
  let items: IItem[] = [];
  await mongo();

  try {
    items = await models.Item.find({
      owner: dbID,
      in_folder: folderID,
    }).then((docs) => JSON.parse(JSON.stringify(docs)));
  } catch (error) {
    console.error("Error fetching items: ", error);
  }

  return items;
}