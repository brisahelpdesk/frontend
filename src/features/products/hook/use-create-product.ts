import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  CreateProductSchema,
  type CreateProductFields,
} from "../product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Product } from "../product.model";
import { createProduct } from "../product.services";
import { useProductFilters } from "../components/filter/filter-product-store";

// TODO: Refatorar para melhorar performance e evitar re-renderizações desnecessárias
// TODO: Melhorar testabilidade e separação de preocupações

export function useCreateProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<CreateProductFields>({
    defaultValues: {
      name: "",
      internalId: "",
      description: "",
      categoryId: "",
      isActive: false,
      isPhysical: false,
    },

    mode: "onBlur",

    resolver: zodResolver(CreateProductSchema),
  });

  const productFields = useProductFilters();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["createProduct"],

    mutationFn: createProduct,

    onSuccess: (data) => {
      toast.success("Producto criado com sucesso.", {
        richColors: true,
        description: `Produto ${data.name} foi adicionado à lista.`,
      });

      queryClient.setQueryData(
        ["products", productFields],
        (prev: Product[] | undefined) => {
          if (!prev) return [data];
          return [...prev, data];
        }
      );

      setIsModalOpen(false);
      form.reset();
    },

    onError: (error: any) => {
      toast.error(`Erro ao criar produto: ${error.response.data.message}`, {
        richColors: true,
        description: "Por favor, verifique os dados e tente novamente.",
      });
    },
  });

  function onSubmit(data: CreateProductFields) {
    mutate(data);
  }

  return {
    isModalOpen,
    onOpenChange: setIsModalOpen,
    openModal: () => setIsModalOpen(true),
    closeModal: () => setIsModalOpen(false),
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending,
  };
}
