import { AppPageHeader } from "@/components/app-page-header";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useParams } from "react-router";
import { useFetchClientById } from "../hooks/use-fetch-client-by-id";
import NotFound from "@/components/notfound";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/features/auth/hook/use-auth";

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
  const { isAdmin, isSupervisor } = useAuth();
  const { data: client, isLoading, error } = useFetchClientById(clientId);

  const created = client?.createdAt
    ? new Date(client.createdAt).toLocaleDateString()
    : "N/A";

  const update = client?.updatedAt
    ? new Date(client.updatedAt).toLocaleDateString()
    : "N/A";

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
          description={`Criado em: ${created} - Última atualização: ${update}`}
        />

        {(isAdmin() || isSupervisor()) && (
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
        )}
      </div>
      
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-card p-6 rounded-md border">
          <h3 className="text-lg font-semibold mb-4">Informações do Cliente</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div>
              <dt className="text-muted-foreground">ID</dt>
              <dd className="font-medium">{client.userId}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Nome</dt>
              <dd className="font-medium">{client.name || "-"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Endereço</dt>
              <dd className="font-medium">{client.address || "-"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Telefone</dt>
              <dd className="font-medium">{client.phone || "-"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">E-mail</dt>
              <dd className="font-medium">{client.email || "-"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Status</dt>
              <dd className="font-medium">{client.status ? "Ativo" : "Inativo"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Criado em</dt>
              <dd className="font-medium">{created}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Atualizado em</dt>
              <dd className="font-medium">{update}</dd>
            </div>
          </dl>
        </section>

        <section className="bg-card p-6 rounded-md border">
          <h3 className="text-lg font-semibold mb-4">Flags e Metadados</h3>
          <div className="space-y-3 text-sm">
            <div>
              <dt className="text-muted-foreground">Ativo</dt>
              <dd className="font-medium">{client.isActive ? "Sim" : "Não"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Email</dt>
              <dd className="font-medium">{client.email || "-"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Observações</dt>
              <dd className="font-medium">-</dd>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
