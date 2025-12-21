'use client';

import { useEffect } from 'react';
import { useHomeContext } from '@/context/homeContext';
import { Item } from '@/components/item/itemBase';
import { IItem } from '@/interfaces/models';
import { Spinner } from '@/components/ui/spinner';

export default function ItemsContainer({ fetchedItems }: { fetchedItems: IItem[] }) {
  const { items, loadingItems, updateAllItems: updateItems } = useHomeContext();

  useEffect(() => {
    updateItems(fetchedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col pt-4">
      <div className="h-full w-full overflow-y-auto">
        {loadingItems ? (
          <div className="flex items-center justify-center w-full h-full pb-20">
            <Spinner className="size-6" />
          </div>
        ) : items.length > 0 ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-2">
            {items.map((item) => (
              <Item key={item._id.toString()} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full pb-20">
            <p className="text-z-foreground">Nothing to see here... yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
