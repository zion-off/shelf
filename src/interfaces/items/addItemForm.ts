import { addItemFormValues } from "@/types/shelf";
import { Control, FieldValues } from "react-hook-form";

export interface FormInputProps {
  formControl: Control<addItemFormValues> | undefined;
  name: "title" | "author" | "notes" | "link";
  placeholder: string;
}
