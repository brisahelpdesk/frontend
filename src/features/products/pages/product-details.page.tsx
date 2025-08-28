import { AppPageHeader } from "@/components/app-page-header";
import { useParams } from "react-router";
import { useFetchProductById } from "../hook/use-fetch-product-by-id";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useDeleteProduct } from "../hook/use-delete-product";
import NotFound from "@/components/notfound";
import { ProductDetailsLoading } from "../components/product-details-loading";

// TODO - Implement product details page with more information
// TODO - ADD erro notfound
// TODO - ADD loading state

export function ProductDetailsPage() {
  const productId = useParams().productId;

  const { product, isLoading, error } = useFetchProductById(productId || "");
  const { deleteProduct } = useDeleteProduct(productId || "");

  if (!productId) return null;
  if (isLoading) return <ProductDetailsLoading />;
  if (error) {
    return <NotFound 
      title="Produto não encontrado"
      description="O produto que você tentou acessar não existe, foi removido ou o identificador está incorreto."
      linkText="Voltar para Produtos"
      linkHref="/products"
    />;
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <AppPageHeader
          name={product?.name || "Detalhes do Produto"}
          description={`Data de criação: ${product?.createdAt} e última atualização: ${product?.updatedAt}`}
        />
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
      </div>
    </>
  );
}
