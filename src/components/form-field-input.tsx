import type { Control } from "node_modules/react-hook-form/dist/types/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props {
  label: string;
  placeholder: string;
  required?: boolean;
  id: string;
  name: string;
  control: Control<any>;
}

export function FormFieldInput(props: Props) {
  const { control, id, name, label, placeholder, required } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
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
