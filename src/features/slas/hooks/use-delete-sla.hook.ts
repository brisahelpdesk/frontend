import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteSLA } from "../services/sla.service";
import type { SLA } from "../models/sla.types";

export function useDeleteSLA(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteSLA"],
    mutationFn: deleteSLA,
    onSuccess: (_, slaId) => {
      toast.success("SLA excluído com sucesso.", {
        richColors: true,
        description: "O SLA foi removido da lista.",
      });

      queryClient.setQueryData(
        ["slas"],
        (prev: SLA[] | undefined) => {
          if (!prev) return [];
          return prev.filter(sla => sla.id !== slaId);
        }
      );

      // Executa callback opcional após sucesso
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error: any) => {
      toast.error(`Erro ao excluir SLA: ${error.response?.data?.message || error.message}`, {
        richColors: true,
        description: "Por favor, tente novamente.",
      });
    },
  });

  return {
    deleteSLA: mutate,
    isDeleting: isPending,
  };
}