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
import { useFetchProducts } from "../hook/use-fetch-products";
import { SelectItem } from "@/components/ui/select";

export function ProductFilter() {
  const { filters, handleFilterChange, handleFilterReset } = useFetchProducts();

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
            value={filters.q}
            onChange={(e) => handleFilterChange("q", e.target.value)}
          />
          <SelectCategory
            value={filters.categoryId}
            onValueChange={(value) => handleFilterChange("categoryId", value)}
          >
            <SelectItem value="all">Todas as categorias</SelectItem>
          </SelectCategory>

          <SelectProductType
            value={filters.type}
            onValueChange={(value) => handleFilterChange("type", value)}
          >
            <SelectItem value="all">Todos os tipos</SelectItem>
          </SelectProductType>
          
          <SelectProductStatus
            value={filters.isActive}
            onValueChange={(value) => handleFilterChange("isActive", value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
