import { Navigate } from "react-router";
import { useAuthStore } from "../auth-store";
import { getInitialRoute } from "../auth-utils";

/**
 * Componente para redirecionar a rota raiz (/) baseado no tipo de usuário
 * - Cliente → /client-portal
 * - Funcionário → /app
 * - Não autenticado → /auth/login
 */
export function RootRedirect() {
  const { user, token } = useAuthStore();

  // Se não estiver autenticado, redireciona para login
  if (!user || !token) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redireciona baseado no tipo de usuário
  const route = getInitialRoute(user.roles);
  return <Navigate to={route} replace />;
}
