"use client";

import { useCallback } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHomeContext } from "@/context/homeContext";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { addFolderForm } from "@/schema";
import { addFolderFormValues } from "@/types/shelf";
import { FormInput } from "@/components/ui/formInput";

export default function AddFolderDialog() {
  const { toast } = useToast();

  const {
    folderDialogOpen,
    toggleFolderDialogOpen,
    saving,
    toggleSaving,
    addSingleItem,
  } = useHomeContext();

  const form = useForm<addFolderFormValues>({
    resolver: zodResolver(addFolderForm),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = useCallback(
    async (values: addFolderFormValues) => {
      toggleSaving();
      try {
        // const newItem = await addItem(values);
        toggleFolderDialogOpen();
        form.reset();
        // addSingleItem(newItem);
        toast({
          title: "Success",
          description: "Folder created successfully",
          duration: 3000,
        });
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: "Couldn't create folder. Try again later?",
          duration: 3000,
        });
      } finally {
        toggleSaving();
      }
    },
    [form]
  );

  return (
    <Dialog open={folderDialogOpen} onOpenChange={toggleFolderDialogOpen}>
      <DialogTrigger asChild>
        <Plus className="p-1 size-6 transition-colors shadow-sm  hover:bg-neutral-200 stroke-neutral-400 dark:hover:bg-neutral-900 aspect-square rounded-md cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-z-background border-none">
        <DialogHeader>
          <DialogTitle className="text-z-foreground">
            Create a new folder
          </DialogTitle>
          <DialogDescription>Create a new folder in your shelf</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              formControl={form.control}
              name="name"
              placeholder="Name"
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
