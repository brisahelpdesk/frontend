import type { Category } from "../category/category-types";

export interface Product {
  id: number;
  name: string;
  internalId?: string;
  description?: string;
  type: "PRODUCT" | "SERVICE";
  categoryId: number;
  isActive: boolean;
  isPhysical: boolean;
  createdAt: Date;
  updatedAt: Date;
  category?: Category;
}
