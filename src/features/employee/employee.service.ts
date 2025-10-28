import { Api } from "@/lib/axios";
import type { CreateEmployeeSchemaType } from "./employee-schema";
import type { Employee } from "./employee-types";
import type { FilterState } from "./hooks/use-filter-employee";


export async function createEmployee(data: CreateEmployeeSchemaType) {
  return Api.fetch<CreateEmployeeSchemaType, Employee>({
    method: "POST",
    endpoint: "/employees",
    data,
  });
}

export async function fetchEmployees(filters: FilterState) {
  return Api.fetch<undefined, Employee[]>({
    method: "GET",
    endpoint: "/employees",
    params: {
      search: filters.search,
      departmentId: filters.departmentId,
      status: filters.status,
    },
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