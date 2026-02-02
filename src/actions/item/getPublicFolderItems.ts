'use server';

import { IItem } from '@/interfaces';
import Item from '@/models/item.model';
import Folder from '@/models/folder.model';
import mongo from '@/lib/mongodb';

/**
 * Get items in a folder if the folder is public (no auth required)
 */
export async function getPublicFolderItems({
  folderId
}: {
  folderId: string;
}): Promise<IItem[]> {
  await mongo();

  try {
    // First verify the folder is public
    const folder = await Folder.findOne({
      _id: folderId,
      isPublic: true
    });

    if (!folder) {
      return [];
    }

    // Fetch items in the public folder
    const items = await Item.find({
      in_folder: folderId
    }).then((docs) => JSON.parse(JSON.stringify(docs)));

    return items;
  } catch (error) {
    console.error('Error fetching public folder items: ', error);
    return [];
  }
}
