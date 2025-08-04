import zod from "zod";

const Name = zod.string().min(2, {
  message: "O nome deve ter pelo menos 2 caracteres",
});

const ProductCategoryId = zod.string().min(1, {
  message: "Campo obrigatório",
});

const ProductType = zod.enum(["PRODUCT", "SERVICE"], {
  error: "Campo obrigatório",
});

const ProductDescription = zod
  .string({ error: "Descrição inválida" })
  .max(255, {
    message: "A descrição deve ter no máximo 255 caracteres",
  })
  .optional();
  

export const CreateProductSchema = zod.object({
  name: Name,
  internalId: zod.string().optional(),
  type: ProductType,
  categoryId: ProductCategoryId,
  description: ProductDescription,
  isActive: zod.boolean(),
  isPhysical: zod.boolean(),
});

export type CreateProductFields = zod.infer<typeof CreateProductSchema>;
