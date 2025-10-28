import { useQuery } from "@tanstack/react-query";
import { getTickets } from "../ticket.service";

export function useGetTickets(page: number = 0, pageSize: number = 5) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tickets", page, pageSize],
    queryFn: () => getTickets(page, pageSize)
  })

  return { data, isLoading, error }
}