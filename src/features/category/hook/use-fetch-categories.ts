import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../category.services";

export function useFetchCategories() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => fetchCategories(),
  });

  return { data, isLoading, error };
}