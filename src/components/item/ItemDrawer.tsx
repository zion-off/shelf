'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { ItemDrawerContent } from '@/components/item/ItemDrawerContent';
import { useDrawerDirection } from '@/hooks/useDrawerDirection';
import { useHomeContext } from '@/context/homeContext';
import { getItemById } from '@/actions/item/getItemById';
import { IItem } from '@/interfaces/models';
import { Spinner } from '@/components/ui/spinner';

export function ItemDrawer() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const drawerDirection = useDrawerDirection();
  const { items, handleEditingChange } = useHomeContext();
  const [fetchedItem, setFetchedItem] = useState<IItem | null>(null);
  const [loading, setLoading] = useState(false);
  const lastItemIdRef = useRef<string | null>(null);

  const folderId = params.folderId as string;
  const itemId = searchParams.get('item');
  const isOpen = !!itemId;

  const localItem = itemId ? (items.find((i) => i._id.toString() === itemId) ?? null) : null;
  const item = localItem ?? fetchedItem;

  useEffect(() => {
    if (itemId === lastItemIdRef.current) return;
    lastItemIdRef.current = itemId;

    if (!itemId) {
      setFetchedItem(null);
      return;
    }

    handleEditingChange(false);

    if (localItem) return;

    setLoading(true);
    getItemById({ itemId }).then((result) => {
      setFetchedItem(result);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId, localItem]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.push(`/folder/${folderId}`, { scroll: false });
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Drawer direction={drawerDirection} open={true} onOpenChange={handleOpenChange}>
      <DrawerContent className="bg-z-background">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Spinner className="size-6" />
          </div>
        ) : item ? (
          <ItemDrawerContent item={item} folderId={folderId} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-z-foreground-secondary">Item not found</p>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
