'use server';

import { IFolder } from '@/interfaces';
import Folder from '@/models/folder.model';
import mongo from '@/lib/mongodb';

/**
 * Get a folder by ID if it's public (no auth required)
 */
export async function getPublicFolder({
  folderId
}: {
  folderId: string;
}): Promise<IFolder | null> {
  await mongo();

  try {
    const folder = await Folder.findOne({
      _id: folderId,
      isPublic: true
    })
      .populate('owner', 'name')
      .then((doc) => (doc ? JSON.parse(JSON.stringify(doc)) : null));

    return folder;
  } catch (error) {
    console.error('Error fetching public folder: ', error);
    return null;
  }
}
