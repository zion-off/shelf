'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IItem } from '@/interfaces/models';
import { useHomeContext } from '@/context/homeContext';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { deleteItem } from '@/actions/item/deleteItem';
import { ItemEditContent } from './ItemEditContent';

interface ItemDrawerContentProps {
  item: IItem;
  folderId: string;
  readOnly?: boolean;
}

export function ItemDrawerContent({ item, folderId, readOnly = false }: ItemDrawerContentProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { isEditing, handleEditingChange, deleteItemFromList } = useHomeContext();

  const handleDelete = useCallback(async () => {
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
        deleteItemFromList(item._id.toString());
        router.push(`/folder/${folderId}`, { scroll: false });
      }
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `${error}`,
        duration: 3000
      });
    }
  }, [item, toast, deleteItemFromList, router, folderId]);

  if (isEditing) {
    return <ItemEditContent item={item} folderId={folderId} />;
  }

  const { title, author, notes, link, read, created_at, last_modified } = item;

  return (
    <>
      <DrawerHeader>
        <DrawerTitle className="flex flex-col gap-5">
          {!readOnly && (
            <div className="cursor-pointer flex gap-1 w-full justify-end">
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
          )}
          <p className="break-words">{title}</p>
        </DrawerTitle>
        <DrawerDescription>{author}</DrawerDescription>
      </DrawerHeader>
      <div className="flex flex-col gap-8 pb-24">
        <div>
          <label className="text-z-foreground">Notes</label>
          <p className={`${notes ? `text-z-foreground-secondary md:truncate` : `text-muted-foreground`}`}>
            {notes || 'No thoughts recorded for this item.'}
          </p>
        </div>

        {link && (
          <div className="max-w-full break-words">
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
}
