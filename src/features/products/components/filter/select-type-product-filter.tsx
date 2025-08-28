import { Label } from "@/components/ui/label";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  useProductFilterActions,
  useProductFilters,
} from "./filter-product-store";

export function SelectTypeProductFilter() {
  const { type } = useProductFilters();
  const { setFilterType } = useProductFilterActions();

  return (
    <div className="space-y-2">
      <Label>Tipo</Label>
      <Select
        value={type || "all"}
        onValueChange={(value) => setFilterType(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione um tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="PRODUCT">Produtos</SelectItem>
          <SelectItem value="SERVICE">Serviços</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
