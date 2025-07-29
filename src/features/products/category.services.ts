import { Api } from "@/lib/axios";
import type { Response } from "@/lib/response";
import type { Category } from "../products/components/select-product-category";

export function fetchCategories() {
  return Api.fetch<undefined, Response<Category[]>>({
    method: "GET",
    endpoint: "/categories/records",
  });
}