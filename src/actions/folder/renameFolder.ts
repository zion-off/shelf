'use server';

import { Types } from 'mongoose';
import { auth } from '@/auth';
import mongoose from 'mongoose';
import mongo from '@/lib/mongodb';
import { Folder } from '@/models';
import { IFolder } from '@/interfaces/models';

interface RenameFolder {
  _id: Types.ObjectId;
  name: string;
}

export async function renameFolder({ _id, name }: RenameFolder): Promise<string | null> {
  const session = await auth();
  const owner = new mongoose.Types.ObjectId(session?.user?.id);
  await mongo();

  const updatedFolder: IFolder | null = await Folder.findOneAndUpdate(
    { _id, owner },
    {
      name: name,
      last_modified: new Date()
    }
  );

  return updatedFolder ? updatedFolder.name : null;
}
