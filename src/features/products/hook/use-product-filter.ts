import { useEffect, useState } from "react";
import type { FetchProductFilters } from "../product.services";
import { useSearchParams } from "react-router";

export function useProductFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<FetchProductFilters>({
    name: "",
    category: "all",
    type: "all",
    isActive: "all",
  });

  function handleFilterReset() {
    setFilters({
      name: "",
      category: "all",
      type: "all",
      isActive: "all",
    });
  }

  function handleFilterChange(key: keyof FetchProductFilters, value: string) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  useEffect(() => {
    Object.entries(filters).forEach(([key, value]) => {
      if ((key !== "q" && value === "all") || value === "") {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value);
      }
    });
    setSearchParams(searchParams);
  }, [filters]);

  return {
    filters,
    handleFilterReset,
    handleFilterChange,
  };
}
