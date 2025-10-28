import { useQuery } from "@tanstack/react-query";
import { getClientById } from "../client-service";
import type { Client } from "../client-types";

export function useGetClientById(clientId?: number) {
  const { data, isLoading, error } = useQuery<Client | null>({
    queryKey: ["getClientById", clientId],
    queryFn: () => getClientById(clientId!),
    enabled: !!clientId,
  });

  return { data, isLoading, error };
}