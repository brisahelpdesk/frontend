import { InternalLink } from "@/components/internal-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useGetTickets } from "../hooks/use-get-tickets";
import type { Ticket } from "../ticket-types";

const getStatusBadge = (status: string) => {
  const variants = {
    Aberto: "bg-blue-100 text-blue-800 border-blue-200",
    "Em Andamento": "bg-yellow-100 text-yellow-800 border-yellow-200",
    Pendente: "bg-orange-100 text-orange-800 border-orange-200",
    Crítico: "bg-red-100 text-red-800 border-red-200",
    Resolvido: "bg-green-100 text-green-800 border-green-200",
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

const getPriorityBadge = (priority: string) => {
  const colors = {
    Crítica: "bg-red-50 text-red-700 border-red-200",
    Alta: "bg-orange-50 text-orange-700 border-orange-200",
    Média: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Baixa: "bg-green-50 text-green-700 border-green-200",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${
        colors[priority as keyof typeof colors]
      }`}
    >
      {priority}
    </span>
  );
};

export function TicketTable() {
  const { data } = useGetTickets();

  return (
    <Card className="p-0 border border-slate-200 shadow-sm">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 bg-slate-50">
                <TableHead className="text-center pl-3 py-4 text-slate-700 font-semibold">
                  ID
                </TableHead>
                <TableHead className="text-slate-700 font-semibold">
                  Título
                </TableHead>
                <TableHead className="text-slate-700 font-semibold">
                  Status
                </TableHead>
                <TableHead className="text-slate-700 font-semibold">
                  Prioridade
                </TableHead>
                {/* <TableHead className="text-slate-700 font-semibold">
                  Técnico
                </TableHead> 
                <TableHead className="text-slate-700 font-semibold">
                  Atualizado
                </TableHead>*/}
                <TableHead className="text-center text-slate-700 font-semibold ">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.content?.map((ticket: Ticket) => (
                <TableRow
                  key={ticket.id}
                  className="border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <TableCell className="text-center font-mono text-sm font-medium text-slate-900">
                    {ticket.id}
                  </TableCell>
                  <TableCell className="text-slate-900 font-medium max-w-xs truncate">
                    {ticket.title}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(ticket.status ?? "Em Andamento")}
                  </TableCell>
                  <TableCell>
                    {getPriorityBadge(ticket.priority ?? "Baixo")}
                  </TableCell>
                  {/* <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" />
                        <AvatarFallback className="bg-slate-200 text-slate-700 text-xs">
                          {ticket.technician
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-slate-700 text-sm">
                        {ticket.technician}
                      </span>
                    </div>
                  </TableCell> */}
                  {/* <TableCell className="text-slate-600">
                    {ticket.updated}
                  </TableCell> */}
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={console.log}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <InternalLink
                        className="flex gap-1 items-center"
                        href={`${ticket.id}`}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </InternalLink>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between p-6 border-t border-slate-200">
          <p className="text-sm text-slate-600">
            Mostrando {(data?.number || 0) + 1}-{data?.totalPages} de{" "}
            {data?.totalElements} tickets
          </p>
          {data && data.totalPages > 1 && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="border-slate-200"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Anterior
              </Button>
              <Button variant="outline" size="sm" className="border-slate-200">
                Próximo
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
