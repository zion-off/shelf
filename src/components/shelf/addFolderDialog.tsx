"use client";

import { useCallback } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHomeContext } from "@/context/homeContext";
import { useSidebar } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { addFolderForm } from "@/schema";
import { addFolderFormValues } from "@/types/shelf";
import { FormInput } from "@/components/ui/formInput";
import { CheckboxInput } from "@/components/ui/formInput";
import { addFolder } from "@/actions/folder";

export default function AddFolderDialog() {
  const { toast } = useToast();

  const { folderDialogOpen, toggleFolderDialogOpen, saving, toggleSaving } =
    useHomeContext();

  const { addSingleFolder } = useSidebar();

  const form = useForm<addFolderFormValues>({
    resolver: zodResolver(addFolderForm),
    defaultValues: {
      name: "",
      isPublic: true,
    },
  });

  const onSubmit = useCallback(
    async (values: addFolderFormValues) => {
      toggleSaving();
      try {
        const newItem = await addFolder(values);
        toggleFolderDialogOpen();
        form.reset();
        addSingleFolder(newItem);
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
          <DialogTitle className="text-z-foreground pb-2">
            Create a new folder
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              formControl={form.control}
              name="name"
              placeholder="Folder name"
            />

            <CheckboxInput
              name="isPublic"
              formControl={form.control}
              label="Public folder"
            />

            <div className="flex w-full gap-2">
              <Button
                variant="secondary"
                className="basis-1/2"
                type="reset"
                onClick={toggleFolderDialogOpen}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className={`basis-1/2 ${saving ? "animate-pulse" : ""}`}
                disabled={saving}
              >
                {saving ? "Adding..." : "Add"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
