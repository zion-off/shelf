"use client";
import { createContext, useContext, useState, ReactNode } from "react";

const ShelfContext = createContext<{
  dialogOpen: boolean;
  toggleDialogOpen: () => void;
  saving: boolean;
  toggleSaving: () => void;
} | null>(null);

export function ShelfProvider({ children }: { children: ReactNode }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const toggleDialogOpen = () => {
    setDialogOpen((prev) => !prev);
  };

  const [saving, setSaving] = useState(false);
  const toggleSaving = () => {
    setSaving((prev) => !prev);
  };

  const value = {
    dialogOpen,
    toggleDialogOpen,
    saving,
    toggleSaving,
  };

  return (
    <ShelfContext.Provider value={value}>{children}</ShelfContext.Provider>
  );
}

export function useShelfContext() {
  const context = useContext(ShelfContext);
  if (!context) {
    throw new Error("Shelf header context unavailable");
  }
  return context;
}
