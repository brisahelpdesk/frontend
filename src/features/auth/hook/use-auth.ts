import { useNavigate } from "react-router";
import { useAuthStore } from "../auth-store";
import type { LoginCredentials } from "../auth-types";
import { useAuthForm } from "./use-auth-form";
import { getInitialRoute } from "../auth-utils";

export const useAuth = () => {
  const navigate = useNavigate();
  const store = useAuthStore();
  const form = useAuthForm();

  const handleLogin = async (credentials: LoginCredentials) => {
    await store.login(credentials);
    if (store.isAuthenticated && store.user) {
      // Redirecionar baseado no tipo de usuário
      const route = getInitialRoute(store.user.roles);
      navigate(route, { replace: true });
    }
  };

  const handleLoginSubmit = form.handleSubmit(handleLogin);

  return {
    user: store.user,
    isAuthenticated: !!store.user && !!store.token,
    isLoading: store.isLoading,
    form,
    login: handleLoginSubmit,
    logout: store.logout,
  };
};