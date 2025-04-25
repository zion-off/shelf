import { z } from "zod";
import { addItemForm, addFolderForm, editItemForm } from "@/schema";

export type addItemFormValues = z.infer<typeof addItemForm>;

export type addFolderFormValues = z.infer<typeof addFolderForm>;

export type editItemFormValues = z.infer<typeof editItemForm>;