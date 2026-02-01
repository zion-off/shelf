'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { IFolder } from '@/interfaces';
import { useHomeContext } from '@/context/homeContext';
import { getItemsInFolder } from '@/actions/item';

interface FolderContextType {
  currentFolderId: string | null;
  favoriteId: string | null;
  handleFolderClick: (folder: IFolder | null) => void;
  handleFavoriteChange: (folderId: string | null) => void;
}

const FolderContext = createContext<FolderContextType | null>(null);

interface FolderProviderProps {
  children: ReactNode;
  defaultFolder: string | null;
}

export function FolderProvider({ children, defaultFolder }: FolderProviderProps) {
  const { updateAllItems, setLoadingItems } = useHomeContext();

  const [currentFolderId, setCurrentFolderId] = useState<string | null>(defaultFolder);
  const [favoriteId, setFavoriteId] = useState<string | null>(defaultFolder);

  const handleFolderClick = useCallback(
    async (folder: IFolder | null) => {
      const folderId = folder?._id.toString() ?? null;
      setCurrentFolderId(folderId);
      setLoadingItems(true);
      const items = await getItemsInFolder({ folderID: folderId });
      updateAllItems(items);
    },
    [setLoadingItems, updateAllItems]
  );

  const handleFavoriteChange = useCallback((folderId: string | null) => {
    setFavoriteId(folderId);
  }, []);

  return (
    <FolderContext.Provider
      value={{
        currentFolderId,
        favoriteId,
        handleFolderClick,
        handleFavoriteChange
      }}
    >
      {children}
    </FolderContext.Provider>
  );
}

export function useFolderContext() {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error('useFolderContext must be used within a FolderProvider');
  }
  return context;
}
