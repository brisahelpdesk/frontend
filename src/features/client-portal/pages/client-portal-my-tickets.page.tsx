import { useParams, Navigate, Link } from "react-router";
import { useClientTicketAccess } from "../hooks/use-client-ticket-access";
import { ClientTicketDetailsEmployee } from "../components/client-ticket-details-employee.component";
import { ClientTicketDetailsProduct } from "../components/client-ticket-details-product.component";
import { ClientTicketDetailsStatus } from "../components/client-ticket-details-status.component";
import { ClientTicketComments } from "../components/client-ticket-comments.component";
import { ClientTicketDetailsSkeleton } from "../components/client-ticket-details-skeleton.component";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Calendar,
  ShieldAlert,
  ArrowLeft,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ClientPortalMyTicket() {
  const params = useParams();
  const ticketId = params.ticketId;
  const { data, isLoading, error, hasAccess, isValidating } =
    useClientTicketAccess(ticketId || "");

  // Validação de acesso - verificar se o ticket pertence ao cliente logado
  if (!isValidating && !hasAccess && data) {
    return (
      <div className="h-screen w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Alert variant="destructive">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Acesso Negado</AlertTitle>
          <AlertDescription>
            Você não tem permissão para visualizar este ticket.
            Redirecionando...
          </AlertDescription>
        </Alert>
        <Navigate to="/client-portal" replace />
      </div>
    );
  }

  if (isLoading) {
    return <ClientTicketDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="h-screen w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Erro ao carregar os detalhes do ticket. Por favor, tente novamente.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-screen w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Ticket não encontrado.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const formattedDate = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div className="space-y-2 px-6  flex justify-between items-start">
          <div className="space-y-2"> 
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              {data.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>Aberto em {formattedDate}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-slate-600 hover:text-slate-900 -ml-2"
            >
              <Link to="/client-portal">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar para Meus Tickets
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Descrição do Problema
              </h2>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {data.description}
                </p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
              <ClientTicketComments
                ticketId={Number(ticketId)}
                comments={data.chat?.messages || []}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm sticky top-6">
              <h2 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide">
                Informações do Ticket
              </h2>
              <div className="space-y-4 text-sm">
                <ClientTicketDetailsStatus status={data.status} />

                <Separator />

                <div className="flex justify-between">
                  <span className="text-slate-600">Prioridade:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${data.priorityClassName}`}
                  >
                    {data.priority}
                  </span>
                </div>

                <Separator />

                <ClientTicketDetailsEmployee id={data.responsibleEmployeeId} />

                <Separator />

                <ClientTicketDetailsProduct id={data.productId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
