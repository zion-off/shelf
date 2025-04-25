'use server';

import { Types } from 'mongoose';
import { auth } from '@/auth';
import mongoose from 'mongoose';
import mongo from '@/lib/mongodb';
import { Item } from '@/models';
import { IItem } from '@/interfaces/models';

interface UpdateItem {
  _id: Types.ObjectId;
  title: string;
  author: string;
  notes?: string;
  link?: string;
  read: boolean;
}

export async function updateItem({ _id, title, author, notes, link, read }: UpdateItem): Promise<string | null> {
  const session = await auth();
  const owner = new mongoose.Types.ObjectId(session?.user?.id);
  await mongo();

  const updatedItem: IItem | null = await Item.findOneAndUpdate(
    { _id, owner },
    {
      title: title,
      author: author,
      notes: notes,
      link: link,
      read: read,
      last_modified: new Date()
    },
    { new: true }
  );

  return JSON.stringify(updatedItem);
}
