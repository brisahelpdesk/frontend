import { AppPageHeader } from "@/components/app-page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Badge, MessageSquare, Paperclip, Send } from "lucide-react";
import { useParams } from "react-router";
import { Label } from "recharts";

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
    description:
      "Solicitação de criação de novo usuário para funcionário recém-contratado no departamento de vendas.",
    requester: "Roberto Lima",
    category: "Acesso",
  },
];

const commentsData = [
  {
    id: 1,
    user: "João Silva",
    avatar: "/placeholder.svg?height=32&width=32",
    date: "16/01/2024 14:32",
    content:
      "Iniciei a análise do problema. Identifiquei que o servidor de aplicação está com alta utilização de CPU durante os horários de pico.",
    type: "comment",
  },
  {
    id: 2,
    user: "Sistema",
    avatar: "/placeholder.svg?height=32&width=32",
    date: "16/01/2024 15:00",
    content: "Status alterado de 'Novo' para 'Em Andamento'",
    type: "system",
  },
  {
    id: 3,
    user: "Maria Santos",
    avatar: "/placeholder.svg?height=32&width=32",
    date: "16/01/2024 15:45",
    content:
      "Reiniciei o serviço e estou monitorando o desempenho. Implementei cache temporário para melhorar a performance.",
    type: "comment",
  },
]

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

export function TicketDetailsPage(): React.ReactNode {
  const params = useParams();
  const ticketId = params.ticketId;

  const selectedTicket = ticketsData.find((t) => t.id === ticketId);

  return (
    <>
      <AppPageHeader
        name={`#${ticketId} - ${selectedTicket?.title}`}
        description={`Detalhes sobre o ticket #${ticketId}`}
      />
      <div className="space-y-6">
        {/* Detalhes do Ticket */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Informações do Ticket
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Solicitante:</span>
                <span className="text-slate-900 font-medium">
                  {selectedTicket?.requester}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Categoria:</span>
                <span className="text-slate-900">
                  {selectedTicket?.category}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Departamento:</span>
                <span className="text-slate-900">
                  {selectedTicket?.department}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Prioridade:</span>
                {getPriorityBadge(selectedTicket?.priority || "Baixa")}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Descrição
            </h3>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-700">
              {selectedTicket?.description}
            </div>
          </div>
        </div>

        <Separator />

        {/* Área de Comentários */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
            Histórico e Comentários
          </h3>

          <div className="space-y-4 mb-6">
            {commentsData.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-slate-200 text-slate-700 text-xs">
                    {comment.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-slate-900">
                      {comment.user}
                    </span>
                    <span className="text-xs text-slate-500">
                      {comment.date}
                    </span>
                    {comment.type === "system" && (
                      <Badge className="text-xs">
                        Sistema
                      </Badge>
                    )}
                  </div>
                  <div
                    className={`text-sm p-3 rounded-lg ${
                      comment.type === "system"
                        ? "bg-blue-50 text-blue-800 border border-blue-200"
                        : "bg-white text-slate-700 border border-slate-200"
                    }`}
                  >
                    {comment.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Adicionar Comentário */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <Label
              className="text-sm font-medium text-slate-700"
            >
              Adicionar comentário
            </Label>
            <Textarea
              id="comment"
              placeholder="Digite seu comentário..."
              className="resize-none bg-white border-slate-200 focus:border-blue-500"
              rows={3}
            />
            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm" className="border-slate-200">
                <Paperclip className="w-4 h-4 mr-2" />
                Anexar Arquivo
              </Button>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Comentar
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Botões de Ação */}
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
            <Button className="bg-blue-600 hover:bg-blue-700">
              Salvar Alterações
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
