import { InternalLink } from "@/components/internal-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import { Eye, Search, Star } from "lucide-react";
import type { Ticket } from "@/features/tickets/ticket.types";
import { useGetTickets } from "@/features/tickets/hooks/use-get-tickets.hook";

export function ClientPortalTickets() {
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

  return (
    <TabsContent value="tickets" className="space-y-6">
      <Card className="border border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-xl text-slate-900">
              Meus Chamados
            </CardTitle>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Buscar chamados..."
                  className="pl-10 w-64"
                />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="open">Abertos</SelectItem>
                  <SelectItem value="in-progress">Em Andamento</SelectItem>
                  <SelectItem value="resolved">Resolvidos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="text-slate-700 font-semibold">
                    Chamado
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
                    Criado
                  </TableHead>
                  <TableHead className="text-slate-700 font-semibold text-right">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.content?.map((ticket: Ticket) => (
                  <TableRow
                    key={ticket.id}
                    className="border-slate-100 hover:bg-slate-50"
                  >
                    <TableCell className="font-mono text-sm font-medium text-slate-900">
                      {ticket.id}
                    </TableCell>
                    <TableCell className="text-slate-900 font-medium max-w-xs truncate">
                      {ticket.title}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(ticket?.status ?? "Em Andamento")}
                    </TableCell>
                    <TableCell>
                      {getPriorityBadge(ticket?.priority ?? "Baixa")}
                    </TableCell>
                    {ticket.createdAt && (
                      <TableCell className="text-slate-600">
                        {new Date(ticket.createdAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })}
                      </TableCell>
                    )}
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
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
                        {ticket.status === "Resolvido" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:text-green-700"
                            asChild
                          >
                            <InternalLink href="#">
                              <Star className="w-4 h-4 mr-1" />
                              Avaliar
                            </InternalLink>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
