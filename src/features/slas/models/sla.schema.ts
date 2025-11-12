import { z } from "zod";

export const CreateSLASchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome deve ter no máximo 100 caracteres"),
  description: z.string().min(1, "Descrição é obrigatória").max(500, "Descrição deve ter no máximo 500 caracteres"),
  responseTime: z.number().min(1, "Tempo de resposta deve ser maior que 0"),
  resolutionTime: z.number().min(1, "Tempo de resolução deve ser maior que 0"),
  isActive: z.boolean(),
});

export type CreateSLAFields = z.infer<typeof CreateSLASchema>;