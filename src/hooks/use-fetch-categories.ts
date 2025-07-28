import type { Category } from "@/features/products/components/select-product-category";
import { Api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function useFetchCategories() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return await Api.fetch<undefined, Category[]>({
        method: "GET",
        endpoint: "/categories",
      });
    }
  });

  return { data, isLoading, error };
}