import { auth } from "@/auth";
import mongo from "@/lib/mongodb";
import { Config, Item } from "@/models";
import { IItem } from "@/interfaces/models";
import ShelfView from "./shelfView";
import ShelfHeader from "./shelfHeader";

export const dynamic = "force-dynamic";

export default async function Shelf() {
  const session = await auth();
  const dbID = session?.user?.id;
  let items: IItem[] = [];
  await mongo();

  try {
    const config = await Config.findOne({ user: dbID }).select(
      "default_folder"
    );
    const { default_folder } = config;
    items = await Item.find({
      owner: dbID,
      in_folder: default_folder,
    }).then((docs) => JSON.parse(JSON.stringify(docs)));
  } catch (error) {
    console.error("Error fetching items: ", error);
  }

  return (
    <main className="grow h-full bg-slate-400 ml-4 flex flex-col">
      <ShelfHeader />
      <ShelfView fetchedItems={items} />
    </main>
  );
}
