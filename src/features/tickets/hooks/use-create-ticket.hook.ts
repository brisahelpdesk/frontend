import { useFetchCategories } from "@/features/category/hook/use-fetch-categories";
import { useFetchProducts } from "@/features/products/hook/use-fetch-products";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { z, ZodNumber } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createTicket } from "../ticket.service"


const createTicketSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z.string().min(5, "A descrição deve ter pelo menos 5 caracteres"),
  category: z.coerce.number().int().min(1, "Categoria é obrigatória") as ZodNumber,
  productId: z.coerce.number().int().min(1, "Produto é obrigatório") as ZodNumber,
  requesterId: z.coerce.number().int().min(1, "Cliente é obrigatório") as ZodNumber,
  slaId: z.coerce.number().int().min(1, "SLA é obrigatório") as ZodNumber,
});

type CreateTicketForm = z.infer<typeof createTicketSchema>;


export function useCreateTicketByEmployee() {
  const { data: categories } = useFetchCategories();
  const { data: products } = useFetchProducts();

  const navigate = useNavigate();

  const form = useForm<CreateTicketForm>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      title: "",
      description: "",
      category: 0,
      productId: 0,
      requesterId: 0,
      slaId: 0
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
      createTicket({
        title: data.title,
        description: data.description,
        productId: data.productId,
        requesterId: data.requesterId,
        slaId: data.slaId,
      }),
    onSuccess: (response) => {
      toast.success("Ticket criado com sucesso!");
      form.reset();
      navigate(`/app/tickets/${response.id}`);
    },
    onError: (err: Error) => {
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
    onSubmit: form.handleSubmit(onSubmit), 
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}