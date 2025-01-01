"use client";

import { createContext, useContext, useState, ReactNode } from "react";

const ShelfContext = createContext<{
  drawerOpen: boolean;
  toggleDrawerOpen: () => void;
} | null>(null);

export function ShelfProvider({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawerOpen = () => {
    setDrawerOpen((prev) => !prev);
  };

  const value = {
    drawerOpen,
    toggleDrawerOpen,
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
