'use client';

import { IItem, IFolder } from '@/interfaces/models';
import { editItemFormValues } from '@/types/shelf';
import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

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
  changeOpenFolder: (changeTo: IFolder | null) => void;
  drawerOpen: boolean;
  handleDrawerOpenChange: (open: boolean) => void;
  isEditing: boolean;
  handleEditingChange: (value: boolean) => void;
  selectedItem: IItem | null;
  handleSelectedItemChange: (item: IItem | null) => void;
  updateSelectedItem: (updatedItem: editItemFormValues) => void;
  deleteSelectedItem: () => void;
  deleteFolderDialogOpen: boolean;
  toggleDeleteFolderDialogOpen: () => void;
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
  const changeOpenFolder = useCallback(
    (newFolder: IFolder | null) => {
      setCurrentFolder(newFolder);
    },
    [setCurrentFolder]
  );

  // Drawer open state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerOpenChange = (open: boolean) => {
    setDrawerOpen(open);
  };

  // Editing state in the drawer
  const [isEditing, setIsEditing] = useState(false);
  const handleEditingChange = (value: boolean) => {
    setIsEditing(value);
  };

  // Item open in the drawer
  const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
  const handleSelectedItemChange = (item: IItem | null) => {
    setSelectedItem(item);
  };

  const updateSelectedItem = useCallback(
    (updatedItem: editItemFormValues) => {
      setItems((prev) =>
        prev.map((item) => {
          if (item._id === selectedItem?._id) {
            item.title = updatedItem.title;
            item.author = updatedItem.author;
            item.notes = updatedItem.notes;
            item.link = updatedItem.link;
            item.read = updatedItem.read;
            item.last_modified = new Date();
            return item;
          }
          return item;
        })
      );
    },
    [selectedItem]
  );

  const deleteSelectedItem = useCallback(() => {
    setItems((prev) => prev.filter((item) => item._id !== selectedItem?._id));
    setSelectedItem(null);
  }, [selectedItem]);

  const [deleteFolderDialogOpen, setDeleteFolderDialogOpen] = useState(false);
  const toggleDeleteFolderDialogOpen = () => {
    setDeleteFolderDialogOpen((prev) => !prev);
  };

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
    changeOpenFolder,
    drawerOpen,
    handleDrawerOpenChange,
    isEditing,
    handleEditingChange,
    selectedItem,
    handleSelectedItemChange,
    updateSelectedItem,
    deleteSelectedItem,
    deleteFolderDialogOpen,
    toggleDeleteFolderDialogOpen
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
