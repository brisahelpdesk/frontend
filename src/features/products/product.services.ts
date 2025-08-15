import { Api } from "@/lib/axios";
import type { Product } from "./product.model";
import type { CreateProductFields } from "./product.schema";
import type { FilterProduct } from "./components/filter/filter-product-store";

export interface FetchProductFilters {
  name: string | null;
  type: string | null;
  category: string | null;
  isActive: string | null;
}

export async function fetchProducts(filters: FilterProduct) {
  return await Api.fetch<undefined, Product[]>({
    endpoint: "/items",
    method: "GET",
    params: {
      geral: filters.geral, 
      categoryId: filters.categoryId,
      type: filters.type,
      isActive: filters.isActive,
      isPhysical: filters.isPhysical,
    },
  });
}

export async function createProduct(product: CreateProductFields) {
  return await Api.fetch<CreateProductFields, Product>({
    endpoint: "/items",
    method: "POST",
    data: product,
  });
}

export async function fetchProductById(productId: string) {
  return await Api.fetch<undefined, Product>({
    endpoint: `/items/${productId}`,
    method: "GET",
  });
}

export async function deleteProduct(productId: string) {
  return await Api.fetch<undefined, void>({
    endpoint: `/items/${productId}`,
    method: "DELETE",
  });
}

