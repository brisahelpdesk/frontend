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
import { useGetTickets } from "../hooks/use-get-tickets.hook";
import type { Ticket } from "../ticket.types";
import { TicketTableCellEmployee } from "./ticket-table-cell-employee.component";
import { useTicketPagination } from "../hooks/use-tickets-pagination.hook";

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
  const { page, nextPage, previousPage } = useTicketPagination();
  const { data } = useGetTickets(page);


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
                <TableHead className="text-slate-700 font-semibold">
                  Técnico
                </TableHead>
                <TableHead className="text-slate-700 font-semibold">
                  Atualizado
                </TableHead>
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
                  <TicketTableCellEmployee
                    employeeId={ticket.responsibleEmployeeId}
                  />
                  <TableCell className="text-slate-600">
                    {ticket?.updatedAt
                      ? new Date(ticket.updatedAt).toLocaleDateString("pt-BR")
                      : "-"}
                  </TableCell>
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
          <p className="text-sm text-slate-400 font-medium">
            <span className="text-slate-700">Página: </span>{page + 1} de {data?.totalPages ?? 1}{" "} 
            <span className="text-slate-700">| Total de tickets: </span>{data?.totalElements ?? 0}
          </p>
          {data && data.totalPages > 1 && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 0}
                className="border-slate-200"
                onClick={previousPage}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-200"
                disabled={page === data.totalPages - 1}
                onClick={() => nextPage(data.totalPages)}
              >
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
