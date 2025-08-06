import { AppPageHeader } from "@/components/app-page-header";
import { UserCheck, Users, UserX } from "lucide-react";
import { Stat } from "@/components/stat";
import { CreateUser } from "./components/create-user";
import { UserFilter } from "./components/user-filter";
import { UserCard } from "./components/user-card";

const statsCards = [
  {
    title: "Total de Usuários",
    value: 156,
    icon: Users,
    color: "from-blue-500 to-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    title: "Usuários Ativos",
    value: 142,
    icon: UserCheck,
    color: "from-green-500 to-green-600",
    iconBg: "bg-green-100",
  },
  {
    title: "Usuários Inativos",
    value: 14,
    icon: UserX,
    color: "from-red-500 to-red-600",
    iconBg: "bg-red-100",
  },
];

const usersData = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@empresa.com",
    phone: "(11) 99999-1234",
    department: "TI",
    role: "Técnico",
    status: "Ativo",
    lastLogin: "2024-01-16",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2023-03-15",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria.santos@empresa.com",
    phone: "(11) 99999-5678",
    department: "Financeiro",
    role: "Analista",
    status: "Ativo",
    lastLogin: "2024-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2023-01-20",
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro.costa@empresa.com",
    phone: "(11) 99999-9012",
    department: "RH",
    role: "Gerente",
    status: "Ativo",
    lastLogin: "2024-01-16",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2022-11-10",
  },
  {
    id: 4,
    name: "Ana Oliveira",
    email: "ana.oliveira@empresa.com",
    phone: "(11) 99999-3456",
    department: "TI",
    role: "Administrador",
    status: "Ativo",
    lastLogin: "2024-01-16",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2022-08-05",
  },
  {
    id: 5,
    name: "Carlos Lima",
    email: "carlos.lima@empresa.com",
    phone: "(11) 99999-7890",
    department: "Administrativo",
    role: "Usuário",
    status: "Inativo",
    lastLogin: "2024-01-10",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2023-06-12",
  },
  {
    id: 6,
    name: "Fernanda Rocha",
    email: "fernanda.rocha@empresa.com",
    phone: "(11) 99999-2468",
    department: "Marketing",
    role: "Analista",
    status: "Ativo",
    lastLogin: "2024-01-16",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2023-09-18",
  },
];

export function UsersPage() {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <AppPageHeader
          name="Gerenciamento de Usuários"
          description="Visualize e gerencie todos os usuários do sistema"
        />
        <CreateUser />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statsCards.map((card, index) => (
          <Stat
            key={index}
            label={card.title}
            value={card.value}
            icon={card.icon}
          />
        ))}
      </div>

      <UserFilter />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {usersData.map((user) => <UserCard key={user.id} {...user} />)}
      </div>
    </>
  );
}
