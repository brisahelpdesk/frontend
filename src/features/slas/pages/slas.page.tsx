import { memo } from "react";
import { AppPageHeader } from "@/components/app-page-header";
import { SLAList } from "../components/sla-list.component";
import { CreateSLAModal } from "../components/create-sla-modal.component";

export const SLAsPage = memo(function SLAsPage() {
  return (
    <>
      <div className="w-full space-y-6 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <AppPageHeader
            name="SLAs"
            description="Gerenciar acordos de nível de serviço"
          />

          <div className="flex gap-2">
            <CreateSLAModal />
          </div>
        </div>
        <SLAList />
      </div>
    </>
  );
});
