'use client';

import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  useSidebar
} from '@/components/ui/sidebar';
import { IFolder } from '@/interfaces';
import { useHomeContext } from '@/context/homeContext';
import { getItemsInFolder } from '@/actions/item/getItemsInFolder';
import { updateDefaultFolder } from '@/actions/user/updateDefaultFolder';
import { FolderItem } from '@/components/sidebar/folderItem';
import { FolderSection } from '@/components/sidebar/folderSection';
import { AppSidebarHeader } from '@/components/sidebar/sidebarHeader';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { folderState, favoriteFolder, updateFavoriteFolder } = useSidebar();
  const { currentFolder, changeOpenFolder, updateAllItems } = useHomeContext();

  const handleFolderClick = async (changeToFolder: IFolder | null) => {
    changeOpenFolder(changeToFolder);
    const items = await getItemsInFolder({
      folderID: changeToFolder ? changeToFolder._id.toString() : null
    });
    updateAllItems(items);
  };

  const handleFavoriteClick = async (newFolderID: string | null) => {
    updateFavoriteFolder(newFolderID);
    await updateDefaultFolder({ folderID: newFolderID });
  };

  return (
    <Sidebar variant="floating" {...props}>
      <AppSidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {folderState?.length && (
              <SidebarMenuItem className="cursor-pointer">
                <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                  <FolderItem
                    folder={null}
                    isActive={currentFolder === null}
                    isFavorite={favoriteFolder === null}
                    onFolderClick={() => handleFolderClick(null)}
                    onFavoriteClick={() => handleFavoriteClick(null)}
                  />
                </SidebarMenuSub>
              </SidebarMenuItem>
            )}

            <FolderSection
              title="Public"
              folders={folderState ?? []}
              filter={(folder) => folder.isPublic === true}
              currentFolder={currentFolder}
              favoriteFolder={favoriteFolder}
              onFolderClick={handleFolderClick}
              onFavoriteClick={handleFavoriteClick}
            />

            <FolderSection
              title="Private"
              folders={folderState ?? []}
              filter={(folder) => folder.isPublic === false}
              currentFolder={currentFolder}
              favoriteFolder={favoriteFolder}
              onFolderClick={handleFolderClick}
              onFavoriteClick={handleFavoriteClick}
            />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
