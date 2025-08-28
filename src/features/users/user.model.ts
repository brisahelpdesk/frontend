import type { Department } from "../department/department.model";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  document: string;
  email: string;
  department: Department;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}