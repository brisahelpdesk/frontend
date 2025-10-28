import { InternalLink } from "@/components/internal-link";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetClientById } from "@/features/client/hooks/use-get-client-by-id";

export function TicketDetailsClient(props: { id?: number }) {
  const { data, isLoading, error } = useGetClientById(props.id);

  if (!props.id) {
    return (
      <div className="flex justify-between">
        <span className="text-slate-600">Solicitante:</span>
        <span className="text-slate-900">N/A</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-between">
        <span className="text-slate-600">Solicitante:</span>
        <Skeleton className="h-4 w-32" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-between">
        <span className="text-slate-600">Solicitante:</span>
        <span className="text-red-500">Erro ao carregar</span>
      </div>
    );
  }

  return (
    <div className="flex justify-between">
      <span className="text-slate-600">Solicitante:</span>
      <span className="text-slate-900">
        <InternalLink href={`/app/clients/${data?.userId}`}>
          {data?.name}
        </InternalLink>
      </span>
    </div>
  );
}