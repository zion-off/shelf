import { auth } from "@/auth";
import mongo from "@/lib/mongodb";
import { Config, Item } from "@/models";
import { IItem } from "@/interfaces/models";
import ItemsContainer from "./itemsContainer";
import ShelfHeader from "./shelfHeader";
import { AppSidebar } from "@/components/sidebar/appSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default async function Shelf() {
  const session = await auth();
  const dbID = session?.user?.id;
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

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
          height: "100%",
        } as React.CSSProperties
      }
    >
      <AppSidebar className="absolute inset-0 h-full" />
      <SidebarInset className="max-h-full flex flex-col ">
        <ShelfHeader />
        <ItemsContainer fetchedItems={items} />
      </SidebarInset>
    </SidebarProvider>
  );
}
