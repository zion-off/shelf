"use server"

import { IItem } from "@/interfaces";
import Item from "@/models/item.model";
import mongo from "@/lib/mongodb";
import { auth } from "@/auth";
import { unstable_cache } from "next/cache";

export async function getItemsInFolder({
  folderID,
}: {
  folderID: string | null;
}): Promise<IItem[]> {
  const session = await auth();
  const dbID = session?.user?.id;

  if (!dbID) return [];

  const getCachedItems = unstable_cache(
    async (userId: string, folderId: string | null) => {
      let items: IItem[] = [];
      await mongo();

      try {
        items = await Item.find({
          owner: userId,
          in_folder: folderId,
        }).then((docs) => JSON.parse(JSON.stringify(docs)));
      } catch (error) {
        console.error("Error fetching items: ", error);
      }

      return items;
    },
    [`items-folder`],
    {
      tags: [`user-${dbID}-folder-${folderID}`],
      revalidate: 60
    }
  );

  return getCachedItems(dbID, folderID);
}