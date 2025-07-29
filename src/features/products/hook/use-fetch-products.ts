import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { fetchProducts } from "../product.services";


export function useFetchProducts() {
  const [searchParams] = useSearchParams();

  const filters = {
    name: searchParams.get("name"),
    category: searchParams.get("category"),
    type: searchParams.get("type"),
    isActive: searchParams.get("isActive"),
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", filters],
    queryFn: async () => await fetchProducts(filters, 1, 10),
  });

  return {
    data,
    isLoading,
    error,
  };
}
