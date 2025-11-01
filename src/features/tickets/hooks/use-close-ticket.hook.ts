import { useMutation, useQueryClient } from "@tanstack/react-query";
import { closeTicket, type CloseTicketPayload } from "../ticket.service";
import { toast } from "sonner";

export function useCloseTicket(ticketId?: string) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["closeTicket", ticketId],
    mutationFn: (payload: CloseTicketPayload) => {
      if (!ticketId) return Promise.reject(new Error("ticketId is required"));
      return closeTicket(ticketId, payload);
    },
    onSuccess: () => {
      toast.success("Ticket fechado com sucesso");
      if (ticketId) {
        queryClient.invalidateQueries({ queryKey: ["tickets", ticketId] });
      }
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: () => {
      toast.error("Falha ao fechar ticket");
    },
  });

  return { mutate, isPending };
}
