import { AppPageHeader } from "@/components/app-page-header";
import { useParams } from "react-router";

export function ClientPortalMyTicket() {
  const params = useParams();
  const ticketId = params.ticketId;

  return (
    <div className="h-screen w-full max-w-7xl mx-auto px-9 py-6">
      <AppPageHeader
        name={`#${ticketId} - Detalhes do Ticket`}
        description={`Detalhes sobre o ticket #${ticketId}`}
      />
    </div>
  );
}
