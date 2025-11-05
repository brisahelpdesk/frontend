import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { toast } from "sonner";
import type { AuthState, LoginCredentials } from "./auth-types";
import type { Employee as User } from "../employee/employee-types";
import { login } from "./auth-services";
import { getUserType } from "./auth-utils";

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    immer((set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginCredentials) => {
        try {
          set((state) => {
            state.isLoading = true;
          });

          const response = await login(credentials);

          if (!response.roles || response.roles.length === 0) {
            set((state) => {
              state.isLoading = false;
            });

            toast.error("Acesso negado", {
              description: "Usuário sem permissões válidas. Entre em contato com o administrador.",
              duration: 5000,
              richColors: true,
            });

            throw new Error("Usuário sem roles válidas");
          }

          const userType = getUserType(response.roles);
          
          if (userType === 'unknown') {
            set((state) => {
              state.isLoading = false;
            });

            toast.error("Acesso negado", {
              description: "Tipo de usuário não reconhecido. Entre em contato com o administrador.",
              duration: 5000,
              richColors: true,
            });

            throw new Error("Tipo de usuário não reconhecido");
          }

          set((state) => {
            state.user = {
              id: response.userId,
              firstName: response.name,
              lastName: "",
              cpf: response.cpf,
              email: "",
              department: { id: 0, name: "" },
              isPasswordChanged: true,
              isActive: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              roles: response.roles, // Armazenar roles do usuário
            };
            state.token = response.jwt;
            state.isAuthenticated = true;
            state.isLoading = false;
          });

          toast.success(`Bem-vindo de volta, ${response.name}!`, {
            description: "Você está logado com sucesso.",
            duration: 4000,
            richColors: true,
          });
        } catch (error) {
          set((state) => {
            state.isLoading = false;
          });

          const errorMessage =
            error instanceof Error ? error.message : "Erro desconhecido";

          toast.error(`Erro ao fazer login: ${errorMessage}`, {
            description:
              "Por favor, verifique suas credenciais e tente novamente.",
            duration: 4000,
            richColors: true,
          });

          throw error;
        }
      },

      logout: () => {
        set((state) => {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        });

        toast.success("Você saiu com sucesso.", {
          duration: 4000,
          richColors: true,
        });
      },

      setUser: (user: User) => {
        set((state) => {
          state.user = user;
          state.isAuthenticated = !!user;
        });
      },

      setToken: (token: string) => {
        set((state) => {
          state.token = token;
        });
      },

      setLoading: (loading: boolean) => {
        set((state) => {
          state.isLoading = loading;
        });
      },
    })),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
      // Validar roles ao restaurar estado do localStorage
      onRehydrateStorage: () => (state) => {
        if (state?.user) {
          const userType = getUserType(state.user.roles);
          
          // Se o usuário não tem roles válidas, desconectar
          if (!state.user.roles || state.user.roles.length === 0 || userType === 'unknown') {
            console.warn("Usuário sem roles válidas detectado. Desconectando...");
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            
            toast.warning("Sessão inválida", {
              description: "Sua sessão foi encerrada. Por favor, faça login novamente.",
              duration: 5000,
              richColors: true,
            });
          }
        }
      }
    }
  )
);
