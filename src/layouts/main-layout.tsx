import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router";

export function MainLayout(): React.ReactNode {
  return (
    <AppSidebar>
      <div className="flex flex-col w-full">
        <AppHeader />
        <main className="w-full">
          <div className="w-full max-w-7xl mx-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </AppSidebar>
  );
}
