"use server"

import mongoose from "mongoose";
import mongo from "@/lib/mongodb";

export async function createNewCollection(collectionName: string) {
  await mongo();
  if (!mongoose.connection.db) {
    throw new Error("Unable to connect to database");
  }
  await mongoose.connection.db.createCollection(collectionName);
}
