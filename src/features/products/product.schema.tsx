import zod from "zod";

export const CreateProductSchema = zod.object({
  name: zod.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  description: zod.string().optional(),
  type: zod.string().refine((value) => ["product", "service"].includes(value), {
    message: "Selecione um tipo",
  }),
  categoryId: zod.string().min(1, "Selecione uma categoria"),
});

export type CreateProductFields = zod.infer<typeof CreateProductSchema>;
