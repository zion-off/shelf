"use server";

import { auth } from "@/auth";
import mongoose from "mongoose";
import mongo from "@/lib/mongodb";
import { IFolder, IItem } from "@/interfaces/models";
import { Item } from "@/models";
import { getRandomHex } from "@/utils";

interface AddItem {
  title: string;
  author: string;
  link?: string;
  notes?: string;
}

export async function addItem(
  { title, author, link, notes }: AddItem,
  folderID: IFolder | null
): Promise<IItem> {
  const session = await auth();
  const owner = new mongoose.Types.ObjectId(session?.user?.id);
  await mongo();
  const newItem: IItem = await new Item({
    owner: owner,
    title: title,
    author: author,
    link: link,
    placeholderCover: getRandomHex(),
    notes: notes,
    in_folder: folderID?._id || null,
  });

  return await newItem.save().then((item) => JSON.parse(JSON.stringify(item)));
}
