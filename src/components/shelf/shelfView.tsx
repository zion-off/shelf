"use client";

import { useEffect } from "react";

import { useHomeContext } from "@/context/homeContext";
import { IItem } from "@/interfaces/models";
import Image from "next/image";
import { noise } from "@/utils";

export default function ShelfView({ fetchedItems }: { fetchedItems: IItem[] }) {
  const { items, updateAllItems: updateItems } = useHomeContext();

  // Load items on mount
  useEffect(() => {
    updateItems(fetchedItems);
  }, []);

  return (
    <div className="w-full flex gap-2 py-4">
      {items.length > 0
        ? items.map((item) => {
            return <Item key={item._id.toString()} item={item} />;
          })
        : "Nothing to see here... yet"}
    </div>
  );
}

const Item = ({ item }: { item: IItem }) => {
  const {
    owner,
    title,
    author,
    link,
    notes,
    thumbnail,
    placeholderCover,
    read,
    created_at,
    last_modified,
  } = item;

  return (
    <div className="w-full md:w-1/4 flex flex-col border dark:border-neutral-700 rounded-md overflow-clip shadow-md">
      <div className="basis-2/3 w-full h-20">
        {thumbnail ? (
          <Image src={thumbnail} alt={title} />
        ) : (
          <div
            style={{ ...noise }}
            className={`bg-[#${placeholderCover}] w-full h-full bg-noise`}
          />
        )}
      </div>
      <div className="flex flex-col p-2 text-z-background bg-z-background-secondary text-xs">
        <h3 className="text-z-foreground">{title}</h3>
        <p className="text-z-foreground-secondary">{author}</p>
      </div>
    </div>
  );
};
