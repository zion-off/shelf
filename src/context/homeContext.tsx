'use client';

import { Types } from 'mongoose';
import { IItem } from '@/interfaces/models';
import { editItemFormValues } from '@/types/shelf';
import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

const HomeContext = createContext<{
  // Dialog states
  itemDialogOpen: boolean;
  toggleItemDialogOpen: () => void;
  folderDialogOpen: boolean;
  toggleFolderDialogOpen: () => void;
  deleteFolderDialogOpen: boolean;
  toggleDeleteFolderDialogOpen: () => void;
  // Loading states
  saving: boolean;
  toggleSaving: () => void;
  // Items in current folder
  items: IItem[];
  loadingItems: boolean;
  setLoadingItems: React.Dispatch<React.SetStateAction<boolean>>;
  updateAllItems: (fetchedItems: IItem[]) => void;
  addSingleItem: (newItem: IItem) => void;
  deleteItemFromList: (itemId: string) => void;
  updateItemInList: (itemId: string, updatedItem: editItemFormValues) => void;
  // Editing state for item drawer
  isEditing: boolean;
  handleEditingChange: (value: boolean) => void;
} | null>(null);

interface HomeProviderProps {
  children: ReactNode;
  initialItems?: IItem[];
}

export function HomeProvider({ children, initialItems = [] }: HomeProviderProps) {
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

  // Dialog for deleting folder
  const [deleteFolderDialogOpen, setDeleteFolderDialogOpen] = useState(false);
  const toggleDeleteFolderDialogOpen = () => {
    setDeleteFolderDialogOpen((prev) => !prev);
  };

  // Loading state while item is being added to database
  const [saving, setSaving] = useState(false);
  const toggleSaving = () => {
    setSaving((prev) => !prev);
  };

  // Items in current folder
  const [items, setItems] = useState<IItem[]>(initialItems);
  const [loadingItems, setLoadingItems] = useState(initialItems.length === 0);

  const updateAllItems = useCallback((fetchedItems: IItem[]) => {
    setItems(fetchedItems);
    setLoadingItems(false);
  }, []);

  const addSingleItem = useCallback((newItem: IItem) => {
    setItems((prev) => [...prev, newItem]);
  }, []);

  const deleteItemFromList = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => item._id.toString() !== itemId));
  }, []);

  const updateItemInList = useCallback((itemId: string, updatedItem: editItemFormValues) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item._id.toString() === itemId) {
          // Mutate the item in place and return it (maintains IItem type)
          item.title = updatedItem.title;
          item.author = updatedItem.author;
          item.notes = updatedItem.notes;
          item.link = updatedItem.link;
          item.read = updatedItem.read;
          item.in_folder = updatedItem.in_folder ? new Types.ObjectId(updatedItem.in_folder) : null;
          item.last_modified = new Date();
        }
        return item;
      })
    );
  }, []);

  // Editing state in the drawer
  const [isEditing, setIsEditing] = useState(false);
  const handleEditingChange = (value: boolean) => {
    setIsEditing(value);
  };

  const value = {
    itemDialogOpen,
    toggleItemDialogOpen,
    folderDialogOpen,
    toggleFolderDialogOpen,
    deleteFolderDialogOpen,
    toggleDeleteFolderDialogOpen,
    saving,
    toggleSaving,
    items,
    loadingItems,
    setLoadingItems,
    updateAllItems,
    addSingleItem,
    deleteItemFromList,
    updateItemInList,
    isEditing,
    handleEditingChange
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

export function useHomeContext() {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error('Shelf header context unavailable');
  }
  return context;
}
