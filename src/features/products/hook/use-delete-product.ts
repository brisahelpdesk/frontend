import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { deleteProduct } from "../product-services";

export function useDeleteProduct(productId: number) {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteProduct", productId],

    mutationFn: () => deleteProduct(productId),
    
    onSuccess: () => {
      toast.success("Produto excluído com sucesso", {
        richColors: true,
        description: `O produto foi removido da lista.`,
      });

      navigate("/app/products", { replace: true });
    },

    onError: (error) => {
      toast.error(`Erro ao excluir produto: ${error.message}`);
    },
  });

  return { deleteProduct: mutate, isPending };
}