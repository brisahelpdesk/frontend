import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Control } from "react-hook-form";

interface Props {
  label: string;
  placeholder: string;
  required?: boolean;
  id: string;
  name: string;
  control: Control<any>;
  disabled?: boolean;
}

export function FormFieldInput(props: Props) {
  const { control, id, name, label, placeholder, required, disabled } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              disabled={disabled}
              id={id}
              placeholder={placeholder}
              required={required}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
