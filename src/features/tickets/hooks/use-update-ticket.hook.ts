import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTicket } from "../ticket.service";
import type { UpdateTicketPayload } from "../ticket.service";
import { toast } from "sonner";

export function useUpdateTicket(ticketId?: string) {
  const qc = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateTicket", ticketId],
    mutationFn: (data: UpdateTicketPayload) => {
      if (!ticketId) return Promise.reject(new Error("ticketId is required"));
      return updateTicket(ticketId, data);
    },
    onSuccess: () => {
      toast.success("Status alterado com sucesso");
      if (ticketId) qc.invalidateQueries({ queryKey: ["tickets", ticketId] });
      qc.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: () => {
      toast.error("Falha ao alterar status");
    },
  });

  return { mutate, isPending };
}
