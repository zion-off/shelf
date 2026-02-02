'use client';

import { useEffect, useState, useRef } from 'react';
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
  const [item, setItem] = useState<IItem | null>(null);
  const [loading, setLoading] = useState(false);
  const lastItemIdRef = useRef<string | null>(null);

  const folderId = params.folderId as string;
  const itemId = searchParams.get('item');
  const isOpen = !!itemId;

  // Handle item loading and editing state reset
  useEffect(() => {
    // Skip if itemId hasn't changed
    if (itemId === lastItemIdRef.current) {
      return;
    }
    lastItemIdRef.current = itemId;

    if (!itemId) {
      setItem(null);
      return;
    }

    // Reset editing state when opening a new item
    handleEditingChange(false);

    // First try to find the item in the local state (for faster rendering)
    const localItem = items.find((i) => i._id.toString() === itemId);
    if (localItem) {
      setItem(localItem);
      setLoading(false);
      return;
    }

    // Otherwise fetch from server
    setLoading(true);
    getItemById({ itemId }).then((fetchedItem) => {
      setItem(fetchedItem);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId, items]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Remove the item query param to close the drawer
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
