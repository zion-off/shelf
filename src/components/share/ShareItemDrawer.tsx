'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { ItemDrawerContent } from '@/components/item/ItemDrawerContent';
import { useDrawerDirection } from '@/hooks/useDrawerDirection';
import { useHomeContext } from '@/context/homeContext';
import { IItem } from '@/interfaces/models';
import { Spinner } from '@/components/ui/spinner';

interface ShareItemDrawerProps {
  folderId: string;
}

export function ShareItemDrawer({ folderId }: ShareItemDrawerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const drawerDirection = useDrawerDirection();
  const { items } = useHomeContext();
  const [item, setItem] = useState<IItem | null>(null);
  const [loading, setLoading] = useState(false);
  const lastItemIdRef = useRef<string | null>(null);

  const itemId = searchParams.get('item');
  const isOpen = !!itemId;

  useEffect(() => {
    if (itemId === lastItemIdRef.current) {
      return;
    }
    lastItemIdRef.current = itemId;

    if (!itemId) {
      setItem(null);
      return;
    }

    setLoading(true);
    const foundItem = items.find((i) => i._id.toString() === itemId);
    setItem(foundItem || null);
    setLoading(false);
  }, [itemId, items]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.push(`/share/${folderId}`, { scroll: false });
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
          <ItemDrawerContent item={item} folderId={folderId} readOnly />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-z-foreground-secondary">Item not found</p>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
