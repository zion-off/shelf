"use server";

import { Config } from "@/models";
import mongo from "@/lib/mongodb";

export async function getDefaultFolder({
  dbID,
}: {
  dbID: string;
}): Promise<string> {
  let default_folder = null;
  await mongo();

  try {
    const config = await Config.findOne({ user: dbID }).select(
      "default_folder"
    );
    default_folder = config?.default_folder ? config.default_folder : null;
  } catch (error) {
    console.error("Error fetching items: ", error);
  }

  return JSON.parse(JSON.stringify(default_folder));
}
