import type { SelectProps } from "@radix-ui/react-select";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

export function SelectProductType(props: SelectProps) {
  return (
    <div className="space-y-2">
      <Label>Tipo</Label>
      <Select {...props} defaultValue="all">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Todos os tipos" />
        </SelectTrigger>
        <SelectContent>
          {props.children}
          <SelectItem value="product">Produtos</SelectItem>
          <SelectItem value="service">Serviços</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
