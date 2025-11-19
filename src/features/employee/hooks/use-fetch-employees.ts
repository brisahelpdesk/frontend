import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "../employee.service";

export function useFetchEmployees() {
  const { data, isLoading } = useQuery({
    queryKey: ["fetchEmployees"],
    queryFn: fetchEmployees,
  });

  return {
    users: data,
    isLoading,
  };
}