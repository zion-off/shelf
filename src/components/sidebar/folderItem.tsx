'use client';

import { useCallback, useMemo } from 'react';
import { FavoriteStar } from '@/components/sidebar/favoriteStar';
import { RenameFolderDialog } from '@/components/sidebar/renameFolderDialog';
import { DeleteFolderDialog } from '@/components/sidebar/deleteFolderDialog';
import { SidebarMenuSubItem, SidebarMenuSubButton, useSidebar } from '@/components/ui/sidebar';
import { getItemsInFolder } from '@/actions/item';
import { updateDefaultFolder } from '@/actions/user/updateDefaultFolder';
import { useHomeContext } from '@/context/homeContext';
import { IFolder } from '@/interfaces';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { SettingsIcon } from './settingsIcon';

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

  const isActive = useMemo(() => {
    if (!currentFolder && !folder?._id) return true;
    if (currentFolder?._id && folder?._id === currentFolder._id) return true;
    return false;
  }, [currentFolder, folder?._id]);

  const isFavorite = useMemo(() => {
    return (!favoriteFolder && !folder?._id) || favoriteFolder === folder?._id?.toString();
  }, [favoriteFolder, folder?._id]);

  return (
    <SidebarMenuSubItem onClick={handleFolderClick} className="group/fav">
      <SidebarMenuSubButton asChild {...(isActive ? { isActive: true } : {})}>
        <div className="flex justify-between cursor-pointer">
          {folder?.name ? <p className="pl-2">{folder.name}</p> : <p>Ungrouped</p>}
          <div className="flex items-center gap-1 text-xs">
            {folder ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SettingsIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <RenameFolderDialog
                    folder={folder}
                    trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Rename</DropdownMenuItem>}
                  />
                  <DeleteFolderDialog
                    folder={folder}
                    trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Delete</DropdownMenuItem>}
                  />
                  <DropdownMenuItem>Make {folder.isPublic ? 'private' : 'public'}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
            <FavoriteStar isFavorite={isFavorite} onClick={handleFavoriteClick} />
          </div>
        </div>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
