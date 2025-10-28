import { Api } from "@/lib/axios";
import type { Client } from "./client-types";
import type { Pagination } from "@/types/pagination";

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