import type { Product } from "../products/product-model";

export interface Ticket {
  id: number;
  title: string;
  description: string;
  product: Product;
  priority: string;
  priorityClassName: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  responsibleEmployeeId: number;
  requesterId: number;
  productId: number;
  chat: {
    id: number;
    messages: {
      id: number;
      content: string;
      timestamp: Date;
      type: string;
      sender: {
        id: number;
        username: string;
        roles: string[];
      }
    }[];
  }
}