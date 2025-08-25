import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { useAuth } from "@/features/auth/hook/use-auth";
import { Navigate, Outlet, useLocation } from "react-router";

export function MainLayout(): React.ReactNode {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

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
