import type { Control } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import type { ComponentProps } from "react";
import { Textarea } from "./ui/textarea";

interface Props extends ComponentProps<"textarea"> {
  control: Control<any>;
  name: string;
  label?: string;
  description?: string;
  showError?: boolean;
  required?: boolean;
}

export function FormFieldTextArea(props: Props) {
  const { control, name, label, description, showError, ...rest } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea
              {...rest}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {showError && <FormMessage />}
        </FormItem>
      )}
    />
  );
}
