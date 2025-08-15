import { AppPageHeader } from "@/components/app-page-header";
import { useParams } from "react-router";
import { useFetchUserById } from "../hooks/use-fetch-user-by-id";
import NotFound from "@/components/notfound";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { UserDetailsLoading } from "../components/user-details-loading";
import { useDeleteUser } from "../hooks/use-delete-user";

// TODO - Implement user details page with more information
// TODO - ADD erro notfound
// TODO - ADD loading state

export function UserDetailsPage() {
  const userId = useParams().userId;

  const { user, isLoading, error } = useFetchUserById(userId || '');
  const { deleteUser } = useDeleteUser(userId || '');

  if (isLoading) return <UserDetailsLoading />;

  if (error) {
    return (
      <NotFound
        title="Usuário não encontrado"
        description="O usuário que você tentou acessar não existe, foi removido ou o identificador está incorreto."
        linkText="Voltar para Usuários"
        linkHref="/users"
      />
    );
  }
  
  const { firstName, lastName, createdAt, updatedAt } = user || {};

  const createdDate = createdAt ? new Date(createdAt).toLocaleDateString() : '';
  const updatedDate = updatedAt ? new Date(updatedAt).toLocaleDateString() : '';

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <AppPageHeader
          name={`${firstName} ${lastName}`}
          description={`Criado em: ${createdDate} - Última atualização: ${updatedDate}`}
        />

        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="w-4 h-4" />
            Editar
          </Button>
          <Button variant="destructive" onClick={deleteUser}>
            <Trash className="w-4 h-4" />
            Excluir
          </Button>
        </div>
      </div>
    </>
  );
}
