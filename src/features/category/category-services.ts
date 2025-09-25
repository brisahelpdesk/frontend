import { Api } from "@/lib/axios";
import type { Category } from "./category-types";

export async function fetchCategories() {
  return Api.fetch<undefined, Category[]>({
    method: "GET",
    endpoint: "/products/categories",
  });
}