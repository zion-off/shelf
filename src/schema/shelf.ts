import { z } from "zod";

export const addItemForm = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(120, "Title must be less than 120 characters"),
  author: z
    .string()
    .min(1, "Author is required")
    .max(120, "Author must be less than 120 characters"),
  notes: z.string().optional(),
  link: z.string().url().optional().or(z.literal("")),
});

export const addFolderForm = z.object({
  name: z
    .string()
    .min(1, "Folder name is required")
    .max(60, "Folder name must be less than 60 characters"),
  isPublic: z.boolean(),
});

export const renameFolderForm = z.object({
  name: z
    .string()
    .min(1, "Folder name is required")
    .max(60, "Folder name must be less than 60 characters")
})

export const editItemForm = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(120, "Title must be less than 120 characters"),
  author: z
    .string()
    .min(1, "Author is required")
    .max(120, "Author must be less than 120 characters"),
  notes: z.string().optional(),
  link: z.string().url().optional().or(z.literal("")),
  read: z.boolean().default(false),
});