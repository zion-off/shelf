import { auth } from "@/auth";
import { IItem, IFolder } from "@/interfaces/models";
import ItemsContainer from "./itemsContainer";
import ShelfHeader from "./shelfHeader";
import { AppSidebar } from "@/components/sidebar/appSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getItemsInDefaultFolder } from "@/actions/item/getItemsInDefaultFolder";
import { getAllFolders } from "@/actions/folder/getAllFolders";

export default async function Shelf() {
  const session = await auth();
  const dbID = session?.user?.id as string;
  let items: IItem[] = await getItemsInDefaultFolder({ dbID });
  let folders: IFolder[] = await getAllFolders({ dbID });
  return (
    <SidebarProvider
      folders={folders}
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
