import { InternalLink } from "@/components/internal-link";
import { useFetchEmployeeById } from "@/features/employee/hooks/use-fetch-employee-by-id";
import { Skeleton } from "@/components/ui/skeleton";

export function TicketDetailsEmployee(props: { id?: number }) {
  const { user, isLoading, error } = useFetchEmployeeById(props.id);

  if (!props.id) {
    return (
      <div className="flex justify-between">
        <span className="text-slate-600">Técnico:</span>
        <span className="text-slate-900">Não atribuído</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-between">
        <span className="text-slate-600">Técnico:</span>
        <Skeleton className="h-4 w-32" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-between">
        <span className="text-slate-600">Técnico:</span>
        <span className="text-red-500">Erro ao carregar</span>
      </div>
    );
  }

  return (
    <div className="flex justify-between">
      <span className="text-slate-600">Técnico:</span>
      <span className="text-slate-900">
        <InternalLink href={`/app/employees/${user?.id}`}>
          {user?.firstName} {user?.lastName}
        </InternalLink>
      </span>
    </div>
  );
}
