import { z } from "zod";
import { addItemForm } from "@/schema";

export type addItemFormValues = z.infer<typeof addItemForm>;