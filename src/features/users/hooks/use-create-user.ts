import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createUser } from "../user.service";
import { toast } from "sonner";
import { useFetchDepartments } from "@/features/department/hooks/use-fetch-departments";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserSchema, type CreateUserSchemaType } from "../user.schema";
import type { User } from "../user.model";


export function useCreateUser() {
  const queryClient = useQueryClient();

  const form = useForm<CreateUserSchemaType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      document: "",
      departmentId: "",
      isActive: false,
    },
    resolver: zodResolver(CreateUserSchema),
    mode: "onBlur",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["createUser"],

    mutationFn: createUser,

    onSuccess: (data: User) => {
      toast.success("Usuário criado com sucesso.", {
        richColors: true,
        description: "O usuário foi adicionado à lista.",
      });

      form.reset();

      queryClient.setQueryData(["fetchUsers"], (prevUsers: User[]) => {
        if (!prevUsers) return [];
        return [...prevUsers, data];
      });
    },

    onError: (error: Error) => {
      toast.error(`Erro ao criar usuário: ${error.message}`, {
        richColors: true,
        description: "Por favor, verifique os dados e tente novamente.",
      });
    }
  });

  const { departments } = useFetchDepartments();

  function onSubmit(data: CreateUserSchemaType) {
    mutate(data);
  }

  return {
    form,
    isPending,
    departments,
    onSubmit: form.handleSubmit(onSubmit),
  };
}