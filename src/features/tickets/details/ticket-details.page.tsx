import { AppPageHeader } from "@/components/app-page-header";
import { useParams } from "react-router";

export function TicketDetailsPage(): React.ReactNode {
  const params = useParams();
  const ticketId = params.ticketId?.toUpperCase();

  return (
    <>
      <AppPageHeader
        name={`#${ticketId} - Sistema lento na tela de login`}
        description={`Detalhes sobre o ticket #${ticketId}`}
      />
    </>
  )
}