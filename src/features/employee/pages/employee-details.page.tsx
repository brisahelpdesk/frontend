import { AppPageHeader } from "@/components/app-page-header";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useDeleteEmployee } from "../hooks/use-delete-employee";
import { useFetchEmployeeById } from "../hooks/use-fetch-employee-by-id";
import { EmployeeDetailsLoading } from "../components/employee-details-loading.component";
import NotFound from "@/components/notfound";
import { useCallback } from "react";
import { useAuth } from "@/features/auth/hook/use-auth";

export function EmployeeDetailsPage() {
  const { employeeId } = useParams();
  const { isAdmin, isSupervisor } = useAuth();
  const { employee, isLoading, isError, isNotFound } =
    useFetchEmployeeById(employeeId);
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

  const createdDate = employee.createdAt
    ? new Date(employee.createdAt).toLocaleDateString()
    : "";
  const updatedDate = employee.updatedAt
    ? new Date(employee.updatedAt).toLocaleDateString()
    : "";

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <AppPageHeader
          name={`${employee.firstName} ${employee.lastName}`}
          description={`Criado em: ${createdDate} - Última atualização: ${updatedDate}`}
        />

        <div className="flex gap-2">
          {(isAdmin() || isSupervisor()) && (
            <>
              <Button variant="outline">
                <Edit className="w-4 h-4" />
                Editar
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash className="w-4 h-4" />
                Excluir
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-card p-6 rounded-md border">
          <h3 className="text-lg font-semibold mb-4">Informações do Funcionário</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div>
              <dt className="text-muted-foreground">Username</dt>
              <dd className="font-medium">{employee.username || "-"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Nome</dt>
              <dd className="font-medium">{employee.firstName} {employee.lastName}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">CPF</dt>
              <dd className="font-medium">{employee.cpf || "-"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">E-mail</dt>
              <dd className="font-medium">{employee.email || "-"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Criado em</dt>
              <dd className="font-medium">{createdDate}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Atualizado em</dt>
              <dd className="font-medium">{updatedDate}</dd>
            </div>
          </dl>
        </section>

        <section className="bg-card p-6 rounded-md border">
          <h3 className="text-lg font-semibold mb-4">Permissões e Status</h3>
          <div className="space-y-3 text-sm">
            <div>
              <dt className="text-muted-foreground">Roles</dt>
              <dd className="font-medium">
                {Array.isArray((employee as any).roles) && (employee as any).roles.length > 0 ? (
                  (employee as any).roles.map((r: any, idx: number) => (
                    <span key={idx} className="inline-block mr-2 px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                      {typeof r === "string" ? r : r.name || JSON.stringify(r)}
                    </span>
                  ))
                ) : (
                  <span className="font-medium">-</span>
                )}
              </dd>
            </div>

            {Array.isArray((employee as any).authorities) && (
              <div>
                <dt className="text-muted-foreground">Authorities</dt>
                <dd className="font-medium">
                  {(employee as any).authorities.map((a: any, i: number) => (
                    <span key={i} className="inline-block mr-2 px-2 py-0.5 rounded-md bg-muted text-muted-foreground">{a.authority}</span>
                  ))}
                </dd>
              </div>
            )}

            <div>
              <dt className="text-muted-foreground">Ativo</dt>
              <dd className="font-medium">{employee.isActive ? "Sim" : "Não"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Senha alterada</dt>
              <dd className="font-medium">{employee.isPasswordChanged ? "Sim" : "Não"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Conta bloqueada</dt>
              <dd className="font-medium">{(employee as any).accountNonLocked === false ? "Sim" : "Não"}</dd>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
