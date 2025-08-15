import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFiltersUser, useFilterUserActions } from "../hooks/use-filter-user";
import { useFetchDepartments } from "@/features/department/hooks/use-fetch-departments";

export function DepartmentFilter() {
  const { departmentId } = useFiltersUser();
  const { setDepartmentId } = useFilterUserActions();
  const { departments } = useFetchDepartments();

  return (
    <Select
      value={departmentId ?? "all"}
      onValueChange={(value) => setDepartmentId(value)}
    >
      <SelectTrigger
        className="bg-slate-50 border-slate-200"
        value={departmentId}
        disabled={!departments}
      >
        <SelectValue placeholder="Departamento" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todos</SelectItem>
        {departments?.map((dept) => (
          <SelectItem key={dept.id} value={dept.id.toString()}>
            {dept.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
