import { AppPageHeader } from "@/components/app-page-header";
import { useParams } from "react-router";
import { useFetchProductById } from "../hook/use-fetch-product-by-id";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useDeleteProduct } from "../hook/use-delete-product";
import NotFound from "@/components/notfound";
import { ProductDetailsLoading } from "../components/product-details-loading";
import { useAuth } from "@/features/auth/hook/use-auth";

export function ProductDetailsPage() {
  const productId = Number(useParams().productId);
  const { product, isLoading, error } = useFetchProductById(productId);
  const { deleteProduct } = useDeleteProduct(productId);
  const { isAdmin } = useAuth();

  if (!productId) return null;
  if (isLoading) return <ProductDetailsLoading />;
  if (error) {
    return (
      <NotFound
        title="Produto não encontrado"
        description="O produto que você tentou acessar não existe, foi removido ou o identificador está incorreto."
        linkText="Voltar para Produtos"
        linkHref="/products"
      />
    );
  }

  const createdAt = product?.createdAt
    ? new Date(product.createdAt).toLocaleDateString()
    : "N/A";

  const updatedAt = product?.updatedAt
    ? new Date(product.updatedAt).toLocaleDateString()
    : "N/A";

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <AppPageHeader
          name={product?.name || "Detalhes do Produto"}
          description={`Data de criação: ${createdAt} e última atualização: ${updatedAt}`}
        />
        {
          isAdmin() &&
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="w-4 h-4" />
              Editar
            </Button>
            <Button variant="destructive" onClick={() => deleteProduct()}>
              <Trash className="w-4 h-4" />
              Excluir
            </Button>
          </div>
        }
      </div>
      
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-card p-6 rounded-md border">
          <h3 className="text-lg font-semibold mb-4">Informações do Produto</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div>
              <dt className="text-muted-foreground">ID</dt>
              <dd className="font-medium">{product?.id ?? "-"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Código Interno</dt>
              <dd className="font-medium">{(product as any)?.internalCode || (product as any)?.internalId || "-"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Nome</dt>
              <dd className="font-medium">{product?.name || "-"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Ativo</dt>
              <dd className="font-medium">{product?.isActive ? "Sim" : "Não"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Descrição</dt>
              <dd className="font-medium">{product?.description || "-"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Produto físico</dt>
              <dd className="font-medium">{product?.isPhysical ? "Sim" : "Não"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Criado em</dt>
              <dd className="font-medium">{product?.createdAt ? new Date(product.createdAt).toLocaleDateString() : "-"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Atualizado em</dt>
              <dd className="font-medium">{product?.updatedAt ? new Date(product.updatedAt).toLocaleDateString() : "-"}</dd>
            </div>
          </dl>
        </section>

        <section className="bg-card p-6 rounded-md border">
          <h3 className="text-lg font-semibold mb-4">Categoria e Metadados</h3>
          <div className="space-y-3 text-sm">
            <div>
              <dt className="text-muted-foreground">Categoria</dt>
              <dd className="font-medium">{(product as any)?.category?.name || "-"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Categoria - descrição</dt>
              <dd className="font-medium">{(product as any)?.category?.description || "-"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Categoria criada</dt>
              <dd className="font-medium">{(product as any)?.category?.createdAt ? new Date((product as any).category.createdAt).toLocaleDateString() : "-"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Categoria atualizada</dt>
              <dd className="font-medium">{(product as any)?.category?.updatedAt ? new Date((product as any).category.updatedAt).toLocaleDateString() : "-"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Categoria ID</dt>
              <dd className="font-medium">{(product as any)?.category?.id ?? (product as any)?.categoryId ?? "-"}</dd>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
