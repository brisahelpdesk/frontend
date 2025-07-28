import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQueryClient } from "@tanstack/react-query";
import { Edit, MoreHorizontal, Package, Trash2 } from "lucide-react";
import { ProductTableSkeleton } from "./product-table-skeleton";
import { useFetchProducts } from "../hook/use-fetch-products";
import type { Category } from "./select-product-category";

const getTypeBadge = (type: string) => {
  return type === "product" ? (
    <Badge
      variant="outline"
      className="bg-blue-50 text-blue-700 border-blue-200"
    >
      Produto
    </Badge>
  ) : (
    <Badge
      variant="outline"
      className="bg-purple-50 text-purple-700 border-purple-200"
    >
      Serviço
    </Badge>
  );
};

export function ProductTable() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useFetchProducts();
  const categories = queryClient.getQueryData<Category[]>(["categories"]) || [];

  if (isLoading) return <ProductTableSkeleton />;

  return (
    <Card className="mt-6 shadow-none">
      <CardHeader>
        <CardTitle>Lista de Produtos e Serviços</CardTitle>
        <CardDescription>Mostrando 5 de 5 itens</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((product) => {
                const {
                  id,
                  name,
                  description,
                  type,
                  categoryId,
                  isActive,
                  createdAt,
                } = product;

                return (
                  <TableRow key={id}>
                    <TableCell className="font-medium">{id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{name}</div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(type)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {categories.find((cat) => cat.id === categoryId)?.name}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }
                      >
                        {isActive ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(createdAt).toLocaleDateString("pt-BR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {data?.length === 0 && (
          <div className="text-center py-8">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Nenhum produto encontrado
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Tente ajustar os filtros ou adicione um novo produto.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
