"use client";

import { IItem, IFolder } from "@/interfaces/models";
import { createContext, useContext, useState, ReactNode, useCallback } from "react";

const HomeContext = createContext<{
  itemDialogOpen: boolean;
  toggleItemDialogOpen: () => void;
  folderDialogOpen: boolean;
  toggleFolderDialogOpen: () => void;
  saving: boolean;
  toggleSaving: () => void;
  items: IItem[];
  updateAllItems: (fetchedItems: IItem[]) => void;
  addSingleItem: (newItem: IItem) => void;
  currentFolder: IFolder | null;
  changeOpenFolder: (changeTo: IFolder) => void;
} | null>(null);

export function HomeProvider({ children }: { children: ReactNode }) {
  // Dialog for adding new item
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const toggleItemDialogOpen = () => {
    setItemDialogOpen((prev) => !prev);
  };

  // Dialog for adding new folder
  const [folderDialogOpen, setFolderDialogOpen] = useState(false);
  const toggleFolderDialogOpen = () => {
    setFolderDialogOpen((prev) => !prev);
  };

  // Loading state while item is being added to database
  const [saving, setSaving] = useState(false);
  const toggleSaving = () => {
    setSaving((prev) => !prev);
  };

  // Items in view
  const [items, setItems] = useState<IItem[]>([]);
  // Set all items
  const updateAllItems = (fetchedItems: IItem[]) => {
    setItems(fetchedItems);
  };

  // Add a single item
  const addSingleItem = (newItem: IItem) => {
    setItems((prev) => [...prev, newItem]);
  };

  // For opening different folders
  const [currentFolder, setCurrentFolder] = useState<IFolder | null>(null);
  const changeOpenFolder = useCallback((newFolder: IFolder) => {
    setCurrentFolder(newFolder);
  }, [currentFolder, setCurrentFolder])

  const value = {
    itemDialogOpen,
    toggleItemDialogOpen,
    folderDialogOpen,
    toggleFolderDialogOpen,
    saving,
    toggleSaving,
    items,
    updateAllItems,
    addSingleItem,
    currentFolder,
    changeOpenFolder
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

export function useHomeContext() {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("Shelf header context unavailable");
  }
  return context;
}
