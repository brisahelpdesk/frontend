import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import {
  FileText,
  Clock,
  Building,
  AlertCircle,
  Eye,
  CheckCircle,
} from "lucide-react";
import { useGetTickets } from "../hooks/use-get-tickets";
import type { Ticket } from "@/features/tickets/ticket-types";
import { InternalLink } from "@/components/internal-link";

export function ClientPortalOverview() {
  const { data } = useGetTickets();

  const getStatusBadge = (status: string) => {
    const variants = {
      "Em Andamento": "bg-blue-100 text-blue-800 border-blue-200",
      "Aguardando Cliente": "bg-yellow-100 text-yellow-800 border-yellow-200",
      Resolvido: "bg-green-100 text-green-800 border-green-200",
      Crítico: "bg-red-100 text-red-800 border-red-200",
      Aberto: "bg-slate-100 text-slate-800 border-slate-200",
    };
    return (
      <Badge
        className={`${
          variants[status as keyof typeof variants]
        } border font-medium`}
      >
        {status}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Em Andamento":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "Resolvido":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Crítico":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <TabsContent value="overview" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border border-slate-200 shadow-sm">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Chamados Este Mês
                </p>
                <p className="text-2xl font-bold text-slate-900">{12}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Tempo Médio Resposta
                </p>
                <p className="text-2xl font-bold text-slate-900">2,5hrs</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Plano Contratado
                </p>
                <p className="text-2xl font-bold text-slate-900">Premium</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Chamados Abertos
                </p>
                <p className="text-2xl font-bold text-slate-900">3</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chamados Recentes */}
      <Card className="border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-slate-900">
            Chamados Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data?.slice(0, 3).map((ticket: Ticket) => (
              <div
                key={ticket.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200"
              >
                <div className="flex items-center gap-4">
                  {getStatusIcon(ticket.status ?? "Em Andamento")}
                  <div>
                    <h3 className="font-medium text-slate-900">
                      {ticket.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      #{ticket.id.toString().padStart(3, "0")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(ticket.status ?? "Em Andamento")}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={console.log}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <InternalLink
                      className="flex gap-1 items-center"
                      href={`/client-portal/tickets/${ticket.id}`}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver
                    </InternalLink>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
