import { Eye, EyeOff, Lock } from "lucide-react";
import { useState, type ComponentProps } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function InputPassword(props: Omit<ComponentProps<"input">, "type">) {
  const [showPassword, setShowPassword] = useState(false);

  const EyeIcon = showPassword ? EyeOff : Eye;
  const inputType = showPassword ? "text" : "password";
  const ariaLabel = showPassword ? "Senha visível" : "Senha oculta";

  return (
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
      <Input
        className="pl-10 pr-10 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500 h-11"
        type={inputType}
        aria-label={ariaLabel}
        {...props}
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
  );
}
