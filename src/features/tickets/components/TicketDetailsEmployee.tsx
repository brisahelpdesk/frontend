import { InternalLink } from "@/components/internal-link";
import { useFetchEmployeeById } from "@/features/employee/hooks/use-fetch-employee-by-id";

export function TicketDetailsEmployee(props: { id?: number }) {
  if (!props.id) {
    return (
      <div className="flex justify-between">
        <span className="text-slate-600">Técnico:</span>
        <span className="text-slate-900">Não atribuído</span>
      </div>
    );
  }

  const { user } = useFetchEmployeeById(props.id);

  return (
    <div className="flex justify-between">
      <span className="text-slate-600">Técnico:</span>
      <span className="text-slate-900">
        <InternalLink href={`/app/employees/${user?.id}`}>
          {user?.firstName + " " + user?.lastName}
        </InternalLink>
      </span>
    </div>
  );
}
