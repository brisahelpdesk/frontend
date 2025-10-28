import { useQuery } from "@tanstack/react-query";
import { fetchSLAById } from "../services/sla.service";
import type { SLA } from "../models/sla.types";

export function useFetchSLAById(slaId?: number) {
  const { data, isLoading, error } = useQuery<SLA | null>({
    queryKey: ["sla", slaId],
    queryFn: () => fetchSLAById(slaId!),
    enabled: !!slaId,
  });

  return { sla: data, isLoading, error };
}