import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import type { ComponentProps } from "react";

export function SearchProductName(props: ComponentProps<"input">) {
  return (
    <div className="space-y-2">
      <Label>Buscar</Label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar por nome ou descrição..."
          className="pl-10"
          {...props}
          type="search"
        />
      </div>
    </div>
  );
}
