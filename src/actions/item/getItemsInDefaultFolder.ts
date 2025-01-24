import { IItem } from "@/interfaces";
import { Config, Item } from "@/models";
import mongo from "@/lib/mongodb";

export async function getItemsInDefaultFolder({
  dbID,
}: {
  dbID: string;
}): Promise<IItem[]> {
  let items: IItem[] = [];
  await mongo();

  try {
    const config = await Config.findOne({ user: dbID }).select(
      "default_folder"
    );
    const default_folder = config?.default_folder
      ? config.default_folder
      : null;
    items = await Item.find({
      owner: dbID,
      in_folder: default_folder,
    }).then((docs) => JSON.parse(JSON.stringify(docs)));
  } catch (error) {
    console.error("Error fetching items: ", error);
  }

  return items;
}
