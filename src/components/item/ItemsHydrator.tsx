'use client';

import { useEffect } from 'react';
import { IItem } from '@/interfaces/models';
import { useHomeContext } from '@/context/homeContext';

interface ItemsHydratorProps {
  items: IItem[];
}

/**
 * Component that hydrates the HomeContext with server-fetched items.
 * This allows client-side updates (add, delete, edit) to work properly.
 */
export function ItemsHydrator({ items }: ItemsHydratorProps) {
  const { updateAllItems } = useHomeContext();

  useEffect(() => {
    updateAllItems(items);
  }, [items, updateAllItems]);

  return null;
}
