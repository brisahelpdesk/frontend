import { useQuery } from "@tanstack/react-query";
import { fetchDepartments } from "../department-services";

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