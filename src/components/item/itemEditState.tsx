'use client';

import { useCallback } from 'react';
import { Types } from 'mongoose';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { editItemFormValues } from '@/types/shelf';
import { editItemForm } from '@/schema';
import { useHomeContext } from '@/context/homeContext';
import { DrawerHeader } from '@/components/ui/drawer';
import { Form } from '@/components/ui/form';
import { FormInput, FormTextareaInput, CheckboxInput } from '@/components/ui/formInput';
import { updateItem } from '@/actions/item/updateItem';

export const ItemEditState = () => {
  const { toast } = useToast();
  const { selectedItem: item, handleEditingChange, updateSelectedItem } = useHomeContext();

  const form = useForm<editItemFormValues>({
    resolver: zodResolver(editItemForm),
    defaultValues: {
      title: item?.title,
      author: item?.author,
      notes: item?.notes || '',
      link: item?.link || '',
      read: item?.read || false
    }
  });

  const onSubmit = useCallback(
    async (values: editItemFormValues) => {
      if (!item) return;

      try {
        const updatedItem = await updateItem({
          _id: new Types.ObjectId(item._id),
          ...values
        });
        if (!updatedItem) {
          toast({
            title: 'Error',
            description: "Couldn't find item.",
            duration: 3000
          });
        } else {
          updateSelectedItem(values);
          toast({
            title: 'Success',
            description: `Updated ${JSON.parse(updatedItem).title} successfully`,
            duration: 3000
          });
        }
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: `${error}`,
          duration: 3000
        });
      } finally {
        handleEditingChange(false);
        form.reset();
      }
    },
    [item, handleEditingChange, toast, form, updateSelectedItem]
  );

  if (!item) {
    return null;
  }

  return (
    <>
      <DrawerHeader>
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
        <form onSubmit={form.handleSubmit(onSubmit)} className={fieldListStyle}>
          <div className={fieldGroupStyle}>
            <FormInput formControl={form.control} name="title" placeholder="Title" label="Title" />
          </div>

          <div className={fieldGroupStyle}>
            <FormInput formControl={form.control} name="author" placeholder="Author" label="Author" />
          </div>

          <div className={fieldGroupStyle}>
            <FormTextareaInput
              formControl={form.control}
              name="link"
              label="Link"
              placeholder="https://example.com"
              className="resize-none"
            />
          </div>

          <div className={fieldGroupStyle}>
            <FormTextareaInput
              formControl={form.control}
              name="notes"
              label="Notes"
              placeholder="No thoughts recorded for this item."
              className="resize-none"
              rows={4}
            />
          </div>

          <div className="flex items-center space-x-2">
            <CheckboxInput formControl={form.control} name="read" label="Finished reading" />
          </div>
        </form>
      </Form>
    </>
  );
};

const fieldListStyle = `flex flex-col gap-8`;
const fieldGroupStyle = `flex flex-col gap-4`;
