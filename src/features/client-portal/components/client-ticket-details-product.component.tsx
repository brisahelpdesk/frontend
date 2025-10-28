import { Skeleton } from "@/components/ui/skeleton";
import { useFetchProductById } from "@/features/products/hook/use-fetch-product-by-id";
import { memo } from "react";

interface ClientTicketDetailsProductProps {
  id?: number;
}

export const ClientTicketDetailsProduct = memo(function ClientTicketDetailsProduct({ 
  id 
}: ClientTicketDetailsProductProps) {
  const { product, isLoading, error } = useFetchProductById(id);
  
  if (!id) {
    return (
      <div className="flex justify-between">
        <span className="text-slate-600">Produto:</span>
        <span className="text-slate-500 italic">N/A</span>
      </div>
    );
  }

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
      <span className="text-slate-900 font-medium">{product?.name}</span>
    </div>
  );
});

