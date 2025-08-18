import { Api } from "@/lib/axios";
import type { Category } from "./category.model";

export function fetchCategories() {
  return Api.fetch<undefined, Category[]>({
    method: "GET",
    endpoint: "/category-items",
  });
}