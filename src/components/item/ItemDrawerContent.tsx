'use client';

import { useCallback } from 'react';
import { ExternalLink } from 'lucide-react';
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
    return <ItemEditContent item={item} />;
  }

  const { title, author, notes, link, read, created_at, last_modified } = item;

  const formatDate = (date: Date) =>
    new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

  return (
    <>
      <DrawerHeader>
        <DrawerTitle className="flex flex-col gap-5">
          {!readOnly && (
            <div className="cursor-pointer flex pb-2 w-full justify-between">
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
          {link ? (
            <Link
              href={link}
              target="_blank"
              className="inline-flex items-start gap-2 break-words hover:underline underline-offset-2"
            >
              <span className="break-words">{title}</span>
              <ExternalLink className="size-3.5 shrink-0 mt-1 text-muted-foreground" />
            </Link>
          ) : (
            <p className="break-words">{title}</p>
          )}
        </DrawerTitle>
        <DrawerDescription className="flex items-center gap-2">
          <span>{author}</span>
          {read && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-sm bg-z-background-secondary text-z-foreground-secondary uppercase tracking-wide">
              Read
            </span>
          )}
        </DrawerDescription>
      </DrawerHeader>
      <div className="flex flex-col gap-8 pb-24">
        <div>
          <label className="text-z-foreground">Notes</label>
          <p className={`${notes ? `text-z-foreground-secondary md:truncate` : `text-muted-foreground`}`}>
            {notes || 'No thoughts recorded for this item.'}
          </p>
        </div>

        <p className="text-xs text-muted-foreground">
          Added {formatDate(created_at)}
          {last_modified && last_modified !== created_at && <> · edited {formatDate(last_modified)}</>}
        </p>
      </div>
    </>
  );
}
