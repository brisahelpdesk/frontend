import { InternalLink } from "@/components/internal-link";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchProductById } from "@/features/products/hook/use-fetch-product-by-id";

export function TicketDetailsProduct(props: { id?: number }) {
  const { product, isLoading, error } = useFetchProductById(props.id);
  if (!props.id)
    return (
      <div className="flex justify-between">
        <span className="text-slate-600">Produto:</span>
        <span className="text-slate-900">N/A</span>
      </div>
    );

  if (isLoading) {
    return (
      <div className="flex justify-between">
        <span className="text-slate-600">Produto:</span>
        <Skeleton className="h-4 w-32" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-between">
        <span className="text-slate-600">Produto:</span>
        <span className="text-red-500">Erro ao carregar</span>
      </div>
    );
  }

  return (
    <div className="flex justify-between">
      <span className="text-slate-600">Produto:</span>
      <span className="text-slate-900">
        <InternalLink href={`/app/products/${product?.id}`}>
          {product?.name}
        </InternalLink>
      </span>
    </div>
  );
}
