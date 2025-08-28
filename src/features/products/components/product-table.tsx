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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Package } from "lucide-react";
import { useFetchProducts } from "../hook/use-fetch-products";
import { InternalLink } from "@/components/internal-link";

const getTypeBadge = (type: string) => {
  return type === "PRODUCT" ? (
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

  if (data?.length === 0)
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
        <CardDescription>Mostrando 4 de 4 itens</CardDescription>
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
                <TableHead>Físico</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((product) => {
                const { id, name, description, type, isActive, createdAt } =
                  product;

                return (
                  <TableRow key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell className="w-full max-w-2/5">
                      <div>
                        <div className="font-medium">{name}</div>
                        <div className="text-sm text-gray-500 max-w-full truncate">
                          {description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(type)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product?.category?.name}</Badge>
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
                      <Badge
                        variant="outline"
                        className={
                          product.isPhysical
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }
                      >
                        {product.isPhysical ? "Sim" : "Não"}
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
                      <InternalLink href={`${id}`}>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          title="Ações"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </InternalLink>
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
