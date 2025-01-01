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
import { useState } from "react";
import { useShelfContext } from "@/context/shelfContext";
import { addItem } from "@/actions";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(50, "Title must be less than 50 characters"),
  author: z.string().min(1, "Author is required").max(50, "Author must be less than 50 characters"),
  notes: z.string().optional(),
  link: z.string().url().optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

function AddItemDialog() {
  const { dialogOpen, toggleDialogOpen } = useShelfContext();
  const [saving, setSaving] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      notes: "",
      link: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setSaving(true);
    try {
      await addItem(values);
      toggleDialogOpen();
      form.reset();
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
      setSaving(false);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={toggleDialogOpen}>
      <DialogTrigger asChild>
        <Button>Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-z-background border-none">
        <DialogHeader>
          <DialogTitle className="text-z-foreground">Add a new item</DialogTitle>
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

export default function ShelfHeader() {
  return (
    <nav className="h-fit bg-green-500 w-full flex justify-between">
      <p>search</p>
      <AddItemDialog />
    </nav>
  );
}