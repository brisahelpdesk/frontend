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

export function SelectPhysicalProductFilter() {
  const { isPhysical } = useProductFilters();
  const { setFilterIsPhysical } = useProductFilterActions();

  return (
    <div className="space-y-2">
      <Label>Físico</Label>
      <Select
        value={isPhysical || "all"}
        onValueChange={(value) => setFilterIsPhysical(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione uma opção" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="TRUE">Físico</SelectItem>
          <SelectItem value="FALSE">Não Físico</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
