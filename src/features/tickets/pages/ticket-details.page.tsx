import { AppPageHeader } from "@/components/app-page-header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router";
import { useGetTicketById } from "../hooks/use-get-ticket-by-id.hook";
import { TicketDetailsClient } from "../components/ticket-details-client.component";
import { TicketDetailsEmployee } from "../components/ticket-details-employee.component";
import { TicketDetailsProduct } from "../components/ticket-details-product.component";
import { TicketComments } from "../components/ticket-comments.components";

export function TicketDetailsPage(): React.ReactNode {
  const params = useParams();
  const ticketId = params.ticketId;
  const { data } = useGetTicketById(ticketId || "");

  return (
    <>
      <AppPageHeader
        name={`#${ticketId} - ${data?.title}`}
        description={`Detalhes sobre o ticket #${ticketId}`}
      />
      <div className="space-y-6 d">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Informações do Ticket
            </h3>
            <div className="space-y-3 text-sm">
              {/* 
              <div className="flex justify-between">
                <span className="text-slate-600">Categoria:</span>
                <span className="text-slate-900">
                  {data?.category || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Departamento:</span>
                <span className="text-slate-900">
                  {data?.department || "N/A"}
                </span>
              </div> */}
              <TicketDetailsClient id={data?.requesterId} />
              <TicketDetailsEmployee id={data?.responsibleEmployeeId} />
              <TicketDetailsProduct id={data?.productId} />
              <div className="flex justify-between">
                <span className="text-slate-600">Prioridade:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${data?.priorityClassName}`}
                >
                  {data?.priority}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Descrição
            </h3>
            <div className="h-full bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-700">
              {data?.description}
            </div>
          </div>
        </div>

        <Separator />

        <TicketComments 
          ticketId={Number(ticketId)} 
          comments={data?.chat?.messages || []} 
          responsibleEmployeeId={data?.responsibleEmployeeId}
        />
      
        <Separator />

        <div className="flex flex-wrap justify-between gap-3 pt-2">
          <div className="flex gap-2">
            <Button variant="outline" className="border-slate-200">
              Atribuir Técnico
            </Button>
            <Button variant="outline" className="border-slate-200">
              Alterar Status
            </Button>
            <Button variant="outline" className="border-slate-200">
              Alterar Prioridade
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              Fechar Ticket
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
