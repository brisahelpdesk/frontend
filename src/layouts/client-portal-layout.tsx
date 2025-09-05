import { ClientPortalHeader } from "@/components/client-portal-header";
import { Outlet } from "react-router";


export function ClientPortalLayout() {
  return (
    <div className="bg-slate-50">
      <ClientPortalHeader />
      <Outlet />
    </div>
  );
}
