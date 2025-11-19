import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateEmployeeSchema,
  type CreateEmployeeSchemaType,
} from "../employee-schema";
import {
  createEmployee,
  type CreateEmployeeResponse,
} from "../employee.service";
import type { Employee } from "../employee-types";
import { useState } from "react";
import { useFiltersEmployee } from "./use-filter-employee";


export function useCreateEmployee() {
  const [openModal, setOpenModal] = useState(false);
  const filters = useFiltersEmployee();
  const queryClient = useQueryClient();

  const form = useForm<CreateEmployeeSchemaType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      cpf: "",
      isActive: false,
    },
    resolver: zodResolver(CreateEmployeeSchema),
    mode: "onBlur",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["createEmployee"],

    mutationFn: createEmployee,

    onSuccess: (data: CreateEmployeeResponse) => {
      toast.success("Funcionário criado com sucesso.", {
        richColors: true,
        description: "O funcionário foi adicionado à lista.",
      });

      queryClient.setQueryData(
        ["fetchEmployees", filters],
        (prevEmployees: Employee[]) => {
          if (!prevEmployees) return [];
          return [
            ...prevEmployees,
            {
              id: data.userId,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              cpf: data.cpf,
              isActive: data.isActive,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
            },
          ];
        }
      );

      setOpenModal(false);
      form.reset();
    },

    onError: () => {
      toast.error(`Erro ao criar funcionário`, {
        richColors: true,
        description: "Por favor, verifique os dados e tente novamente.",
      });
    },
  });

  function onSubmit(data: CreateEmployeeSchemaType) {
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
