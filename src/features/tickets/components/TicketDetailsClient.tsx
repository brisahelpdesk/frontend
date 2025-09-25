import { InternalLink } from "@/components/internal-link";
import { useGetClientById } from "@/features/client/hooks/use-get-client-by-id";

export function TicketDetailsClient(props: {id?: number}) {
  if(!props.id) {
    return (
      <div className="flex justify-between">
        <span className="text-slate-600">Solicitante:</span>
        <span className="text-slate-900">N/A</span>
      </div>
    )
  }

  const { data } = useGetClientById(props.id);

  return (
    <div className="flex justify-between">
      <span className="text-slate-600">Solicitante:</span>
      <span className="text-slate-900">
        <InternalLink href={`/app/clients/${data?.userId}`}>
          {data?.name}
        </InternalLink>
      </span>
    </div>
  )
}