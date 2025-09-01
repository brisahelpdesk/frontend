import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "../employee-services";
import { useFiltersEmployee } from "./use-filter-employee";

export function useFetchEmployees() {
  const filters = useFiltersEmployee();

  const { data, isLoading } = useQuery({
    queryKey: ["fetchEmployees", filters],
    queryFn: () => fetchEmployees(filters),
  });

  return {
    users: data,
    isLoading,
  };
}