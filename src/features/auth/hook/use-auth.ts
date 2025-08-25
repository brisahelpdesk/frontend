import { useNavigate } from "react-router";
import { useAuthStore } from "../auth-store";
import type { LoginCredentials } from "../auth-types";
import { useAuthForm } from "./use-auth-form";

export const useAuth = () => {
  const navigate = useNavigate();
  const store = useAuthStore();
  const form = useAuthForm();

  const handleLogin = async (credentials: LoginCredentials) => {
    await store.login(credentials);
    if (store.isAuthenticated) {
      navigate("/app");
    }
  };

  const handleLoginSubmit = form.handleSubmit(handleLogin);

  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    
    form,
    
    login: handleLoginSubmit,
    logout: store.logout,
    
    initializeAuth: store.initializeAuth,
  };
};