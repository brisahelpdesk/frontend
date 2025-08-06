import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function UserFilter() {
  return (
    <Card className="mt-6 shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-[6px]">
            <CardTitle>Filtros</CardTitle>
            <CardDescription>
              Use os filtros para encontrar produtos e serviços específicos
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-slate-600 hover:bg-slate-50"
            type="reset"
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
              placeholder="Buscar usuários..."
              className="pl-10 bg-slate-50 border-slate-200 focus:border-blue-500"
            />
          </div>

          <Select>
            <SelectTrigger className="bg-slate-50 border-slate-200">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="ti">TI</SelectItem>
              <SelectItem value="financeiro">Financeiro</SelectItem>
              <SelectItem value="rh">RH</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="administrativo">Administrativo</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="bg-slate-50 border-slate-200">
              <SelectValue placeholder="Perfil" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="admin">Atedente</SelectItem>
              <SelectItem value="analyst">Supervisor</SelectItem>
              <SelectItem value="user">Admin</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="bg-slate-50 border-slate-200">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
