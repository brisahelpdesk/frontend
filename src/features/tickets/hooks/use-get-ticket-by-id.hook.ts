import { useQuery } from "@tanstack/react-query";
import { getTicketById } from "../ticket.service";
import type { Ticket } from "../ticket.types";

const priorityColors: Record<string, string> = {
  Crítica: "bg-red-50 text-red-700 border-red-200",
  Alta: "bg-orange-50 text-orange-700 border-orange-200",
  Média: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Baixa: "bg-green-50 text-green-700 border-green-200",
};

export function useGetTicketById(ticketId: string) {
  const { data, isLoading, error } = useQuery<Ticket | undefined>({
    queryKey: ["tickets", ticketId],
    queryFn: () => getTicketById(ticketId),
    enabled: !!ticketId,
  });

  const ticketData = data ? {
    ...data,
    priorityClassName: priorityColors[data.priority] || priorityColors["Baixa"],
  } : undefined;

  return { data: ticketData, isLoading, error };
}