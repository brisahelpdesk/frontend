import { useQuery } from "@tanstack/react-query";
import type { Employee } from "../employee-types";
import { fetchEmployessById } from "../employee-services";

export function useFetchEmployeeById(userId: string) {
  const { data, isLoading, error } = useQuery<Employee | null>({
    queryKey: ["fetchEmployeeById", userId],
    queryFn: () => fetchEmployessById(userId),
  });

  return { user: data, isLoading, error };
}