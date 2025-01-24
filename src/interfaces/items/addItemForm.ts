import { Control, FieldValues, Path } from "react-hook-form";

export interface FormInputProps<T extends FieldValues> {
  formControl: Control<T> | undefined;
  name: Path<T>;
  placeholder: string;
}

export interface CheckboxInputProps<T extends FieldValues> {
  formControl: Control<T> | undefined;
  name: Path<T>;
  label: string;
}
