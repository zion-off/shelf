'use server';

import { Types } from 'mongoose';
import { auth } from '@/auth';
import mongoose from 'mongoose';
import mongo from '@/lib/mongodb';
import { Item } from '@/models';
import { IItem } from '@/interfaces/models';

interface UpdateItem {
  _id: string;
  title: string;
  author: string;
  notes?: string;
  link?: string;
  read: boolean;
  in_folder: string | null;
}

export async function updateItem({
  _id,
  title,
  author,
  notes,
  link,
  read,
  in_folder
}: UpdateItem): Promise<string | null> {
  const session = await auth();
  const owner = new mongoose.Types.ObjectId(session?.user?.id);
  await mongo();

  const objectTypeId = new mongoose.Types.ObjectId(_id);

  const updatedItem: IItem | null = await Item.findOneAndUpdate(
    { _id: objectTypeId, owner },
    {
      title: title,
      author: author,
      notes: notes,
      link: link,
      read: read,
      last_modified: new Date(),
      in_folder: in_folder ? new mongoose.Types.ObjectId(in_folder) : null
    },
    { new: true }
  );

  return JSON.stringify(updatedItem);
}
