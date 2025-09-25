import { Api } from "@/lib/axios";
import type { Product } from "./product-model";
import type { CreateProductFields } from "./product-schema";


export async function fetchProducts() {
  return Api.fetch<undefined, Product[]>({
    method: "GET",
    endpoint: "/products",
  });
}


export async function createProduct(data: CreateProductFields) {
  return Api.fetch<CreateProductFields, Product>({
    method: "POST",
    endpoint: "/products",
    data,
  });
}


export async function fetchProductById(productId: number) {
  return Api.fetch<undefined, Product>({
    method: "GET",
    endpoint: `/products/${productId}`,
  });
}

export async function deleteProduct(productId: number) {
  return Api.fetch<undefined, void>({
    method: "DELETE",
    endpoint: `/products/${productId}`,
  });
}
