import { Button } from "@/components/ui/button";
import { useProductFilterActions } from "./filter-product-store";

export function ButtonResetFilter() {
  const { resetFilter } = useProductFilterActions();

  return (
    <Button
      variant="outline"
      size="sm"
      className="text-slate-600 hover:bg-slate-50"
      type="reset"
      onClick={resetFilter}
    >
      Limpar Filtros
    </Button>
  );
}
