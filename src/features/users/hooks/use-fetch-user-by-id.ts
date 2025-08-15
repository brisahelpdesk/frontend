import { useQuery } from "@tanstack/react-query";
import type { User } from "../user.model";
import { fetchUserById } from "../user.service";

export function useFetchUserById(userId: string) {
  const { data, isLoading, error } = useQuery<User>({
    queryKey: ["fetchUserById", userId],
    queryFn: () => fetchUserById(userId),
  });

  return { user: data, isLoading, error };
}