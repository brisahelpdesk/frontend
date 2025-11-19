import { memo } from "react";
import { AppPageHeader } from "@/components/app-page-header";
import { SLAList } from "../components/sla-list.component";
import { CreateSLAModal } from "../components/create-sla-modal.component";
import { useAuth } from "@/features/auth/hook/use-auth";

export const SLAsPage = memo(function SLAsPage() {
  const { isAdmin } = useAuth();

  return (
    <>
      <div className="w-full space-y-6 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <AppPageHeader
            name="SLAs"
            description="Gerenciar acordos de nível de serviço"
          />

          <div className="flex gap-2">{isAdmin() && <CreateSLAModal />}</div>
        </div>
        <SLAList />
      </div>
    </>
  );
});
