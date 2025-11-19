import { Api } from "@/lib/axios";
import type { Client } from "./client-types";
import type { Pagination } from "@/types/pagination";
import type { CreateClientSchemaType } from "./client-schema";

export interface  CreateClientResponse {
  userId: number,
  name: string,
  cpf: string,
  internalCode: string,
  email: string,
  isActive: true,
  createdAt: string,
  updatedAt: string
}

export async function createClient(data: CreateClientSchemaType) {
  return Api.fetch<CreateClientSchemaType, CreateClientResponse>({
    method: "POST",
    endpoint: "/clients",
    data,
  });
}

export function getClientById(clientId: number) {
  return Api.fetch<undefined, Client>({
    method: "GET",
    endpoint: `/clients/${clientId}`,
  });
}

export async function fetchClients() {
  return Api.fetch<undefined, Pagination<Client>>({
    method: "GET",
    endpoint: "/clients"
  });
}