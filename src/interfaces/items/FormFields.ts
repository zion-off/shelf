import { ChangeEvent } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

export interface FormInputProps<T extends FieldValues> {
  formControl: Control<T>;
  name: Path<T>;
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckboxInputProps<T extends FieldValues> {
  formControl: Control<T> | undefined;
  name: Path<T>;
  label: string;
}

export interface TextareaInputProps<T extends FieldValues> {
  formControl: Control<T> | undefined;
  name: Path<T>;
  placeholder: string;
  rows?: number;
  label?: string;
  className?: string;
}