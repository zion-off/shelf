'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Types } from 'mongoose';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { editItemFormValues } from '@/types/shelf';
import { editItemForm } from '@/schema';
import { useHomeContext } from '@/context/homeContext';
import { useSidebar } from '@/components/ui/sidebar';
import { DrawerHeader } from '@/components/ui/drawer';
import { Form } from '@/components/ui/form';
import { FormInput, FormTextareaInput, CheckboxInput, FormDropdownInput } from '@/components/ui/formInput';
import { updateItem } from '@/actions/item/updateItem';
import { IItem } from '@/interfaces/models';
import { folderIdToSlug } from '@/lib/folderUtils';

interface EditFolderOptions {
  label: string;
  value: string | null;
}

interface ItemEditContentProps {
  item: IItem;
  folderId: string;
}

export function ItemEditContent({ item, folderId }: ItemEditContentProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { handleEditingChange, updateItemInList, deleteItemFromList } = useHomeContext();
  const { folderState } = useSidebar();

  const options: EditFolderOptions[] = folderState.map((folder) => {
    return {
      label: folder.name,
      value: folder._id ? folder._id.toString() : null
    };
  });

  options.push({
    label: 'Ungrouped',
    value: null
  });

  const form = useForm<editItemFormValues>({
    resolver: zodResolver(editItemForm),
    defaultValues: {
      title: item?.title,
      author: item?.author,
      notes: item?.notes || '',
      link: item?.link || '',
      read: item?.read || false,
      in_folder: item?.in_folder ? new Types.ObjectId(item.in_folder).toString() : null
    }
  });

  const onSubmit = useCallback(
    async (values: editItemFormValues) => {
      try {
        const updatedItem = await updateItem({
          _id: item._id.toString(),
          ...values,
          in_folder: values.in_folder ?? null
        });
        if (!updatedItem) {
          toast({
            title: 'Error',
            description: "Couldn't find item.",
            duration: 3000
          });
        } else {
          const currentFolderId = item.in_folder?.toString() ?? null;
          const newFolderId = values.in_folder ?? null;

          // If folder changed, remove from current list and navigate to new folder
          if (currentFolderId !== newFolderId) {
            deleteItemFromList(item._id.toString());
            router.push(`/folder/${folderIdToSlug(newFolderId)}?item=${item._id}`);
          } else {
            updateItemInList(item._id.toString(), values);
          }

          toast({
            title: 'Success',
            description: `Updated ${JSON.parse(updatedItem).title} successfully`,
            duration: 3000
          });
        }
      } catch (error) {
        toast({
          title: 'Something went wrong',
          description: `${error}`,
          duration: 3000
        });
      } finally {
        handleEditingChange(false);
        form.reset();
      }
    },
    [item, handleEditingChange, toast, form, updateItemInList, deleteItemFromList, router]
  );

  return (
    <>
      <DrawerHeader className="py-0 md:pt-10 mb-5 md:mb-10">
        <div className="cursor-pointer text-sm font-normal">
          <span className="pr-4 text-green-500" onClick={form.handleSubmit(onSubmit)}>
            Save
          </span>
          <span className="pr-4 text-neutral-500" onClick={() => handleEditingChange(false)}>
            Cancel
          </span>
        </div>
      </DrawerHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 pb-8 md:gap-8 md:pb-24">
          <div className="flex flex-col md:gap-4">
            <FormInput formControl={form.control} name="title" placeholder="Title" label="Title" />
          </div>

          <div className="flex flex-col md:gap-4">
            <FormInput formControl={form.control} name="author" placeholder="Author" label="Author" />
          </div>

          <div className="flex flex-col md:gap-4">
            <FormTextareaInput
              formControl={form.control}
              name="link"
              label="Link"
              placeholder="https://example.com"
              className="resize-none"
              rows={typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 2}
            />
          </div>

          <div className="flex flex-col md:gap-4">
            <FormTextareaInput
              formControl={form.control}
              name="notes"
              label="Notes"
              placeholder="No thoughts recorded for this item."
              className="resize-none"
              rows={4}
            />
          </div>

          <div className="flex flex-col md:gap-4">
            <FormDropdownInput
              formControl={form.control}
              name="in_folder"
              label="In folder"
              placeholder="Select"
              options={options}
            />
          </div>

          <div className="flex items-center space-x-2">
            <CheckboxInput formControl={form.control} name="read" label="Finished reading" />
          </div>
        </form>
      </Form>
    </>
  );
}
