import { useQuery } from "@tanstack/react-query";
import type { Product } from "../product-model";
import { fetchProductById } from "../product-services";

export function useFetchProductById(id: number) {
  const { data, isLoading, error } = useQuery<Product | null>({
    queryKey: ["fetchProductById", id],
    queryFn: () => fetchProductById(id),
  });

  return { product: data, isLoading, error };
}