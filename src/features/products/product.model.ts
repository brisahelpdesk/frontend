import type { Category } from "./category.model";

export interface Product {
  id: string;
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
