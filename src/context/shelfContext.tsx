"use client";
import { createContext, useContext, useState, ReactNode } from "react";

const ShelfContext = createContext<{
  dialogOpen: boolean;
  toggleDialogOpen: () => void;
} | null>(null);

export function ShelfProvider({ children }: { children: ReactNode }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleDialogOpen = () => {
    setDialogOpen((prev) => !prev);
  };

  const value = {
    dialogOpen,
    toggleDialogOpen,
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
