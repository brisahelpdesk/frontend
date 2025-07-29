import { Api } from "@/lib/axios";
import type { Response } from "../../lib/response";
import type { Product } from "./product.model";

export interface FetchProductFilters {
  name: string | null;
  type: string | null;
  category: string | null;
  isActive: string | null;
}

export async function fetchProducts(filters: FetchProductFilters, page: number, perPage: number) {
  const filterParsed = Object.entries(filters)
    .reduce((acc, [key, value]) => {
      if (value !== null && value !== "") {
        if (key === "isActive") {
          acc.push(`${key}=${value}`);
        } else {
          acc.push(`${key}='${value}'`);
        }
      }
      return acc;
    }, [] as string[])
    .join("&&");

  return await Api.fetch<undefined, Response<Product[]>>({
    endpoint: "/products/records",
    method: "GET",
    params: {
      filter: filterParsed,
      page,
      perPage,
      expand: "category",
    },
  });
}
