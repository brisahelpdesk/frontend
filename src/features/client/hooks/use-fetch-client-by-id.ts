import { useQuery } from "@tanstack/react-query";
import { getClientById } from "../client-service";

export function useFetchClientById(clientId?: string | number) {
  const id = clientId ? Number(clientId) : undefined;
  
  return useQuery({
    queryKey: ["client", id],
    queryFn: () => getClientById(id!),
    enabled: !!id && !isNaN(id), // Só executa se o ID for válido
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: (failureCount, error: any) => {
      // Não tenta novamente se for 404 (not found)
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 2;
    },
    throwOnError: false, // Não lança erro, deixa o componente lidar
    select: (data) => ({
      ...data,
      // Formatando datas se necessário
      createdDate: data?.createdAt ? new Date(data.createdAt).toLocaleDateString() : '',
      updatedDate: data?.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : '',
    }),
  });
}