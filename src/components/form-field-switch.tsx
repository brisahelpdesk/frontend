import type { SwitchProps } from "@radix-ui/react-switch";
import type { Control } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "./ui/form";
import { Switch } from "./ui/switch";

interface Props extends SwitchProps {
  label: string;
  description?: string;
  required?: boolean;
  id: string;
  name: string;
  control: Control<any>;
}

export function FormFieldSwitch(props: Props) {
  const { control, id, name, label, description, required, ...rest } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-0.5">
            <FormLabel htmlFor={id}>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-readonly
              id={id}
              {...rest}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
