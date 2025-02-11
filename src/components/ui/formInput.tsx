import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormInputProps, CheckboxInputProps } from "@/interfaces/items";
import { FieldValues } from "react-hook-form";
import { Checkbox } from "@/components/ui/checbox";

export const FormInput = <T extends FieldValues>({
  formControl,
  name,
  placeholder,
}: FormInputProps<T>) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const CheckboxInput = <T extends FieldValues>({
  formControl,
  name,
  label,
}: CheckboxInputProps<T>) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row space-x-3 space-y-0 items-center px-1">
          <FormControl>
            <Checkbox defaultChecked checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel>{label}</FormLabel>
        </FormItem>
      )}
    />
  );
};
