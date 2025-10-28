import { AppPageHeader } from "@/components/app-page-header";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useDeleteEmployee } from "../hooks/use-delete-employee";
import { useFetchEmployeeById } from "../hooks/use-fetch-employee-by-id";
import { EmployeeDetailsLoading } from "../components/employee-details-loading.component";
import NotFound from "@/components/notfound";
import { useCallback } from "react";

export function EmployeeDetailsPage() {
  const { employeeId } = useParams();
  const { employee, isLoading, isError, isNotFound } = useFetchEmployeeById(employeeId);
  const { deleteUser } = useDeleteEmployee(employee?.id || 0);

  const handleDelete = useCallback(() => {
    if (employee?.id) {
      deleteUser();
    }
  }, [deleteUser, employee?.id]);

  if (isLoading) {
    return <EmployeeDetailsLoading />;
  }

  if (isNotFound || (isError && !employee)) {
    return (
      <NotFound
        title="Funcionário não encontrado"
        description="O funcionário que você tentou acessar não existe, foi removido ou o identificador está incorreto."
        linkText="Voltar para Funcionários"
        linkHref="/app/employees"
      />
    );
  }

  if (!employee) {
    return <EmployeeDetailsLoading />;
  }

  const createdDate = employee.createdAt ? new Date(employee.createdAt).toLocaleDateString() : '';
  const updatedDate = employee.updatedAt ? new Date(employee.updatedAt).toLocaleDateString() : '';

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <AppPageHeader
          name={`${employee.firstName} ${employee.lastName}`}
          description={`Criado em: ${createdDate} - Última atualização: ${updatedDate}`}
        />

        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="w-4 h-4" />
            Editar
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash className="w-4 h-4" />
            Excluir
          </Button>
        </div>
      </div>
    </>
  );
}
