import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { deleteEmployees } from "../employee-services";
import type { Employee } from "../employee-types";

export function useDeleteEmployee(userId: number) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["deleteUser"],

    mutationFn: () => deleteEmployees(userId),

    onSuccess: () => {
      toast.success("Usuário excluído com sucesso", {
        description: "O usuário foi removido permanentemente.",
        richColors: true,
      });

      queryClient.setQueryData(
        ["fetchEmployees"],
        (prevEmployees: Employee[]) => {
          if (!prevEmployees) return [];
          return prevEmployees.filter((employee) => employee.id !== userId);
        }
      );

      navigate("/app/users");
    },
    onError: () => {
      toast.error("Erro ao excluir usuário", {
        description: "Ocorreu um erro ao tentar excluir o usuário.",
        richColors: true,
      });
    },
  });

  return {
    deleteUser: () => mutate(),
  };
}
