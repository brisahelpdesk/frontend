import type { Category } from "./category.model";

export interface Product {
  id: string;
  name: string;
  description: string;
  type: "product" | "service";
  categoryId: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  expand: {
    category?: Category;
  }
}