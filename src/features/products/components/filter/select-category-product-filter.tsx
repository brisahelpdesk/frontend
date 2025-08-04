import { Label } from "@/components/ui/label";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useFetchCategories } from "../../hook/use-fetch-categories";
import {
  useProductFilterActions,
  useProductFilters,
} from "./filter-product-store";

export function SelectCategoryProductFilter() {
  const { data } = useFetchCategories();
  const { categoryId } = useProductFilters();
  const { setFilterCategoryId } = useProductFilterActions();

  return (
    <div className="space-y-2">
      <Label htmlFor="category">Categoria</Label>
      <Select
        value={categoryId || "all"}
        onValueChange={(value) => setFilterCategoryId(value)}
      >
        <SelectTrigger id="category" className="w-full">
          <SelectValue placeholder="Selecione uma categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          {data?.map(({ name, id }) => (
            <SelectItem key={id + "-category"} value={id.toString()}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
