import { useFetchCategories } from "@/features/category/hook/use-fetch-categories";
import { useFetchProducts } from "@/features/products/hook/use-fetch-products";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { createClientTicket } from "../client-portal-service";
import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { z, ZodNumber } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";


const createTicketSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z.string().min(5, "A descrição deve ter pelo menos 5 caracteres"),
  category: z.coerce.number().int().min(1, "Categoria é obrigatória") as ZodNumber,
  product: z.coerce.number().int().min(1, "Produto é obrigatório") as ZodNumber,
});

type CreateTicketForm = z.infer<typeof createTicketSchema>;


export function useCreateTicketByClient() {
  const { data: categories } = useFetchCategories();
  const { data: products } = useFetchProducts();

  const navigate = useNavigate();

  const form = useForm<CreateTicketForm>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      title: "",
      description: "",
      category: 0,
      product: 0,
    },
    mode: "onChange",
  });

  const category = form.watch("category");

  const productsFiltered = useMemo(
    () => products?.filter((prod) => prod?.category?.id === Number(category)) ?? [],
    [category, products] 
  );

  const mutation = useMutation({
    mutationFn: (data: CreateTicketForm) =>
      createClientTicket({
        title: data.title,
        description: data.description,
        productId: data.product,
      }),
    onSuccess: (response) => {
      toast.success("Ticket criado com sucesso!");
      form.reset();
      navigate(`/client-portal/tickets/${response.id}`);
    },
    onError: (err: any) => {
      toast.error("Erro ao criar o ticket", {
        description: err?.message ?? "Tente novamente mais tarde.",
      });
    },
  });

  function onSubmit(data: CreateTicketForm) {
    mutation.mutate(data);
  }

  return {
    form,
    categories,
    productsFiltered,
    category,
    onSubmit: form.handleSubmit(onSubmit), // já integrado ao RHF
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}