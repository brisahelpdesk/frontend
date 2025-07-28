import { Api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export interface Product {
  id: string;
  name: string;
  description: string;
  type: "product" | "service";
  categoryId: number;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
}

interface FetchProductsParams {
  q?: string;
  categoryId?: string;
  type?: string;
  isActive?: string;
}

export function useFetchProducts() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<FetchProductsParams>({
    q: "",
    categoryId: "all",
    type: "all",
    isActive: "all",
  });


  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return await Api.fetch<undefined, Product[]>({
        method: "GET",
        endpoint: "/products",
        params: {
          categoryId: searchParams.get("categoryId") || undefined,
          type: searchParams.get("type") || undefined,
          isActive: searchParams.get("isActive") || undefined,
          q: searchParams.get("q") || undefined,
        },
      });
    },
  });

  function handleFilterReset() {
    setFilters({
      q: "",
      categoryId: "all",
      type: "all",
      isActive: "all",
    });
  }

  function handleFilterChange(key: keyof FetchProductsParams, value: string) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  useEffect(() => {
    Object.entries(filters).forEach(([key, value]) => {
      if (key !== "q" && value === "all" || value === "") {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value);
      }
    });
    setSearchParams(searchParams);
  }, [filters]);

  return {
    data,
    isLoading,
    error,
    filters,
    handleFilterChange,
    handleFilterReset,
  };
}
