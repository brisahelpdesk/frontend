import { AppPageHeader } from "@/components/app-page-header";
import { UserCheck, Users, UserX } from "lucide-react";
import { Stat } from "@/components/stat";
import { CreateEmployee } from "../components/create-employee";
import { EmployeeFilter } from "../components/employee-filter";
import { EmployeeList } from "../components/employee-list";

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

export function EmployeePage() {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <AppPageHeader
          name="Gerenciamento de Usuários"
          description="Visualize e gerencie todos os usuários do sistema"
        />
        <CreateEmployee />
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

      <EmployeeFilter />
      <EmployeeList />
    </>
  );
}
