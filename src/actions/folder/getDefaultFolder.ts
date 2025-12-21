"use server";

import Config from "@/models/config.model";
import mongo from "@/lib/mongodb";
import { unstable_cache } from "next/cache";

export async function getDefaultFolder({
  dbID,
}: {
  dbID: string;
}): Promise<string> {
  const getCachedDefaultFolder = unstable_cache(
    async (userId: string) => {
      let default_folder = null;
      await mongo();

      try {
        const config = await Config.findOne({ user: userId }).select(
          "default_folder"
        );
        default_folder = config?.default_folder ? config.default_folder : null;
      } catch (error) {
        console.error("Error fetching default folder: ", error);
      }

      return JSON.parse(JSON.stringify(default_folder));
    },
    [`default-folder`],
    {
      tags: [`user-${dbID}-default-folder`],
      revalidate: 60
    }
  );

  return getCachedDefaultFolder(dbID);
}
