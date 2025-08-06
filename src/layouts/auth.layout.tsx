import { useAuth } from "@/features/auth/hook/use-auth";
import type { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

export function AuthLayout(): ReactNode {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  return (
    <main className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Outlet />
    </main>
  );
}
