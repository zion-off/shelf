"use client";

import { IItem } from "@/interfaces/models";
import { createContext, useContext, useState, ReactNode } from "react";

const HomeContext = createContext<{
  dialogOpen: boolean;
  toggleDialogOpen: () => void;
  saving: boolean;
  toggleSaving: () => void;
  items: IItem[];
  updateAllItems: (fetchedItems: IItem[]) => void;
  addSingleItem: (newItem: IItem) => void;
} | null>(null);

export function HomeProvider({ children }: { children: ReactNode }) {
  // Dialog for adding new item
  const [dialogOpen, setDialogOpen] = useState(false);
  const toggleDialogOpen = () => {
    setDialogOpen((prev) => !prev);
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

  const value = {
    dialogOpen,
    toggleDialogOpen,
    saving,
    toggleSaving,
    items,
    updateAllItems,
    addSingleItem,
  };

  return (
    <HomeContext.Provider value={value}>{children}</HomeContext.Provider>
  );
}

export function useHomeContext() {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("Shelf header context unavailable");
  }
  return context;
}
