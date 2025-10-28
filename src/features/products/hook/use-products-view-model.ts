import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProductFilters } from "../components/filter/filter-product-store";
import {
  CreateProductSchema,
  type CreateProductFields,
} from "../product-schema";
import { createProduct, fetchProducts } from "../product-services";
import type { Product } from "../product-model";
import { useFetchCategories } from "@/features/category/hook/use-fetch-categories";

// Memoize static select items
const selectTypeItems = [
  { value: "PRODUCT", label: "Produto" },
  { value: "SERVICE", label: "Serviço" },
];

export function useProductsViewModel() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const productFilters = useProductFilters();
  const queryClient = useQueryClient();

  // Data Fetching (from use-fetch-products)
  const {
    data: products,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useQuery({
    queryKey: ["products", productFilters],
    queryFn: () => fetchProducts(),
  });

  // Fetching categories for the form select
  const { data: categories } = useFetchCategories();
  const selectCategoryItems = useMemo(
    () => categories?.map(({ id, name }) => ({
      value: id.toString(),
      label: name,
    })) || [],
    [categories]
  );

  // Form Handling (from use-create-product)
  const createForm = useForm<CreateProductFields>({
    defaultValues: {
      name: "",
      internalId: "",
      description: "",
      categoryId: "",
      isActive: true,
      isPhysical: false,
      type: "PRODUCT",
    },
    mode: "onBlur",
    resolver: zodResolver(CreateProductSchema),
  });

  // Create Mutation (from use-create-product)
  const { mutate: createProductMutate, isPending: isCreatingProduct } =
    useMutation({
      mutationKey: ["createProduct"],
      mutationFn: createProduct,
      onSuccess: (data) => {
        toast.success("Produto criado com sucesso.", {
          richColors: true,
          description: `Produto ${data.name} foi adicionado à lista.`,
        });

        queryClient.setQueryData(
          ["products", productFilters],
          (prev: Product[] | undefined) => {
            if (!prev) return [data];
            return [...prev, data];
          }
        );

        setCreateModalOpen(false);
        createForm.reset();
      },
      onError: (error: any) => {
        toast.error(`Erro ao criar produto: ${error.response.data.message}`, {
          richColors: true,
          description: "Por favor, verifique os dados e tente novamente.",
        });
      },
    });

  const onSubmitCreateProduct = useCallback((data: CreateProductFields) => {
    createProductMutate(data);
  }, [createProductMutate]);

  const openCreateModal = useCallback(() => setCreateModalOpen(true), []);
  const closeCreateModal = useCallback(() => setCreateModalOpen(false), []);

  const handleSubmitCreateProduct = useMemo(
    () => createForm.handleSubmit(onSubmitCreateProduct),
    [createForm.handleSubmit, onSubmitCreateProduct]
  );

  return {
    // Products data
    products,
    isLoadingProducts,
    productsError,

    // Create Product Modal
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,

    // Create Product Form
    createForm,
    onSubmitCreateProduct: handleSubmitCreateProduct,
    isCreatingProduct,

    // Form Select Items
    selectCategoryItems,
    selectTypeItems,
  };
}
