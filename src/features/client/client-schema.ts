import z from "zod";

const ClientName = z
  .string()
  .min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
  .max(100, { message: "Nome deve ter no máximo 100 caracteres" });
const EmployeeCpf = z
  .string()
  .min(11, { message: "CPF deve ter pelo menos 11 caracteres" })
  .max(14, { message: "CPF deve ter no máximo 14 caracteres" });
const EmployeeEmail = z
  .email({ message: "E-mail inválido" });
const EmployeePassword = z
  .string()
  .min(6, { message: "Senha deve ter pelo menos 6 caracteres" })
  .max(100, { message: "Senha deve ter no máximo 100 caracteres" });


export const CreateClientSchema = z.object({
  name: ClientName,
  cpf: EmployeeCpf,
  email: EmployeeEmail,
  isActive: z.boolean(),
  password: EmployeePassword,
});


export type CreateClientSchemaType = z.infer<typeof CreateClientSchema>;
