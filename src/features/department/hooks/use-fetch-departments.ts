import { useQuery } from "@tanstack/react-query";
import { fetchDepartments } from "../department.service";

export function useFetchDepartments() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });

  return {
    departments: data,
    isLoading,
    error,
  };
}