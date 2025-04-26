'use client';

import { useCallback, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { IFolder } from '@/interfaces';
import { useToast } from '@/hooks/use-toast';
import { useHomeContext } from '@/context/homeContext';
import { useSidebar } from '@/components/ui/sidebar';
import { deleteFolder } from '@/actions/folder/deleteFolder';

interface DeleteFolderDialogProps {
  folder: IFolder;
  trigger: ReactNode;
}

export function DeleteFolderDialog({ folder, trigger }: DeleteFolderDialogProps) {
  const { toast } = useToast();
  const { currentFolder, changeOpenFolder } = useHomeContext();
  const { favoriteFolder, updateFavoriteFolder, deleteFolderLocally } = useSidebar();

  const onDelete = useCallback(async () => {
    try {
      const deletedFolder = await deleteFolder({
        folderID: folder._id.toString(),
        defaultFolderID: favoriteFolder
      });
      if (!deletedFolder) {
        toast({
          title: 'Something went wrong',
          description: "Couldn't find folder.",
          duration: 3000
        });
        return;
      }
      if (currentFolder?._id === folder._id) {
        changeOpenFolder(null);
      }
      if (favoriteFolder === folder._id.toString()) {
        updateFavoriteFolder(null);
      }
      deleteFolderLocally(folder);
      toast({
        title: 'Success',
        description: `Deleted ${folder.name}`,
        duration: 3000
      });
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `${error}`,
        duration: 3000
      });
    }
  }, [folder, favoriteFolder, currentFolder, changeOpenFolder, updateFavoriteFolder, deleteFolderLocally, toast]);

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
