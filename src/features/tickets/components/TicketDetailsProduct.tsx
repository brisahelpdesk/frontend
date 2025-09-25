import { InternalLink } from "@/components/internal-link";
import { useFetchProductById } from "@/features/products/hook/use-fetch-product-by-id";

export function TicketDetailsProduct(props: { id?: number }) {
  if (!props.id)
    return (
      <div className="flex justify-between">
        <span className="text-slate-600">Produto:</span>
        <span className="text-slate-900">N/A</span>
      </div>
    );

  const { product } = useFetchProductById(props.id);

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
