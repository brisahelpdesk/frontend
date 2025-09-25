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
import { DepartmentFilter } from "./department-filter";
import { useFilterEmployeeActions, useFiltersEmployee } from "../hooks/use-filter-employee";

export function EmployeeFilter() {
  const filters = useFiltersEmployee();
  const actions = useFilterEmployeeActions();

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
            onClick={() => actions.resetFilter()}
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
              placeholder="Buscar funcionários..."
              className="pl-10 bg-slate-50 border-slate-200 focus:border-blue-500"
              value={filters.search ?? ""}
              onChange={(e) => actions.setSearch(e.target.value)}
            />
          </div>
          
          <Select disabled>
            <SelectTrigger className="bg-slate-50 border-slate-200">
              <SelectValue placeholder="Cargo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">Usuário</SelectItem>
            </SelectContent>
          </Select>

          <DepartmentFilter />

          {/* <Select
            value={filters.departmentId ?? "all"}
            onValueChange={(value) => actions.setDepartmentId(value)}
          >
            <SelectTrigger
              className="bg-slate-50 border-slate-200"
              value={filters.departmentId}
            >
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
          </Select> */}

          <Select
            value={filters.status ?? "all"}
            onValueChange={(value) => actions.setStatus(value)}
          >
            <SelectTrigger className="bg-slate-50 border-slate-200">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="true">Ativo</SelectItem>
              <SelectItem value="false">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
