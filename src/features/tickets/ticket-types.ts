import type { Product } from "../products/product-model";

export interface Ticket {
  id: number;
  title: string;
  description: string;
  product: Product;
  priority: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  responsibleEmployeeId: number;
  requesterId: number;
  productId: number;
}