import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientPortalOverview } from "../components/client-portal-overview";
import { ClientPortalTickets } from "../components/client-portal-tickets";
import { ClientPortalNewTicket } from "../components/client-portal-new-ticket";

export function ClientPortalPage() {  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full max-w-md sm:w-auto grid-cols-3 bg-slate-100">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
          >
            Visão Geral
          </TabsTrigger>
          <TabsTrigger
            value="tickets"
            className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
          >
            Meus Chamados
          </TabsTrigger>
          <TabsTrigger
            value="new-ticket"
            className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
          >
            Novo Chamado
          </TabsTrigger>
        </TabsList>
        <ClientPortalOverview />
        <ClientPortalTickets />
        <ClientPortalNewTicket />
      </Tabs>
    </div>
  );
}
