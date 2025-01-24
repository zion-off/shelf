import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormInputProps } from "@/interfaces/items";
import { FieldValues } from "react-hook-form";

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
