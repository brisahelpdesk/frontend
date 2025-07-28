import {
  ChartLine,
  ChartNoAxesColumn,
  Package,
  Settings,
  Ticket,
  Timer,
  Users,
} from "lucide-react";


export const appRoutes = [
  {
    icon: ChartNoAxesColumn,
    path: "/",
    name: "Dashboard",
  },
  {
    icon: Ticket,
    path: "/tickets",
    name: "Tickets",
  },
  {
    icon: Users,
    path: "/users",
    name: "Usuários",
  },
  {
    icon: Timer,
    path: "/slas",
    name: "Gerenciamento de SLAs",
  },
  {
    icon: ChartLine,
    path: "/reports",
    name: "Dashboard de Relatórios",
  },
  {
    icon: Package,
    path: "/products",
    name: "Produtos e Serviços",
  },
  {
    icon: Settings,
    path: "/settings",
    name: "Configurações do Sistema",
  },
];

export type AppRoutesType = typeof appRoutes[number];