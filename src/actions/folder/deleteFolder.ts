'use server';

import { auth } from '@/auth';
import mongoose from 'mongoose';
import mongo from '@/lib/mongodb';
import { Folder, Item, Config } from '@/models';

export async function deleteFolder({
  folderID,
  defaultFolderID
}: {
  folderID: string;
  defaultFolderID: string | null;
}): Promise<boolean> {
  const session = await auth();
  const userID = session?.user?.id;

  await mongo();

  const mongoSession = await mongoose.startSession();
  mongoSession.startTransaction();

  try {
    if (defaultFolderID === folderID) {
      await Config.updateOne({ user: userID }, { $set: { default_folder: null } }).session(mongoSession);
    }
    await Item.deleteMany({
      owner: userID,
      in_folder: folderID
    }).session(mongoSession);

    const result = await Folder.deleteOne({
      _id: folderID,
      owner: userID
    }).session(mongoSession);

    await mongoSession.commitTransaction();
    mongoSession.endSession();

    return result.deletedCount > 0;
  } catch (error) {
    await mongoSession.abortTransaction();
    mongoSession.endSession();
    throw new Error(`Failed to delete folder: ${error}`);
  }
}
