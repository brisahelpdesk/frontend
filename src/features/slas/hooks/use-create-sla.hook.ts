import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateSLASchema, type CreateSLAFields } from "../models/sla.schema";
import { createSLA } from "../services/sla.service";
import type { SLA } from "../models/sla.types";

export function useCreateSLA() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<CreateSLAFields>({
    defaultValues: {
      name: "",
      description: "",
      responseTime: 1,
      resolutionTime: 24,
      isActive: true,
    },
    resolver: zodResolver(CreateSLASchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["createSLA"],
    mutationFn: createSLA,
    onSuccess: (data: SLA) => {
      toast.success("SLA criado com sucesso.", {
        richColors: true,
        description: `SLA ${data.name} foi adicionado à lista.`,
      });

      
      queryClient.setQueryData(
        ["slas"],
        (prev: SLA[] | undefined) => {
          if (!prev) return [data];
          return [...prev, data];
        }
      );

      form.reset();
      setIsModalOpen(false);
    },
    onError: (error: any) => {
      toast.error(`Erro ao criar SLA: ${error.response?.data?.message || error.message}`, {
        richColors: true,
        description: "Por favor, verifique os dados e tente novamente.",
      });
    },
  });

  const onSubmit = useCallback((data: CreateSLAFields) => {
    mutate(data);
  }, [mutate]);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    form.reset();
  }, [form]);

  const handleSubmit = useCallback(() => {
    form.handleSubmit(onSubmit)();
  }, [form, onSubmit]);

  return {
    form,
    onSubmit: handleSubmit,
    isSubmitting: isPending,
    isModalOpen,
    openModal,
    closeModal,
  };
}