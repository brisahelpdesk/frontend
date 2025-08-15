import type { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { type SelectProps } from "@radix-ui/react-select";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select";

export interface FormFieldSelectProps extends SelectProps {
  control: Control<any>;
  selectItems: { value: string; label: string }[];
  name: string;
  id?: string;
  label?: string;
  description?: string;
  showError?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export function FormFieldSelect(props: FormFieldSelectProps) {
  const {
    control,
    selectItems,
    name,
    id,
    placeholder,
    label,
    description,
    showError,
    disabled,
    ...rest
  } = props;

  const items = selectItems.map((item) => (
    <SelectItem key={item.value} value={item.value}>
      {item.label}
    </SelectItem>
  ));

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full flex flex-col">
          {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
          <Select
            onValueChange={field.onChange}
            value={field.value}
            {...rest}
          >
            <FormControl>
              <SelectTrigger disabled={disabled} id={id} className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{items}</SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          {showError && <FormMessage />}
        </FormItem>
      )}
    />
  );
}
