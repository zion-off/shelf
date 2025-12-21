"use server";

import { auth } from "@/auth";
import mongoose from "mongoose";
import mongo from "@/lib/mongodb";
import { IFolder } from "@/interfaces/models";
import Folder from "@/models/folder.model";
import { revalidateTag } from "next/cache";

interface AddFolder {
  name: string;
  isPublic: boolean;
}

export async function addFolder({
  name,
  isPublic,
}: AddFolder): Promise<IFolder> {
  const session = await auth();
  const owner = new mongoose.Types.ObjectId(session?.user?.id);
  await mongo();
  const newFolder: IFolder = await new Folder({
    owner: owner,
    name: name,
    isPublic: isPublic,
  });

  const savedFolder = await newFolder
    .save()
    .then((folder) => JSON.parse(JSON.stringify(folder)));

  revalidateTag(`user-${session?.user?.id}-folders`);

  return savedFolder;
}
