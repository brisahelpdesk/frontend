import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useFetchDepartments } from "@/features/department/hooks/use-fetch-departments";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateEmployeeSchema,
  type CreateEmployeeSchemaType,
} from "../employee-schema";
import { createEmployee } from "../employee.service";
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
      departmentId: "",
      isActive: false,
    },
    resolver: zodResolver(CreateEmployeeSchema),
    mode: "onBlur",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["createEmployee"],

    mutationFn: createEmployee,

    onSuccess: (data: Employee) => {
      toast.success("Funcionário criado com sucesso.", {
        richColors: true,
        description: "O funcionário foi adicionado à lista.",
      });

      console.log("Novo funcionário criado:", data);

      queryClient.setQueryData(
        ["fetchEmployees", filters],
        (prevEmployees: Employee[]) => {
          if (!prevEmployees) return [];
          return [...prevEmployees, data];
        }
      );

      setOpenModal(false);
      form.reset();
    },

    onError: (error: Error) => {
      toast.error(`Erro ao criar funcionário: ${error.message}`, {
        richColors: true,
        description: "Por favor, verifique os dados e tente novamente.",
      });
    },
  });

  const { departments } = useFetchDepartments();

  function onSubmit(data: CreateEmployeeSchemaType) {
    mutate(data);
  }

  return {
    openModal,
    setOpenModal,
    form,
    isPending,
    departments,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
