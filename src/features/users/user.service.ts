import { Api } from "@/lib/axios";
import type { CreateUserSchemaType } from "./user.schema";
import type { User } from "./user.model";
import type { FilterState } from "./hooks/use-filter-user";

export async function createUser(data: CreateUserSchemaType) {
  return Api.fetch<CreateUserSchemaType, User>({
    method: "POST",
    endpoint: "/employees",
    data,
  });
}

export async function fetchUsers(filters: FilterState) {
  return Api.fetch<void, User[]>({
    method: "GET",
    endpoint: "/employees",
    params: {
      search: filters.search,
      departmentId: filters.departmentId,
      isActive: filters.status,
    }
  });
}

export async function fetchUserById(userId: string) {
  return Api.fetch<void, User>({
    method: "GET",
    endpoint: `/employees/${userId}`,
  });
}

export async function deleteUser(userId: string) {
  return Api.fetch<void, void>({
    method: "DELETE",
    endpoint: `/employees/${userId}`,
  });
}