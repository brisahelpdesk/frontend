import { useQuery } from "@tanstack/react-query";
import { useProductFilters } from "../components/filter/filter-product-store";
import { fetchProducts } from "../product-services";


export function useFetchProducts() {
  const filters = useProductFilters();

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", filters],
    queryFn: fetchProducts,
  });

  return {
    data,
    isLoading,
    error,
  };
}
