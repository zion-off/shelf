'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FavoriteStar } from '@/components/sidebar/favoriteStar';
import { RenameFolderDialog } from '@/components/sidebar/renameFolderDialog';
import { DeleteFolderDialog } from '@/components/sidebar/deleteFolderDialog';
import { SidebarMenuSubItem, SidebarMenuSubButton, useSidebar } from '@/components/ui/sidebar';
import { updateDefaultFolder } from '@/actions/user/updateDefaultFolder';
import { IFolder } from '@/interfaces';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { SettingsIcon } from './settingsIcon';
import { folderIdToSlug, slugToFolderId } from '@/lib/folderUtils';

interface FolderItemProps {
  folder: IFolder | null;
}

export function FolderItem({ folder }: FolderItemProps) {
  const params = useParams();
  const { favoriteFolder, updateFavoriteFolder, setOpenMobile, isMobile } = useSidebar();

  const folderId = folder?._id.toString() ?? null;
  const currentFolderSlug = params.folderId as string | undefined;
  const currentFolderId = currentFolderSlug ? slugToFolderId(currentFolderSlug) : null;
  const isActive = currentFolderId === folderId;
  const isFavorite = favoriteFolder === folderId;

  const folderSlug = folderIdToSlug(folderId);

  const onFavoriteClick = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      updateFavoriteFolder(folderId);
      await updateDefaultFolder({ folderID: folderId });
    },
    [folderId, updateFavoriteFolder]
  );

  const handleClick = () => {
    // Close mobile sidebar when clicking a folder
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarMenuSubItem className="group/fav">
      <SidebarMenuSubButton asChild {...(isActive ? { isActive: true } : {})}>
        <Link href={`/folder/${folderSlug}`} onClick={handleClick} className="flex justify-between cursor-pointer">
          {folder?.name ? <p className="pl-2">{folder.name}</p> : <p>Ungrouped</p>}
          <div className="flex items-center gap-1 text-xs" onClick={(e) => e.stopPropagation()}>
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
                    favoriteId={favoriteFolder}
                    trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Delete</DropdownMenuItem>}
                  />
                  <DropdownMenuItem>Make {folder.isPublic ? 'private' : 'public'}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
            <FavoriteStar isFavorite={isFavorite} onClick={onFavoriteClick} />
          </div>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
