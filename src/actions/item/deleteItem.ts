'use server';

import { Types } from 'mongoose';
import { auth } from '@/auth';
import mongoose from 'mongoose';
import mongo from '@/lib/mongodb';
import Item from '@/models/item.model';
import { IItem } from '@/interfaces/models';
import { revalidateTag } from 'next/cache';

interface DeleteItem {
  _id: Types.ObjectId;
}

export async function deleteItem({ _id }: DeleteItem): Promise<string | null> {
  const session = await auth();
  const owner = new mongoose.Types.ObjectId(session?.user?.id);
  await mongo();

  const deletedItem: IItem | null = await Item.findOneAndDelete({ _id, owner });

  if (deletedItem) {
    revalidateTag(`user-${session?.user?.id}-folder-${deletedItem.in_folder?.toString() || null}`);
  }

  return JSON.stringify(deletedItem);
}
