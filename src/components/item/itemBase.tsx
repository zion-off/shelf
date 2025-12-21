'use client';

import { memo } from 'react';
import Image from 'next/image';
import type { IItem } from '@/interfaces/models';
import { ItemViewState } from '@/components/item/itemViewState';
import { ItemEditState } from '@/components/item/itemEditState';
import { useHomeContext } from '@/context/homeContext';
import { Drawer, DrawerTrigger, DrawerContent } from '@/components/ui/drawer';
import { noise } from '@/utils';

export const Item = memo(function Item({ item }: { item: IItem }) {
  const {
    drawerOpen,
    drawerDirection,
    handleDrawerOpenChange,
    handleSelectedItemChange,
    isEditing,
    handleEditingChange,
    selectedItem
  } = useHomeContext();

  const { title, author, thumbnail, placeholderCover } = item;
  const isThisItemSelected = selectedItem?._id === item._id;
  const isThisDrawerOpen = isThisItemSelected && drawerOpen;

  return (
    <Drawer
      direction={drawerDirection}
      open={isThisDrawerOpen}
      onOpenChange={(open) => {
        handleDrawerOpenChange(open);
        if (open) {
          handleSelectedItemChange(item);
          handleEditingChange(false);
        } else {
          if (isThisItemSelected) {
            handleSelectedItemChange(null);
          }
        }
      }}
    >
      <DrawerTrigger asChild>
        <div className="flex flex-col rounded-md overflow-hidden shadow-md cursor-pointer">
          <div className="w-full h-24">
            {thumbnail ? (
              <Image
                src={thumbnail || '/placeholder.svg'}
                alt={title}
                width={400}
                height={300}
                className="w-full h-full object-cover"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
                  `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect width="100%" height="100%" fill="#${placeholderCover}"/>
    </svg>
  `
                ).toString('base64')}`}
              />
            ) : (
              <div style={{ ...noise }} className={`bg-[#${placeholderCover}] w-full h-full bg-noise`} />
            )}
          </div>
          <div className="grow flex flex-col p-2 text-z-background bg-z-background-secondary text-xs">
            <h3 className="text-z-foreground truncate">{title}</h3>
            <p className="text-z-foreground-secondary">{author}</p>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="bg-z-background">{isEditing ? <ItemEditState /> : <ItemViewState />}</DrawerContent>
    </Drawer>
  );
});
