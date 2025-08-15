import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../user.service";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export function useDeleteUser(userId: string) {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: () => deleteUser(userId),
    onSuccess: () => {
      toast.success("Usuário excluído com sucesso", {
        description: "O usuário foi removido permanentemente.",
        richColors: true,
      });

      navigate("/users");
    },
    onError: () => {
      toast.error("Erro ao excluir usuário", {
        description: "Ocorreu um erro ao tentar excluir o usuário.",
        richColors: true,
      });
    },
  })

  return {
    deleteUser: () => mutate(),
  }
}