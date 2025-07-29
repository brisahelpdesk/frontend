import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Skeleton } from "../../../components/ui/skeleton";
import type { SelectProps } from "@radix-ui/react-select";
import { useFetchCategories } from "../hook/use-fetch-categories";

export type Category = {
  id: number;
  name: string;
};

export function SelectCategory(props: SelectProps) {
  const { data, error, isLoading } = useFetchCategories();

  if (error) return null;

  if (isLoading) {
    return (
      <div className="w-full space-y-2">
        <Skeleton className="h-[14px] w-1/2" />
        <Skeleton className="h-9 w-full" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      <Label>Categoria</Label>

      <Select {...props} defaultValue="all">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Todas as categorias" />
        </SelectTrigger>
        <SelectContent>
          {props.children}
          {data?.items?.map(({ name, id }) => (
            <SelectItem key={id + "category"} value={id.toString()}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
