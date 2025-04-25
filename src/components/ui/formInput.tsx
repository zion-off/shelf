import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FieldValues } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checbox';
import { FormInputProps, CheckboxInputProps, TextareaInputProps } from '@/interfaces/items';
import { FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';

export const FormInput = <T extends FieldValues>({ formControl, name, placeholder, label }: FormInputProps<T>) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const FormTextareaInput = <T extends FieldValues>({
  formControl,
  name,
  placeholder,
  rows = 4,
  label,
  ...props
}: TextareaInputProps<T>) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea placeholder={placeholder} rows={rows} {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const CheckboxInput = <T extends FieldValues>({ formControl, name, label }: CheckboxInputProps<T>) => {
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
