"use client";

import { useShelfContext } from "@/context/shelfContext";
import { IItem } from "@/interfaces/models";
import { useEffect } from "react";

export default function ShelfView({ fetchedItems }: { fetchedItems: IItem[] }) {
  const { items, updateAllItems: updateItems } = useShelfContext();

  // Load items on mount
  useEffect(() => {
    updateItems(fetchedItems);
  }, []);

  return (
    <div>
      {items.length > 0
        ? items.map((item) => {
            return <p key={item._id.toString()}>{item.title}</p>;
          })
        : "No items yet"}
    </div>
  );
}
