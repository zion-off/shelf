'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useHomeContext } from '@/context/homeContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { deleteItem } from '@/actions/item/deleteItem';

export const ItemViewState = () => {
  const { toast } = useToast();
  const { handleEditingChange, selectedItem: item, deleteSelectedItem, handleDrawerOpenChange } = useHomeContext();

  const handleDelete = useCallback(async () => {
    if (!item) return;

    try {
      const deletedItem = await deleteItem({ _id: item._id });
      if (!deletedItem) {
        toast({
          title: 'Error',
          description: "Couldn't find item.",
          duration: 3000
        });
      } else {
        toast({
          title: 'Success',
          description: `Deleted ${JSON.parse(deletedItem).title} successfully`,
          duration: 3000
        });
        deleteSelectedItem();
        handleDrawerOpenChange(false);
      }
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        duration: 3000
      });
    } finally {
      handleEditingChange(false);
    }
  }, [item, handleEditingChange, toast, deleteSelectedItem]);

  if (!item) {
    return null;
  }

  const { title, author, notes, link, read, created_at, last_modified } = item;

  return (
    <>
      <DrawerHeader>
        <DrawerTitle>
          <div className="flex justify-between">
            {title}
            <div className="cursor-pointer">
              <span className="px-1" onClick={() => handleEditingChange(true)}>
                📝
              </span>
              <Popover modal={true}>
                <span className="px-1">
                  <PopoverTrigger>🗑️</PopoverTrigger>
                </span>
                <PopoverContent className="m-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Delete this item?</span>
                    <Button size="sm" variant="destructive" className="py-2 w-20" onClick={handleDelete}>
                      Yes
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </DrawerTitle>
        <DrawerDescription>{author}</DrawerDescription>
      </DrawerHeader>
      <div className={fieldListStyle}>
        <div>
          <label className="text-z-foreground">Notes</label>
          <p className={`${notes ? `text-z-foreground-secondary` : `text-muted-foreground`}`}>
            {notes || 'No thoughts recoreded for this item.'}
          </p>
        </div>

        <div>
          {link && (
            <>
              <label className="text-z-foreground">Link</label>
              <div>
                <Link href={link} target="_blank" className="text-muted-foreground hover:underline">
                  {link}
                </Link>
              </div>
            </>
          )}
        </div>

        <div>
          <label className="text-z-foreground">Created at</label>
          <p className="text-muted-foreground">
            {new Date(created_at).toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}
          </p>
        </div>
        <div>
          <label className="text-z-foreground">Last modified</label>
          <p className="text-muted-foreground">
            {new Date(last_modified).toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}
          </p>
        </div>
        <div>
          <label className="text-z-foreground">Finished reading</label>
          <p className="text-muted-foreground">{read ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </>
  );
};

const fieldListStyle = `flex flex-col gap-8`;
