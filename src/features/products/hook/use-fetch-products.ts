import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../product.services";
import { useProductFilters } from "../components/filter/filter-product-store";


export function useFetchProducts() {
  const filters = useProductFilters();

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", filters],
    queryFn: async () => await fetchProducts(filters),
  });

  return {
    data,
    isLoading,
    error,
  };
}
