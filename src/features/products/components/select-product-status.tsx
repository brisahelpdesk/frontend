import type { SelectProps } from "@radix-ui/react-select";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";

export function SelectProductStatus(props: SelectProps) {
  return (
    <div className="space-y-2">
      <Label>Status</Label>
      <Select {...props} defaultValue="all">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Todos os status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os status</SelectItem>
          <SelectItem value="true">Ativos</SelectItem>
          <SelectItem value="false">Inativos</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
