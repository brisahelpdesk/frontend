import { Api } from "@/lib/axios";
import type { CreateEmployeeSchemaType } from "./employee-schema";
import type { Employee } from "./employee-types";

export interface  CreateEmployeeResponse {
  userId: number,
  firstName: string,
  lastName: string,
  cpf: string,
  internalCode: string,
  email: string,
  isActive: true,
  createdAt: string,
  updatedAt: string
}

export async function createEmployee(data: CreateEmployeeSchemaType) {
  return Api.fetch<CreateEmployeeSchemaType, CreateEmployeeResponse>({
    method: "POST",
    endpoint: "/employees",
    data,
  });
}

export async function fetchEmployees() {
  return Api.fetch<undefined, Employee[]>({
    method: "GET",
    endpoint: "/employees",
  });
}

export async function fetchEmployessById(userId: number) {
  return Api.fetch<undefined, Employee>({
    method: "GET",
    endpoint: `/employees/${userId}`,
  });
}

export async function deleteEmployees(userId: number) {
  return Api.fetch<undefined, void>({
    method: "DELETE",
    endpoint: `/employees/${userId}`,
  });
}