import { useFetchEmployees } from "../hooks/use-fetch-employees";
import { EmployeeCard } from "./employee-card.component";


export function EmployeeList() {
  const { users } = useFetchEmployees();

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users?.map((user) => (
        <EmployeeCard 
          key={user.id + "user-card-list"} 
          id={user.id}
          name={`${user.firstName} ${user.lastName}`}
          email={user.email}
          department={user?.department?.name}
          status={user.isActive ? "Ativo" : "Inativo"}
          lastLogin={new Date().toLocaleDateString("pt-BR")} 
          phone="(11) 99999-9999"
          role="Usuário"
        />
      ))}
    </div>
  );
}
