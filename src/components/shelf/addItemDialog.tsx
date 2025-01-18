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

  async function onSubmit(values: addItemFormValues) {
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
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={toggleDialogOpen}>
      <DialogTrigger asChild>
        <Button>Add</Button>
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
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Author" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Notes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
