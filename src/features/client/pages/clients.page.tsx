import { AppPageHeader } from "@/components/app-page-header";
import { ClientList } from "../components/client-list.component";
import { CreateClient } from "../components/create-client.component";

export function ClientPage() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <AppPageHeader
          name="Clientes"
          description="Bem-vindo ao sistema de gerenciamento de clientes"
        />
        <CreateClient />
      </div>
      <ClientList />
    </div>
  );
}
