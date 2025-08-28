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

export function SelectActiveProductFilter() {
  const { isActive } = useProductFilters();
  const { setFilterIsActive } = useProductFilterActions();

  return (
    <div className="space-y-2">
      <Label>Status</Label>
      <Select
        value={isActive || "all"}
        onValueChange={(value) => setFilterIsActive(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione um status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="TRUE">Ativos</SelectItem>
          <SelectItem value="FALSE">Inativos</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
