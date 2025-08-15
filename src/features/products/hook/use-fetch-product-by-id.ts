import { useQuery } from "@tanstack/react-query";
import type { Product } from "../product.model";
import { fetchProductById } from "../product.services";

export function useFetchProductById(id: string) {
  const { data, isLoading, error } = useQuery<Product>({
    queryKey: ["fetchProductById", id],
    queryFn: () => fetchProductById(id),
  });

  return { product: data, isLoading, error };
}