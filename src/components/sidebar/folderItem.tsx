'use client';

import { useCallback } from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger
} from '@/components/ui/context-menu';
import { SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from '@/components/ui/sidebar';
import { getItemsInFolder } from '@/actions/item';
import { updateDefaultFolder } from '@/actions/user/updateDefaultFolder';
import { useHomeContext } from '@/context/homeContext';
import { FavoriteStar } from '@/components/sidebar/favoriteStar';
import { IFolder } from '@/interfaces';

interface FolderItemProps {
  folder: IFolder | null;
}

export function FolderItem({ folder }: FolderItemProps) {
  const { currentFolder, changeOpenFolder, updateAllItems } = useHomeContext();
  const { updateFavoriteFolder, favoriteFolder } = useSidebar();

  const handleFolderClick = useCallback(async () => {
    changeOpenFolder(folder);
    const items = await getItemsInFolder({
      folderID: folder ? folder._id.toString() : null
    });
    updateAllItems(items);
  }, [changeOpenFolder, updateAllItems]);

  const handleFavoriteClick = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      updateFavoriteFolder(folder ? folder._id.toString() : null);
      await updateDefaultFolder({
        folderID: folder ? folder._id.toString() : null
      });
    },
    [folder, updateFavoriteFolder]
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <SidebarMenuSubItem onClick={handleFolderClick} className="group/fav">
          <SidebarMenuSubButton
            asChild
            {...((!currentFolder && !folder?._id) || (currentFolder?._id && folder?._id === currentFolder._id)
              ? { isActive: true }
              : {})}
          >
            <div className="flex justify-between cursor-pointer">
              <p>{folder?.name ?? 'Ungrouped'}</p>
              <FavoriteStar
                isFavorite={(!favoriteFolder && !folder?._id) || favoriteFolder === folder?._id?.toString()}
                onClick={handleFavoriteClick}
              />
            </div>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset>Rename</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset>Delete</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset>Toggle visibility</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
