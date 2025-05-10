'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { useHomeContext } from '@/context/homeContext';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
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
        description: `${error}`,
        duration: 3000
      });
    }
  }, [item, toast, deleteSelectedItem, handleDrawerOpenChange]);

  if (!item) {
    return null;
  }

  const { title, author, notes, link, read, created_at, last_modified } = item;

  return (
    <>
      <DrawerHeader>
        <DrawerTitle className="flex justify-between">
          <p className="md:w-10/12">{title}</p>
          <div className="cursor-pointer">
            <span className="px-1" onClick={() => handleEditingChange(true)}>
              📝
            </span>
            <span
              className="px-1"
              onClick={() => {
                toast({
                  description: 'Are you sure?',
                  action: (
                    <ToastAction
                      altText="Delete"
                      className="border-z-component-border bg-z-destructive hover:bg-z-destructive-hover text-white"
                      onClick={() => {
                        handleDelete();
                      }}
                    >
                      Delete
                    </ToastAction>
                  ),
                  duration: 3000
                });
              }}
            >
              🗑️
            </span>
          </div>
        </DrawerTitle>
        <DrawerDescription>{author}</DrawerDescription>
      </DrawerHeader>
      <div className={fieldListStyle}>
        <div>
          <label className="text-z-foreground">Notes</label>
          <p className={`${notes ? `text-z-foreground-secondary md:truncate` : `text-muted-foreground`}`}>
            {notes || 'No thoughts recoreded for this item.'}
          </p>
        </div>

        {link && (
          <div>
            <label className="text-z-foreground">Link</label>
            <div>
              <Link href={link} target="_blank" className="text-muted-foreground hover:underline">
                {link}
              </Link>
            </div>
          </div>
        )}

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

const fieldListStyle = `flex flex-col gap-8 pb-24`;
