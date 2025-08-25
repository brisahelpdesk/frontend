import {
  ChartLine,
  ChartNoAxesColumn,
  Package,
  Settings,
  Ticket,
  Timer,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "./ui/sidebar";
import { Link } from "react-router";
import { AppSidebarLink } from "./app-sidebar-link";

const menuItems = [
  { title: "Dashboard", url: "/app", Icon: ChartNoAxesColumn },
  { title: "Tickets", url: "tickets", Icon: Ticket },
  { title: "Usuários", url: "users", Icon: Users },
  { title: "SLAs", url: "slas", Icon: Timer },
  { title: "Relatórios", url: "reports", Icon: ChartLine },
  { title: "Produtos/Serviços", url: "products", Icon: Package },
];

interface AppSidebarProps {
  children?: React.ReactNode;
}

export function AppSidebar(props: AppSidebarProps): React.ReactNode {
   return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="py-3 px-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <div>
              <h1 className="font-bold text-slate-900">Helpdesk</h1>
              <p className="text-xs text-slate-500">Sistema de Chamados</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <AppSidebarLink
                        icon={<item.Icon className="w-5 h-5" />}
                        title={item.title}
                        url={item.url}
                      />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  to="/settings"
                  className="flex items-center gap-3 px-3 py-5 rounded-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                >
                  <span className="text-lg">
                    <Settings className="w-5 h-5" />
                  </span>
                  <span className="font-medium">Configurações</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{props.children}</SidebarInset>
    </SidebarProvider>
  );
}
