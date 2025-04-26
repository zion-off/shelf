'use client';

import { useCallback, ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useSidebar } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/formInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { renameFolderFormValues } from '@/types/shelf';
import { renameFolderForm } from '@/schema';
import { IFolder } from '@/interfaces';
import { renameFolder } from '@/actions/folder/renameFolder';

interface RenameFolderDialogProps {
  folder: IFolder;
  trigger: ReactNode;
}

export function RenameFolderDialog({ folder, trigger }: RenameFolderDialogProps) {
  const { toast } = useToast();
  const { renameFolderLocally } = useSidebar();

  const form = useForm<renameFolderFormValues>({
    resolver: zodResolver(renameFolderForm),
    defaultValues: {
      name: ''
    }
  });

  const onSubmit = useCallback(
    async (value: renameFolderFormValues) => {
      try {
        const oldName = await renameFolder({
          _id: folder._id,
          name: value.name
        });
        if (oldName) {
          toast({
            title: 'Success',
            description: `Renamed ${oldName} to ${value.name}`,
            duration: 3000
          });
          renameFolderLocally(folder, value.name);
        } else {
          toast({
            title: 'Something went wrong',
            description: "Couldn't find folder.",
            duration: 3000
          });
        }
      } catch (error) {
        toast({
          title: 'Something went wrong',
          description: `${error}`,
          duration: 3000
        });
      }
    },
    [folder, renameFolderLocally, toast]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename {folder.name}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput formControl={form.control} name="name" placeholder="New name" />
            <div className="flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Rename
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
