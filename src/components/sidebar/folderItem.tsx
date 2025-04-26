'use client';

import { useCallback, useMemo } from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger
} from '@/components/ui/context-menu';
import { useSidebar } from '@/components/ui/sidebar';
import { getItemsInFolder } from '@/actions/item';
import { updateDefaultFolder } from '@/actions/user/updateDefaultFolder';
import { useHomeContext } from '@/context/homeContext';
import { FolderItemContents } from './folderItemContents';
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

  const isActive = useMemo(() => {
    if (!currentFolder && !folder?._id) return true;
    if (currentFolder?._id && folder?._id === currentFolder._id) return true;
    return false;
  }, [currentFolder, folder?._id]);

  const isFavorite = useMemo(() => {
    return (!favoriteFolder && !folder?._id) || favoriteFolder === folder?._id?.toString();
  }, [favoriteFolder, folder?._id]);

  const content = useMemo(
    () => ({
      folder,
      isActive,
      isFavorite,
      onClick: handleFolderClick,
      onFavoriteClick: handleFavoriteClick
    }),
    [folder, isActive, isFavorite, handleFolderClick, handleFavoriteClick]
  );

  if (!folder) {
    return <FolderItemContents {...content} />;
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <FolderItemContents {...content} />
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
