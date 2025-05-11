import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FieldValues } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checbox';
import { FormInputProps, CheckboxInputProps, TextareaInputProps, DropdownInputProps } from '@/interfaces/items';
import { FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export const FormInput = <T extends FieldValues>({
  formControl,
  name,
  placeholder,
  label,
  value,
  onChange
}: FormInputProps<T>) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              value={value !== undefined ? value : field.value}
              onChange={(e) => {
                field.onChange(e);
                if (onChange) onChange(e);
              }}
            />
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

export const FormDropdownInput = <T extends FieldValues>({
  formControl,
  name,
  label,
  placeholder,
  options
}: DropdownInputProps<T>) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full items-center space-y-0 justify-between">
          {label && <FormLabel >{label}</FormLabel>}
          <FormControl>
            <DropdownMenu>
              <DropdownMenuTrigger className="transition-all fade-in-10 fade-out-10 flex items-center justify-between px-3 py-2 border border-z-background rounded-md text-sm hover:border-z-component-border">
                {field.value
                  ? options.find((opt) => String(opt.value) === String(field.value))?.label
                  : placeholder || 'Select...'}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {options.map((option) => (
                  <DropdownMenuItem key={option.label + Math.random()} onClick={() => field.onChange(option.value)}>
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
