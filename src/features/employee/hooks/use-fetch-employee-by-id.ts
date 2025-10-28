import { useQuery } from "@tanstack/react-query";
import type { Employee } from "../employee-types";
import { fetchEmployessById } from "../employee.service";

export function useFetchEmployeeById(userId?: string | number) {
  const id = userId ? Number(userId) : undefined;
  
  const { data, isLoading, error } = useQuery<Employee | null>({
    queryKey: ["employee", id],
    queryFn: () => fetchEmployessById(id!),
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
  });

  return { 
    user: data, 
    employee: data, // Alias para consistência
    isLoading, 
    error,
    isError: !!error,
    isNotFound: (error as any)?.response?.status === 404
  };
}