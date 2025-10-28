import { InternalLink } from "@/components/internal-link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell } from "@/components/ui/table";
import { useFetchEmployeeById } from "@/features/employee/hooks/use-fetch-employee-by-id";

interface Props {
  employeeId: number;
}

export function TicketTableCellEmployee({ employeeId }: Props) {
  const { employee } = useFetchEmployeeById(employeeId);

  return (
    <TableCell>
      <div className="flex items-center gap-2">
        <InternalLink href={`/app/employees/${employeeId}`} className="flex items-center gap-2">
        <Avatar className="h-6 w-6">
          <AvatarImage src="" />
          <AvatarFallback className="bg-slate-200 text-slate-700 text-xs">
            {employee?.firstName[0].toUpperCase()}
            {employee?.lastName[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="text-slate-700 text-sm">{employee?.firstName} {employee?.lastName}</span>
        </InternalLink>
      </div>
    </TableCell>
  );
}
