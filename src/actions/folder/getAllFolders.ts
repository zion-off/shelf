"use server"

import { IFolder } from "@/interfaces";
import Folder from "@/models/folder.model";
import mongo from "@/lib/mongodb";
import { unstable_cache } from "next/cache";

export async function getAllFolders({ dbID }: { dbID: string }) {
  const getCachedFolders = unstable_cache(
    async (userId: string) => {
      let folders: IFolder[] = [];

      try {
        await mongo();
        folders = await Folder.find({
          owner: userId,
        }).then((docs) => JSON.parse(JSON.stringify(docs)));
      } catch (error) {
        console.error("Error fetching folders", error);
      }

      return folders;
    },
    [`folders`],
    {
      tags: [`user-${dbID}-folders`],
      revalidate: 60
    }
  );

  return getCachedFolders(dbID);
}
