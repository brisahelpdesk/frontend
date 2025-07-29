import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SelectProductType } from "./select-product-type";
import { SelectProductStatus } from "./select-product-status";
import { SelectCategory } from "./select-product-category";
import { SearchProductName } from "./search-product-name";
import { SelectItem } from "@/components/ui/select";
import { useProductFilter } from "../hook/use-product-filter";

export function ProductFilter() {
  const { filters, handleFilterChange, handleFilterReset } = useProductFilter();

  return (
    <Card className="mt-6 shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-[6px]">
            <CardTitle>Filtros</CardTitle>
            <CardDescription>
              Use os filtros para encontrar produtos e serviços específicos
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-slate-600 hover:bg-slate-50"
            type="reset"
            onClick={handleFilterReset}
          >
            Limpar Filtros
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SearchProductName
            value={filters.name ? filters.name : ""}
            onChange={(e) => handleFilterChange("name", e.target.value)}
          />
          <SelectCategory
            value={filters.category ? filters.category : "all"}
            onValueChange={(value) => handleFilterChange("category", value)}
          >
            <SelectItem value="all">Todas as categorias</SelectItem>
          </SelectCategory>

          <SelectProductType
            value={filters.type ? filters.type : "all"}
            onValueChange={(value) => handleFilterChange("type", value)}
          >
            <SelectItem value="all">Todos os tipos</SelectItem>
          </SelectProductType>
          
          <SelectProductStatus
            value={filters.isActive ? filters.isActive : "all"}
            onValueChange={(value) => handleFilterChange("isActive", value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
