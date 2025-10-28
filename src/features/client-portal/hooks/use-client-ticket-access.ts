import { useGetTicketById } from "@/features/tickets/hooks/use-get-ticket-by-id.hook";
import { useAuthStore } from "@/features/auth/auth-store";
import { useMemo } from "react";

interface UseClientTicketAccessReturn {
  data: ReturnType<typeof useGetTicketById>["data"];
  isLoading: boolean;
  error: ReturnType<typeof useGetTicketById>["error"];
  hasAccess: boolean;
  isValidating: boolean;
}

/**
 * Hook para validar o acesso do cliente ao ticket
 * Verifica se o ticket pertence ao cliente logado
 */
export function useClientTicketAccess(ticketId: string): UseClientTicketAccessReturn {
  const { data, isLoading, error } = useGetTicketById(ticketId);
  const { user } = useAuthStore();

  const hasAccess = useMemo(() => {
    if (!data || !user) return false;
    return data.requesterId === user.id;
  }, [data, user]);

  const isValidating = isLoading || !user;

  return {
    data,
    isLoading,
    error,
    hasAccess,
    isValidating,
  };
}
