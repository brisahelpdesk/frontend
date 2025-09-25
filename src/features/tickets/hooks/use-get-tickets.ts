import { useQuery } from "@tanstack/react-query";
import { getTickets } from "../ticket-service";

export function useGetTickets() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets
  })

  return { data, isLoading, error }
}