import { useQuery } from "@tanstack/react-query";
import { fetchClients } from "../client-service";

export function useFetchClients() {
  const { data, isLoading } = useQuery({
    queryKey: ["fetchClients"],
    queryFn: () => fetchClients(),
  });

  console.log("Fetched clients:", data);

  return {
    clients: data,
    isLoading,
  };
}