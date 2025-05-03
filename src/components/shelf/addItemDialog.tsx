'use client';

import { useState, ChangeEvent } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHomeContext } from '@/context/homeContext';
import { addItem } from '@/actions/item/addItem';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { addItemForm } from '@/schema';
import { addItemFormValues } from '@/types/shelf';
import { useCallback } from 'react';
import { Plus } from 'lucide-react';
import { FormInput } from '@/components/ui/formInput';

export default function AddItemDialog() {
  const { toast } = useToast();
  const { currentFolder } = useHomeContext();
  const { itemDialogOpen, toggleItemDialogOpen, saving, toggleSaving, addSingleItem } = useHomeContext();
  const [formValues, setFormValues] = useState({
    title: '',
    author: '',
    notes: '',
    link: ''
  });

  const form = useForm<addItemFormValues>({
    resolver: zodResolver(addItemForm),
    defaultValues: formValues
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));

    form.trigger(name as keyof addItemFormValues);
  };

  const onSubmit = useCallback(
    async (values: addItemFormValues) => {
      toggleSaving();
      try {
        const newItem = await addItem(values, currentFolder);
        toggleItemDialogOpen();
        form.reset();
        addSingleItem(newItem);
        toast({
          title: 'Success',
          description: `Added ${newItem.title} successfully`,
          duration: 3000
        });
      } catch (error) {
        toast({
          title: 'Something went wrong',
          description: `${error}`,
          duration: 3000
        });
      } finally {
        toggleSaving();
      }
    },
    [form, currentFolder, toggleItemDialogOpen, addSingleItem, toast, toggleSaving]
  );

  return (
    <Dialog open={itemDialogOpen} onOpenChange={toggleItemDialogOpen}>
      <DialogTrigger asChild className="w-11 p-2">
        <Plus
          size={'40px'}
          className="transition-colors shadow-sm stroke-[1.5px] bg-neutral-100 stroke-neutral-400 border border-input md:hover:border-z-component dark:bg-neutral-900 aspect-square rounded-md cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-z-background border-none">
        <DialogTitle className="text-z-foreground pb-2">Add a new item</DialogTitle>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              formControl={form.control}
              name="title"
              placeholder="Title"
              value={formValues.title}
              onChange={handleInputChange}
            />
            <FormInput
              formControl={form.control}
              name="author"
              placeholder="Author"
              value={formValues.author}
              onChange={handleInputChange}
            />
            <FormInput
              formControl={form.control}
              name="link"
              placeholder="https://..."
              value={formValues.link}
              onChange={handleInputChange}
            />
            <FormInput
              formControl={form.control}
              name="notes"
              placeholder="Notes"
              value={formValues.notes}
              onChange={handleInputChange}
            />
            <Button type="submit" className={`w-full ${saving ? 'animate-pulse' : ''}`} disabled={saving}>
              {saving ? 'Saving...' : 'Save changes'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
