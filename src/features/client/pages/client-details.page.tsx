import { AppPageHeader } from "@/components/app-page-header";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useParams } from "react-router";
import { useFetchClientById } from "../hooks/use-fetch-client-by-id";
import NotFound from "@/components/notfound";
import { Skeleton } from "@/components/ui/skeleton";

function ClientDetailsLoading() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-80" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    </div>
  );
}

export function ClientDetailsPage() {
  const { clientId } = useParams();
  const { data: client, isLoading, error } = useFetchClientById(clientId);

  if (isLoading) {
    return <ClientDetailsLoading />;
  }

  if (error || !client) {
    return (
      <NotFound
        title="Cliente não encontrado"
        description="O cliente que você tentou acessar não existe, foi removido ou o identificador está incorreto."
        linkText="Voltar para Clientes"
        linkHref="/app/clients"
      />
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <AppPageHeader
          name={client.name}
          description={`Criado em: ${client.createdDate} - Última atualização: ${client.updatedDate}`}
        />

        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="w-4 h-4" />
            Editar
          </Button>
          <Button variant="destructive">
            <Trash className="w-4 h-4" />
            Excluir
          </Button>
        </div>
      </div>
    </>
  );
}