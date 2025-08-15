import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
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

export function FormFieldPassword(props: Props) {
  const { control, id, name, label, placeholder, required, disabled } = props;

  const [showPassword, setShowPassword] = useState(false);

  const EyeIcon = showPassword ? EyeOff : Eye;
  const inputType = showPassword ? "text" : "password";
  const ariaLabel = showPassword ? "Senha visível" : "Senha oculta";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel htmlFor={id}>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                disabled={disabled}
                id={id}
                className="pl-10 pr-10 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500 h-11"
                type={inputType}
                aria-label={ariaLabel}
                placeholder={placeholder}
                required={required}
                {...field}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
                aria-label={ariaLabel}
                onClick={() => setShowPassword(!showPassword)}
              >
                <EyeIcon className="w-4 h-4 text-slate-400" />
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
