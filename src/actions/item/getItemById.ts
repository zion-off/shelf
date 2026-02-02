'use server';

import { IItem } from '@/interfaces';
import Item from '@/models/item.model';
import mongo from '@/lib/mongodb';
import { auth } from '@/auth';
import { unstable_cache } from 'next/cache';

export async function getItemById({ itemId }: { itemId: string }): Promise<IItem | null> {
  const session = await auth();
  const dbID = session?.user?.id;

  if (!dbID) return null;

  const getCachedItem = unstable_cache(
    async (userId: string, id: string) => {
      let item: IItem | null = null;
      await mongo();

      try {
        item = await Item.findOne({
          _id: id,
          owner: userId
        }).then((doc) => (doc ? JSON.parse(JSON.stringify(doc)) : null));
      } catch (error) {
        console.error('Error fetching item: ', error);
      }

      return item;
    },
    [`item-by-id`],
    {
      tags: [`user-${dbID}-item-${itemId}`],
      revalidate: 60
    }
  );

  return getCachedItem(dbID, itemId);
}
