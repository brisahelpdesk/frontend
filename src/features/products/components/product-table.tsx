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
import { Edit, MoreHorizontal, Package, Trash2 } from "lucide-react";
import { useFetchProducts } from "../hook/use-fetch-products";

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
  const { data } = useFetchProducts();

  const totalItems = data?.totalItems || 0;
  const startPage = data?.page ? (data.page - 1) * data.perPage + 1 : 1;
  const endPage = data?.page ? data.page * data.perPage : 0;

  if (data?.totalItems === 0)
    return (
      <Card className="mt-6 shadow-none">
        <CardHeader>
          <CardTitle>Lista de Produtos e Serviços</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Nenhum produto encontrado
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Tente ajustar os filtros ou adicione um novo produto.
            </p>
          </div>
        </CardContent>
      </Card>
    );

  return (
    <Card className="mt-6 shadow-none">
      <CardHeader>
        <CardTitle>Lista de Produtos e Serviços</CardTitle>
        <CardDescription>
          Mostrando {startPage} de{" "}
          {endPage > totalItems ? data?.totalItems : endPage} itens
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.items?.map((product) => {
                const { id, name, description, type, isActive, createdAt } =
                  product;

                return (
                  <TableRow key={id}>
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
                        {product.expand.category?.name}
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
      </CardContent>
    </Card>
  );
}
