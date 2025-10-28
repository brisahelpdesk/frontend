import { Navigate } from "react-router";
import { useAuthStore } from "../auth-store";
import { isEmployee } from "../auth-utils";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Componente que protege rotas que requerem autenticação de funcionário
 * Redireciona para login se não autenticado
 * Redireciona para client-portal se for cliente
 */
export function ProtectedEmployeeRoute({ children }: ProtectedRouteProps) {
  const { user, token } = useAuthStore();

  // Se não estiver autenticado, redireciona para login
  if (!user || !token) {
    return <Navigate to="/auth/login" replace />;
  }

  // Se for cliente, redireciona para portal do cliente
  if (!isEmployee(user.roles)) {
    return <Navigate to="/client-portal" replace />;
  }

  // Se for funcionário, permite acesso
  return <>{children}</>;
}
