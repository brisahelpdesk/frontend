import { Skeleton } from "@/components/ui/skeleton";
import { useFetchEmployeeById } from "@/features/employee/hooks/use-fetch-employee-by-id";
import { memo } from "react";

interface ClientTicketDetailsEmployeeProps {
  id?: number;
}

export const ClientTicketDetailsEmployee = memo(function ClientTicketDetailsEmployee({ 
  id 
}: ClientTicketDetailsEmployeeProps) {
  const { user, isLoading, error } = useFetchEmployeeById(id);

  if (!id) {
    return (
      <div className="flex justify-between">
        <span className="text-slate-600">Técnico Responsável:</span>
        <span className="text-slate-500 italic">Não atribuído</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-between">
        <span className="text-slate-600">Técnico Responsável:</span>
        <Skeleton className="h-4 w-32" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-between">
        <span className="text-slate-600">Técnico Responsável:</span>
        <span className="text-red-500">Erro ao carregar</span>
      </div>
    );
  }

  return (
    <div className="flex justify-between">
      <span className="text-slate-600">Técnico Responsável:</span>
      <span className="text-slate-900 font-medium">
        {user?.firstName} {user?.lastName}
      </span>
    </div>
  );
});

