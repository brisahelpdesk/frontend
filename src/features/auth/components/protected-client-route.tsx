import { Navigate } from "react-router";
import { useAuthStore } from "../auth-store";
import { isClient } from "../auth-utils";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Componente que protege rotas que requerem autenticação de cliente
 * Redireciona para login se não autenticado
 * Redireciona para app se for funcionário
 */
export function ProtectedClientRoute({ children }: ProtectedRouteProps) {
  const { user, token } = useAuthStore();

  // Se não estiver autenticado, redireciona para login
  if (!user || !token) {
    return <Navigate to="/auth/login" replace />;
  }

  // Se for funcionário, redireciona para app
  if (!isClient(user.roles)) {
    return <Navigate to="/app" replace />;
  }

  // Se for cliente, permite acesso
  return <>{children}</>;
}
