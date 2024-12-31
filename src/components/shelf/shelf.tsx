import { auth } from "@/auth";
import mongo from "@/lib/mongodb";
import { User, Config, Item } from "@/models";
import ShelfView from "./shelfView";
import { IItem } from "@/interfaces";

export const dynamic = "force-dynamic";

export default async function Shelf() {
  const session = await auth();
  const email = session?.user?.email;
  let items: IItem[] = [];
  await mongo();

  try {
    const user = await User.findOne({ email }).select("_id");
    const config = await Config.findOne({ user: user._id }).select(
      "default_folder"
    );
    const { default_folder } = config;
    items = await Item.find({
      owner: user,
      in_folder: default_folder,
    });
  } catch (error) {
    console.error("Error fetching items: ", error);
  }

  return (
    <main className="grow h-full bg-slate-400 mx-4">
      <ShelfView items={items} />
    </main>
  );
}
