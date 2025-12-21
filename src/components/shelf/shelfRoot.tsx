import { auth } from '@/auth';
import { IItem } from '@/interfaces/models';
import ItemsContainer from '@/components/shelf/itemsContainer';
import ShelfHeader from '@/components/shelf/shelfHeader';
import { AppSidebar } from '@/components/sidebar/appSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { HomeProvider } from '@/context/homeContext';
import { getItemsInFolder } from '@/actions/item/getItemsInFolder';
import { getAllFolders } from '@/actions/folder/getAllFolders';
import { getDefaultFolder } from '@/actions/folder/getDefaultFolder';

export default async function Shelf() {
  const session = await auth();
  const dbID = session?.user?.id as string;

  const [defaultFolder, folders] = await Promise.all([
    getDefaultFolder({ dbID }),
    getAllFolders({ dbID })
  ]);

  const items: IItem[] = await getItemsInFolder({ folderID: defaultFolder });
  return (
    <HomeProvider initialItems={items}>
      <SidebarProvider
        defaultFolder={defaultFolder}
        folders={folders}
        style={
          {
            '--sidebar-width': '19rem',
            height: '100%'
          } as React.CSSProperties
        }
      >
        <AppSidebar className="absolute inset-0 h-full pt-1" />
        <SidebarInset className="max-h-full flex flex-col pt-1">
          <ShelfHeader />
          <ItemsContainer />
        </SidebarInset>
      </SidebarProvider>
    </HomeProvider>
  );
}
