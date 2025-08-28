import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SelectTypeProductFilter } from "./select-type-product-filter";
import { SelectActiveProductFilter } from "./select-active-product-filter";
import { SelectPhysicalProductFilter } from "./select-physical-product-filter";
import { SelectCategoryProductFilter } from "./select-category-product-filter";
import { SearchProductProduct } from "./search-product-filter";
import { ButtonResetFilter } from "./button-reset-filter";
import { Suspense } from "react";
import { SelectSkeleton } from "@/components/select-skeleton";

export function ProductFilter() {
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
          <ButtonResetFilter />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <SearchProductProduct />
          <Suspense fallback={<SelectSkeleton />}>
            <SelectCategoryProductFilter />
          </Suspense>
          <SelectTypeProductFilter />
          <SelectActiveProductFilter />
          <SelectPhysicalProductFilter />
        </div>
      </CardContent>
    </Card>
  );
}
