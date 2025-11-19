import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignTicket } from "../ticket.service";
import type { Ticket } from "../ticket.types";
import { toast } from "sonner";

export function useAssignTicket(ticketId?: string) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<Ticket, unknown, number>({
    mutationFn: (employeeId: number) => {
      if (!ticketId) return Promise.reject(new Error("ticketId is required"));
      return assignTicket(ticketId, employeeId);
    },
    onSuccess: () => {
      toast.success("Ticket atribuído com sucesso");
      if (ticketId) {
        queryClient.invalidateQueries({ queryKey: ["tickets", ticketId] });
      }
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: () => {
      toast.error("Falha ao atribuir ticket");
    },
  });

  return { mutate, isPending };
}
