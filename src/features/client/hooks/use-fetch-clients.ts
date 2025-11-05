import { useQuery } from "@tanstack/react-query";
import { fetchClients } from "../client-service";

export function useFetchClients() {
  const { data, isLoading } = useQuery({
    queryKey: ["fetchClients"],
    queryFn: () => fetchClients(),
  });

  return {
    clients: data,
    isLoading,
  };
}