"use server";

import { auth } from "@/auth";
import mongoose from "mongoose";
import mongo from "@/lib/mongodb";
import { Config } from "@/models";

interface IUpdateDefaultFolder {
  folderID: string | null;
}

export async function updateDefaultFolder({
  folderID,
}: IUpdateDefaultFolder): Promise<void> {
  const session = await auth();
  const owner = new mongoose.Types.ObjectId(session?.user?.id);
  await mongo();
  await Config.findOneAndUpdate({ user: owner }, { default_folder: folderID });
}
