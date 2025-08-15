import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../user.service";
import { useFiltersUser } from "./use-filter-user";

export function useFetchUsers() {
  const filters = useFiltersUser();

  const { data, isLoading } = useQuery({
    queryKey: ["fetchUsers", filters],
    queryFn: () => fetchUsers(filters),
  });

  return {
    users: data,
    isLoading,
  };
}