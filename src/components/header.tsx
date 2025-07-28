import { Bell, Search } from "lucide-react";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Header(): React.ReactNode {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex h-16 items-center gap-4 px-6">
        <SidebarTrigger className="text-slate-600 hover:text-slate-900" />

        {/* Search */}
        <div className="flex-1 max-w-md ml-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Buscar tickets, usuários..."
              className="pl-10 bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="px-2 py-2 flex items-center gap-2 hover:bg-slate-100"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium text-slate-900 leading-3">
                    Admin User
                  </p>
                  <p className="text-xs text-slate-500">admin@helpdesk.com</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuItem>Suporte</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
