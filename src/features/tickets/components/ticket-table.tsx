import { InternalLink } from "@/components/internal-link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ticketsData = [
  {
    id: "001",
    title: "Sistema lento na tela de login",
    status: "Aberto",
    priority: "Alta",
    technician: "João Silva",
    department: "TI",
    created: "2024-01-15",
    updated: "2024-01-16",
    description:
      "Usuários relatam lentidão significativa ao fazer login no sistema principal. O problema afeta principalmente o horário de pico (8h-10h).",
    requester: "Carlos Mendes",
    category: "Sistema",
  },
  {
    id: "002",
    title: "Erro ao gerar relatório mensal",
    status: "Em Andamento",
    priority: "Média",
    technician: "Maria Santos",
    department: "Financeiro",
    created: "2024-01-14",
    updated: "2024-01-16",
    description:
      "Sistema apresenta erro 500 ao tentar gerar relatório financeiro mensal. Erro ocorre consistentemente.",
    requester: "Ana Silva",
    category: "Relatório",
  },
  {
    id: "003",
    title: "Solicitação de novo usuário",
    status: "Pendente",
    priority: "Baixa",
    technician: "Pedro Costa",
    department: "RH",
    created: "2024-01-13",
    updated: "2024-01-15",
    description: "Solicitação de criação de novo usuário para funcionário recém-contratado no departamento de vendas.",
    requester: "Roberto Lima",
    category: "Acesso",
  },
]

const getStatusBadge = (status: string) => {
    const variants = {
      Aberto: "bg-blue-100 text-blue-800 border-blue-200",
      "Em Andamento": "bg-yellow-100 text-yellow-800 border-yellow-200",
      Pendente: "bg-orange-100 text-orange-800 border-orange-200",
      Crítico: "bg-red-100 text-red-800 border-red-200",
      Resolvido: "bg-green-100 text-green-800 border-green-200",
    }
    return <Badge className={`${variants[status as keyof typeof variants]} border font-medium`}>{status}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const colors = {
      Crítica: "bg-red-50 text-red-700 border-red-200",
      Alta: "bg-orange-50 text-orange-700 border-orange-200",
      Média: "bg-yellow-50 text-yellow-700 border-yellow-200",
      Baixa: "bg-green-50 text-green-700 border-green-200",
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[priority as keyof typeof colors]}`}>
        {priority}
      </span>
    )
  }

export function TicketTable() { 
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
            <TableBody >
              {ticketsData.map((ticket) => (
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
                  <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                  <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {ticket.updated}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={console.log}
                      className="mx-auto text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      asChild
                    >
                      <InternalLink href={ticket.id}>
                        Visualizar
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
            Mostrando 1-{ticketsData.length} de 42 tickets
          </p>
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
        </div>
      </CardContent>
    </Card>
  );
}
