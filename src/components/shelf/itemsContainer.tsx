"use client";

import { useEffect } from "react";
import { useHomeContext } from "@/context/homeContext";
import { IItem } from "@/interfaces/models";
import Image from "next/image";
import { noise } from "@/utils";

export default function ItemsContainer({
  fetchedItems,
}: {
  fetchedItems: IItem[];
}) {
  const { items, updateAllItems: updateItems } = useHomeContext();

  useEffect(() => {
    updateItems(fetchedItems);
  }, []);

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col py-2">
      <div className="h-full w-full overflow-y-auto">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-2">
          {items.length > 0 ? (
            items.map((item) => <Item key={item._id.toString()} item={item} />)
          ) : (
            <div className="flex items-center w-full justify-center">
              <p className="text-z-foreground">Nothing to see here... yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const Item = ({ item }: { item: IItem }) => {
  const { title, author, thumbnail, placeholderCover } = item;

  return (
    <div className="flex flex-col border dark:border-neutral-700 rounded-md overflow-hidden shadow-md">
      <div className="w-full h-24">
        {thumbnail ? (
          <Image
            src={thumbnail || "/placeholder.svg"}
            alt={title}
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            style={{ ...noise }}
            className={`bg-[#${placeholderCover}] w-full h-full bg-noise`}
          />
        )}
      </div>
      <div className="grow flex flex-col p-2 text-z-background bg-z-background-secondary text-xs">
        <h3 className="text-z-foreground">{title}</h3>
        <p className="text-z-foreground-secondary">{author}</p>
      </div>
    </div>
  );
};

