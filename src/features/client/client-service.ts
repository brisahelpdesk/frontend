import { Api } from "@/lib/axios";
import type { Client } from "./client-types";

export function getClientById(clientId: number) {
  return Api.fetch<undefined, Client>({
    method: "GET",
    endpoint: `/clients/${clientId}`,
  });
}