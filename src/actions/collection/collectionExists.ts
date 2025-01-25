"use server"

import mongo from "@/lib/mongodb";
import mongoose from "mongoose";

export async function collectionExists(collectionName: string) {
  await mongo();
  if (!mongoose.connection.db) {
    throw new Error("Unable to connect to database");
  }
  return await mongoose.connection.db
    .listCollections({ name: collectionName })
    .hasNext();
}
