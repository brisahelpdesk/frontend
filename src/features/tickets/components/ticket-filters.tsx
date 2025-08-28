import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search } from "lucide-react";
import { useState } from "react";

export function TicketFilters() {
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    priority: "all",
    technician: "all",
  })

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "all",
      priority: "all",
      technician: "all",
    })
  }
  
  return (
    <Card className="mb-8 border border-slate-200 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center text-slate-900">
            <Filter className="w-5 h-5 mr-2 text-blue-600" />
            Filtros
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="text-slate-600 hover:bg-slate-50"
          >
            Limpar Filtros
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Buscar tickets..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="pl-10 bg-slate-50 border-slate-200 focus:border-blue-500"
            />
          </div>

          <Select
            value={filters.status}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, status: value }))
            }
          >
            <SelectTrigger className="bg-slate-50 border-slate-200">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="novo">Novo</SelectItem>
              <SelectItem value="in-progress">Em Andamento</SelectItem>
              <SelectItem value="in-progress">Aguardando Cliente</SelectItem>
              <SelectItem value="in-progress">Aguardando Terceiros</SelectItem>
              <SelectItem value="resolved">Resolvido</SelectItem>
              <SelectItem value="open">Reaberto</SelectItem>
              <SelectItem value="pending">Cancelado</SelectItem>
              <SelectItem value="pending">Encerrado</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.priority}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, priority: value }))
            }
          >
            <SelectTrigger className="bg-slate-50 border-slate-200">
              <SelectValue placeholder="Prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="critical">Crítica</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
              <SelectItem value="medium">Média</SelectItem>
              <SelectItem value="low">Baixa</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.technician}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, technician: value }))
            }
          >
            <SelectTrigger className="bg-slate-50 border-slate-200">
              <SelectValue placeholder="Técnico" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="joao">João Silva</SelectItem>
              <SelectItem value="maria">Maria Santos</SelectItem>
              <SelectItem value="pedro">Pedro Costa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
