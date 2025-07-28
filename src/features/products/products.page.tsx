import { AppPageHeader } from "@/components/app-page-header";
import { ProductStatsList } from "./components/product-stats-list";
import { ProductFilter } from "./components/product-filter";
import { ProductTable } from "./components/product-table";
import { CreateProductModal } from "./components/create-product-modal";

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
