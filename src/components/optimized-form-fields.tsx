import { memo } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormFieldInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

interface FormFieldSelectProps<T extends FieldValues> extends FormFieldInputProps<T> {
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

interface FormFieldTextAreaProps<T extends FieldValues> extends FormFieldInputProps<T> {
  rows?: number;
}

interface FormFieldSwitchProps<T extends FieldValues> extends Omit<FormFieldInputProps<T>, 'placeholder'> {
  description?: string;
}

// Memoized form field components for better performance
export const FormFieldInput = memo(function FormFieldInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
  className,
}: FormFieldInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              className={className}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});

export const FormFieldSelect = memo(function FormFieldSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
  disabled,
  className,
}: FormFieldSelectProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});

export const FormFieldTextArea = memo(function FormFieldTextArea<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
  className,
  rows = 3,
}: FormFieldTextAreaProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              className={className}
              rows={rows}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});

export const FormFieldSwitch = memo(function FormFieldSwitch<T extends FieldValues>({
  control,
  name,
  label,
  description,
  disabled,
  className,
}: FormFieldSwitchProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`flex flex-row items-center justify-between rounded-lg border p-4 ${className}`}>
          <div className="space-y-0.5">
            <FormLabel className="text-base">{label}</FormLabel>
            {description && (
              <div className="text-sm text-muted-foreground">
                {description}
              </div>
            )}
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
});