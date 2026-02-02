'use server';

import { auth } from '@/auth';
import mongoose from 'mongoose';
import mongo from '@/lib/mongodb';
import { IItem } from '@/interfaces/models';
import { AddItem, ItemData } from '@/interfaces/items/AddItem';
import Item from '@/models/item.model';
import { getRandomHex } from '@/utils';
import { revalidateTag } from 'next/cache';

export async function addItem(
  { title, author, link, notes, thumbnail }: AddItem,
  folderId: string | null
): Promise<IItem> {
  const session = await auth();
  const owner = new mongoose.Types.ObjectId(session?.user?.id);
  await mongo();

  const itemData: ItemData = {
    owner: owner,
    title: title,
    author: author,
    placeholderCover: getRandomHex(),
    in_folder: folderId ? new mongoose.Types.ObjectId(folderId) : null
  };

  if (link) itemData.link = link;
  if (notes) itemData.notes = notes;
  if (thumbnail) itemData.thumbnail = thumbnail;

  const newItem: IItem = await new Item(itemData);

  const savedItem = await newItem.save().then((item) => JSON.parse(JSON.stringify(item)));

  revalidateTag(`user-${session?.user?.id}-folder-${folderId || null}`);

  return savedItem;
}
