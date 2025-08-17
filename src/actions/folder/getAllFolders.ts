"use server"

import { IFolder } from "@/interfaces";
import Folder from "@/models/folder.model";
import mongo from "@/lib/mongodb";

export async function getAllFolders({ dbID }: { dbID: string }) {
  let folders: IFolder[] = [];

  try {
    await mongo();
    folders = await Folder.find({
      owner: dbID,
    }).then((docs) => JSON.parse(JSON.stringify(docs)));
  } catch (error) {
    console.error("Error fetching folders", error);
  }

  return folders;
}
