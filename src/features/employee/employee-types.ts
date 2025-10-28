import type { Department } from "../department/department-types";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  cpf: string;
  email: string;
  password?: string;
  department: Department;
  isPasswordChanged: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  roles?: string[]; // Adicionar roles para identificar tipo de usuário
}