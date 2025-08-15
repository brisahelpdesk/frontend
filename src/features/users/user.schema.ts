import z from "zod";

const UserFirstName = z
  .string()
  .min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
  .max(100, { message: "Nome deve ter no máximo 100 caracteres" });
const UserLastName = z
  .string()
  .min(2, { message: "Sobrenome deve ter pelo menos 2 caracteres" })
  .max(100, { message: "Sobrenome deve ter no máximo 100 caracteres" });
const UserDocument = z
  .string()
  .min(11, { message: "Documento deve ter pelo menos 11 caracteres" })
  .max(14, { message: "Documento deve ter no máximo 14 caracteres" });
const UserEmail = z
  .email({ message: "E-mail inválido" });
const DepartmentId = z
  .string()
  .refine((val) => !isNaN(Number(val)), {
    message: "categoriaId deve ser um número válido",
  });


export const CreateUserSchema = z.object({
  firstName: UserFirstName,
  lastName: UserLastName,
  document: UserDocument,
  email: UserEmail,
  departmentId: DepartmentId,
  isActive: z.boolean(),
});


export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
