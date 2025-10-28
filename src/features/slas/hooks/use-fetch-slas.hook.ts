import { useQuery } from "@tanstack/react-query";
import { fetchSLAs } from "../services/sla.service";

export function useFetchSLAs() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["slas"],
    queryFn: fetchSLAs,
  });

  return {
    slas: data || [],
    isLoading,
    error,
    refetch,
  };
}