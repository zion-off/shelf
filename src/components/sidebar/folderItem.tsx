'use client';

import { useCallback } from 'react';
import { FavoriteStar } from '@/components/sidebar/favoriteStar';
import { RenameFolderDialog } from '@/components/sidebar/renameFolderDialog';
import { DeleteFolderDialog } from '@/components/sidebar/deleteFolderDialog';
import { SidebarMenuSubItem, SidebarMenuSubButton } from '@/components/ui/sidebar';
import { updateDefaultFolder } from '@/actions/user/updateDefaultFolder';
import { useFolderContext } from '@/context/folderContext';
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
  const { currentFolderId, favoriteId, handleFolderClick, handleFavoriteChange } = useFolderContext();

  const folderId = folder?._id.toString() ?? null;
  const isActive = currentFolderId === folderId;
  const isFavorite = favoriteId === folderId;

  const onClick = useCallback(() => {
    handleFolderClick(folder);
  }, [handleFolderClick, folder]);

  const onFavoriteClick = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      handleFavoriteChange(folderId);
      await updateDefaultFolder({ folderID: folderId });
    },
    [folderId, handleFavoriteChange]
  );

  return (
    <SidebarMenuSubItem onClick={onClick} className="group/fav">
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
                    favoriteId={favoriteId}
                    trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Delete</DropdownMenuItem>}
                  />
                  <DropdownMenuItem>Make {folder.isPublic ? 'private' : 'public'}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
            <FavoriteStar isFavorite={isFavorite} onClick={onFavoriteClick} />
          </div>
        </div>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
