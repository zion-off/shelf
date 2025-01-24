import { z } from "zod";
import { addItemForm, addFolderForm } from "@/schema";

export type addItemFormValues = z.infer<typeof addItemForm>;

export type addFolderFormValues = z.infer<typeof addFolderForm>;
