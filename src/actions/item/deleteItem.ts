'use server';

import { Types } from 'mongoose';
import { auth } from '@/auth';
import mongoose from 'mongoose';
import mongo from '@/lib/mongodb';
import { Item } from '@/models';
import { IItem } from '@/interfaces/models';

interface DeleteItem {
  _id: Types.ObjectId;
}

export async function deleteItem({ _id }: DeleteItem): Promise<string | null> {
  const session = await auth();
  const owner = new mongoose.Types.ObjectId(session?.user?.id);
  await mongo();

  const deletedItem: IItem | null = await Item.findOneAndDelete({ _id, owner });

  return JSON.stringify(deletedItem);
}
