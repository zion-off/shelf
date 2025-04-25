'use client';

import Image from 'next/image';
import { IItem } from '@/interfaces/models';
import { ItemViewState } from '@/components/item/itemViewState';
import { ItemEditState } from '@/components/item/itemEditState';
import { useHomeContext } from '@/context/homeContext';
import { Drawer, DrawerTrigger, DrawerContent } from '@/components/ui/drawer';
import { noise } from '@/utils';

export const Item = ({ item }: { item: IItem }) => {
  const { drawerOpen, handleDrawerOpenChange, handleSelectedItemChange, isEditing, handleEditingChange } =
    useHomeContext();
  const { title, author, thumbnail, placeholderCover } = item;

  return (
    <Drawer
      open={drawerOpen}
      onOpenChange={(open) => {
        handleDrawerOpenChange(open);
        if (open) {
          handleSelectedItemChange(item);
          handleEditingChange(false);
        } else {
          handleSelectedItemChange(null);
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
              />
            ) : (
              <div style={{ ...noise }} className={`bg-[#${placeholderCover}] w-full h-full bg-noise`} />
            )}
          </div>
          <div className="grow flex flex-col p-2 text-z-background bg-z-background-secondary text-xs">
            <h3 className="text-z-foreground">{title}</h3>
            <p className="text-z-foreground-secondary">{author}</p>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="bg-z-background">{isEditing ? <ItemEditState /> : <ItemViewState />}</DrawerContent>
    </Drawer>
  );
};
