import { useQuery } from "@tanstack/react-query";
import { getTicketById } from "../ticket-service";

export function useGetTicketById(ticketId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tickets", ticketId],
    queryFn: () => getTicketById(ticketId),
    enabled: !!ticketId,
  });

  return { data, isLoading, error }
}