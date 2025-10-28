import { createContext, useContext, memo } from "react";
import type { ReactNode } from "react";
import { useProductsViewModel } from "../hook/use-products-view-model";

const ProductsContext = createContext<ReturnType<typeof useProductsViewModel> | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsProvider = memo(function ProductsProvider({ children }: ProductsProviderProps) {
  const viewModel = useProductsViewModel();

  return (
    <ProductsContext.Provider value={viewModel}>
      {children}
    </ProductsContext.Provider>
  );
});
