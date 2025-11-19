import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateClientSchema,
  type CreateClientSchemaType,
} from "../client-schema";
import { createClient, type CreateClientResponse } from "../client-service";
import type { Client } from "../client-types";
import { useState } from "react";
import type { Pagination } from "@/types/pagination";

export function useCreateClient() {
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<CreateClientSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      cpf: "",
      isActive: false,
      password: "",
    },
    resolver: zodResolver(CreateClientSchema),
    mode: "onBlur",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["createClient"],

    mutationFn: createClient,

    onSuccess: (data: CreateClientResponse) => {
      toast.success("Cliente criado com sucesso.", {
        richColors: true,
        description: "O cliente foi adicionado à lista.",
      });

      queryClient.setQueryData(["fetchClients"], (prevClients: Pagination<Client>) => {
        if (!prevClients) return [];
        return {
          ...prevClients,
          content: [
            ...prevClients.content,
            {
              id: data.userId,
              name: data.name,
              email: data.email,
              cpf: data.cpf,
              isActive: data.isActive,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
            },
          ],
        };
      });

      setOpenModal(false);
      form.reset();
    },

    onError: () => {
      toast.error(`Erro ao criar funcionário:`, {
        richColors: true,
        description: "Por favor, verifique os dados e tente novamente.",
      });
    },
  });

  function onSubmit(data: CreateClientSchemaType) {
    mutate(data);
  }

  return {
    openModal,
    setOpenModal,
    form,
    isPending,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
