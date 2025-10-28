import { AppPageHeader } from "@/components/app-page-header";
import { ClientList } from "../components/client-list.component";

export function ClientPage() {
  return (
    <div>
      <AppPageHeader
        name="Clientes"
        description="Bem-vindo ao sistema de gerenciamento de clientes"
      />
      <ClientList />
    </div>
  );
}
