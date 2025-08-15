import { AppPageHeader } from "@/components/app-page-header";
import { CreateProductModal } from "../components/create-product-modal";
import { ProductStatsList } from "../components/product-stats-list";
import { ProductFilter } from "../components/filter/product-filter";
import { ProductTable } from "../components/product-table";

export function ProductsPage() {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <AppPageHeader
          name="Produtos e Serviços"
          description="Gerencie o catálogo de produtos e serviços oferecidos"
        />
        <CreateProductModal />
      </div>
      <ProductStatsList />
      <ProductFilter />
      <ProductTable />
    </>
  );
}
