import { AppPageHeader } from "@/components/app-page-header";
import { useLoaderData } from "react-router";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useDeleteEmployee } from "../hooks/use-delete-employee";

// TODO - Implement user details page with more information
// TODO - ADD erro notfound
// TODO - ADD loading state

export function EmployeeDetailsPage() {
  const {
    id,
    firstName,
    lastName,
    createdAt,
    updatedAt,
  } = useLoaderData();

  const { deleteUser } = useDeleteEmployee(id);

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
