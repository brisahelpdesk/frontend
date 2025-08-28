import { useFetchUsers } from "../hooks/use-fetch-users";
import { UserCard } from "./user-card";

export function UserList() {
  const { users } = useFetchUsers();

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users?.map((user) => (
        <UserCard 
          key={user.id} 
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
