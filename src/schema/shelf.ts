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
