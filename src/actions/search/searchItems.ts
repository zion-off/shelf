'use server';

import { auth } from '@/auth';
import mongoose from 'mongoose';
import mongo from '@/lib/mongodb';
import Item from '@/models/item.model';
import { IItem } from '@/interfaces/models';

export async function searchItems(searchTerm: string) {
  const session = await auth();
  const owner = new mongoose.Types.ObjectId(session?.user?.id);
  await mongo();

  const items: IItem[] = await Item.aggregate([
    {
      $search: {
        index: "items",
        text: {
          query: searchTerm,
          path: {
            wildcard: "*"
          }
        }
      }
    },
    { $match: { owner: owner } }
  ]);
  return JSON.stringify(items);
}
