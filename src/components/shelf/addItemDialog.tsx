"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHomeContext } from "@/context/homeContext";
import { addItem } from "@/actions/item";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { addItemForm } from "@/schema";
import { addItemFormValues } from "@/types/shelf";
import { FormInputProps } from "@/interfaces/items";
import { useCallback } from "react";
import { Plus } from "lucide-react";

export default function AddItemDialog() {
  const { toast } = useToast();

  const { dialogOpen, toggleDialogOpen, saving, toggleSaving, addSingleItem } =
    useHomeContext();

  const form = useForm<addItemFormValues>({
    resolver: zodResolver(addItemForm),
    defaultValues: {
      title: "",
      author: "",
      notes: "",
      link: "",
    },
  });

  const onSubmit = useCallback(
    async (values: addItemFormValues) => {
      toggleSaving();
      try {
        const newItem = await addItem(values);
        toggleDialogOpen();
        form.reset();
        addSingleItem(newItem);
        toast({
          title: "Success",
          description: "Item added successfully",
          duration: 3000,
        });
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: "Couldn't add item. Try again later?",
          duration: 3000,
        });
      } finally {
        toggleSaving();
      }
    },
    [form]
  );

  return (
    <Dialog open={dialogOpen} onOpenChange={toggleDialogOpen}>
      <DialogTrigger asChild className="w-11 p-2">
        <Plus
          size={"40px"}
          className="transition-colors shadow-sm stroke-[1.5px] bg-neutral-100 stroke-neutral-400 border border-input md:hover:border-z-component dark:bg-neutral-900 aspect-square rounded-md cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-z-background border-none">
        <DialogHeader>
          <DialogTitle className="text-z-foreground">
            Add a new item
          </DialogTitle>
          <DialogDescription>Add a new item to your shelf</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              formControl={form.control}
              name="title"
              placeholder="Title"
            />
            <FormInput
              formControl={form.control}
              name="author"
              placeholder="Author"
            />
            <FormInput
              formControl={form.control}
              name="link"
              placeholder="https://..."
            />
            <FormInput
              formControl={form.control}
              name="notes"
              placeholder="Notes"
            />
            <Button
              type="submit"
              className={`w-full ${saving ? "animate-pulse" : ""}`}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

const FormInput = ({ formControl, name, placeholder }: FormInputProps) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
