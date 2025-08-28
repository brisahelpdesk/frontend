import type { Product } from "./product.model";
import type { CreateProductFields } from "./product.schema";
import type { FilterProduct } from "./components/filter/filter-product-store";

export interface FetchProductFilters {
  name: string | null;
  type: string | null;
  category: string | null;
  isActive: string | null;
}

const products: Product[] = [
  {
    id: "1",
    name: "Product 1",
    description: "Description for Product 1",
    type: "PRODUCT",
    categoryId: 1,
    category: {
      id: 1,
      name: "Category 1"
    },
    isActive: true,
    isPhysical: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Product 2",
    description: "Description for Product 2",
    type: "PRODUCT",
    categoryId: 2,
    category: {
      id: 2,
      name: "Category 2"
    },
    isActive: false,
    isPhysical: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Product 3",
    description: "Description for Product 3",
    type: "PRODUCT",
    categoryId: 3,
    category: {
      id: 3,
      name: "Category 3"
    },
    isActive: true,
    isPhysical: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Product 4",
    description: "Description for Product 4",
    type: "PRODUCT",
    categoryId: 4,
    category: {
      id: 4,
      name: "Category 4"
    },
    isActive: false,
    isPhysical: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function fetchProducts(filters: FilterProduct) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return products.filter((product) => {
    return (
      (!filters.geral || product.name.includes(filters.geral)) &&
      (!filters.type || product.type === filters.type) &&
      (!filters.categoryId || product.categoryId === Number(filters.categoryId)) &&
      (filters.isActive === undefined || product.isActive === (filters.isActive === "TRUE" ? true : false)) &&
      (filters.isPhysical === undefined || product.isPhysical === (filters.isPhysical === "TRUE" ? true : false))
    );
  });
}

export async function createProduct(product: CreateProductFields) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const newProduct: Product = {
    id: String(products.length + 1),
    name: product.name,
    description: product.description,
    type: product.type,
    categoryId: Number(product.categoryId),
    isActive: product.isActive,
    isPhysical: product.isPhysical,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  products.push(newProduct);
  return newProduct;
}

export async function fetchProductById(productId: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return products.find((product) => product.id === productId) || null;
}

export async function deleteProduct(productId: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const index = products.findIndex((product) => product.id === productId);
  if (index !== -1) {
    products.splice(index, 1);
  }
}
