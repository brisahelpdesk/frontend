import { AppPageHeader } from "@/components/app-page-header";
import { CreateTicketModal } from "../components/create-ticket-modal";
import { TicketFilters } from "../components/ticket-filters";
import { TicketTable } from "../components/ticket-table";

export function TicketsPage() {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <AppPageHeader
          name="Tickets"
          description="Visualize e gerencie todos os tickets do sistema"
        />
        <CreateTicketModal />
      </div>
      <TicketFilters />
      <TicketTable />
    </>
  );
}
