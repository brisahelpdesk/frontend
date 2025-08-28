import type { ReactNode } from "react";
import { useAuth } from "../hook/use-auth";
import { Navigate, useLocation } from "react-router";

export interface ProtectRouterProps {
  children: ReactNode;
  roles?: string[];
}

export function ProtectRouter(props: ProtectRouterProps) {
  const { children } = props;
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  return children
}