import type { ReactNode } from "react";
import { useAuth } from "../hook/use-auth";
import { Navigate, useLocation } from "react-router";

export interface ProtectRouterProps {
  children: ReactNode;
  roles?: string[];
}

export function ProtectRouter(props: ProtectRouterProps) {
  const { children, roles } = props;
  const { hasRole, isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  const hasRequiredRole = roles ? hasRole(roles) : true;

  if (!hasRequiredRole) {
    return <Navigate to="/auth/unauthorized" state={{ from: location }} />;
  }

  return children
}