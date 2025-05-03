'use server';

import { auth } from '@/auth';
import mongoose from 'mongoose';
import mongo from '@/lib/mongodb';
import { IFolder, IItem } from '@/interfaces/models';
import { Item } from '@/models';
import { getRandomHex } from '@/utils';

interface AddItem {
  title: string;
  author: string;
  link?: string;
  notes?: string;
  thumbnail?: string;
}

interface ItemData extends AddItem {
  owner: mongoose.Types.ObjectId;
  placeholderCover: string;
  in_folder: mongoose.Types.ObjectId | null;
}

export async function addItem(
  { title, author, link, notes, thumbnail }: AddItem,
  folderID: IFolder | null
): Promise<IItem> {
  const session = await auth();
  const owner = new mongoose.Types.ObjectId(session?.user?.id);
  await mongo();

  const itemData: ItemData = {
    owner: owner,
    title: title,
    author: author,
    placeholderCover: getRandomHex(),
    in_folder: folderID?._id || null
  };

  if (link) itemData.link = link;
  if (notes) itemData.notes = notes;
  if (thumbnail) itemData.thumbnail = thumbnail;

  const newItem: IItem = await new Item(itemData);

  return await newItem.save().then((item) => JSON.parse(JSON.stringify(item)));
}
