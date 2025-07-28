import { Api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { Product } from "./use-fetch-products";
import { toast } from "sonner";
import { CreateProductSchema, type CreateProductFields } from "../product.schema";
import { zodResolver } from "@hookform/resolvers/zod";

// TODO: Refatorar para melhorar performance e evitar re-renderizações desnecessárias
// TODO: Melhorar testabilidade e separação de preocupações


export function useCreateProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: async (data: CreateProductFields) => {
      return await Api.fetch<CreateProductFields, Product>({
        method: "POST",
        endpoint: "/products",
        data,
      });
    },
    onSuccess: (data) => {
      toast.success(`Producto "${data.name}" criado com sucesso.`, {
        richColors: true,
        description: "O produto foi adicionado ao catálogo.",
      });
      
      queryClient.setQueryData(["products"], (prev: Product[] | undefined) => {
        if (!prev) return [data];
        return [...prev, data];
      });
      
      setIsModalOpen(false);
      form.reset();
    },
  });

  const form = useForm<CreateProductFields>({
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      type: "",
    },
    mode: "onBlur",
    resolver: zodResolver(CreateProductSchema),
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
