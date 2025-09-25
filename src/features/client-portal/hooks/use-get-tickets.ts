import { useQuery } from "@tanstack/react-query";
import { getClientTickets } from "../client-portal-service";

export function useGetTickets() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tickets"],
    queryFn: getClientTickets
  })

  return { data: data?.content || [], isLoading, error }
}