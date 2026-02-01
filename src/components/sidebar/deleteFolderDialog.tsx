'use client';

import { useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { IFolder } from '@/interfaces';
import { useToast } from '@/hooks/use-toast';
import { deleteFolder } from '@/actions/folder/deleteFolder';

interface DeleteFolderDialogProps {
  folder: IFolder;
  trigger: ReactNode;
  favoriteId: string | null;
}

export function DeleteFolderDialog({ folder, trigger, favoriteId }: DeleteFolderDialogProps) {
  const { toast } = useToast();
  const router = useRouter();

  const onDelete = useCallback(async () => {
    try {
      const deletedFolder = await deleteFolder({
        folderID: folder._id.toString(),
        defaultFolderID: favoriteId
      });
      if (!deletedFolder) {
        toast({
          title: 'Something went wrong',
          description: "Couldn't find folder.",
          duration: 3000
        });
        return;
      }
      toast({
        title: 'Success',
        description: `Deleted ${folder.name}`,
        duration: 3000
      });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `${error}`,
        duration: 3000
      });
    }
  }, [folder, favoriteId, router, toast]);

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {folder.name}?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            This action cannot be undone. All items in this folder will be deleted. Are you sure?
          </p>
          <Button className="w-fit self-end border-none" onClick={onDelete}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
