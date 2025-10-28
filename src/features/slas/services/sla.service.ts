import { Api } from "@/lib/axios";
import type { SLA, CreateSLAData } from "../models/sla.types";

export async function fetchSLAs() {
  return Api.fetch<undefined, SLA[]>({
    method: "GET",
    endpoint: "/slas",
  });
}

export async function createSLA(data: CreateSLAData) {
  return Api.fetch<CreateSLAData, SLA>({
    method: "POST",
    endpoint: "/slas",
    data,
  });
}

export async function fetchSLAById(slaId: number) {
  return Api.fetch<undefined, SLA>({
    method: "GET",
    endpoint: `/slas/${slaId}`,
  });
}

export async function updateSLA(slaId: number, data: Partial<CreateSLAData>) {
  return Api.fetch<Partial<CreateSLAData>, SLA>({
    method: "PUT",
    endpoint: `/slas/${slaId}`,
    data,
  });
}

export async function deleteSLA(slaId: number) {
  return Api.fetch<undefined, void>({
    method: "DELETE",
    endpoint: `/slas/${slaId}`,
  });
}