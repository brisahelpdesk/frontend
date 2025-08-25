import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer'
import { toast } from 'sonner';
import type { AuthState, LoginCredentials } from './auth-types';
import type { User } from '../users/user.model';
import { login } from './auth-services';

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  initializeAuth: () => void;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    immer((set, get) => ({
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
          
          set((state) => {
            state.user = response.user;
            state.token = response.token;
            state.isAuthenticated = true;
            state.isLoading = false;
          });

          toast.success(`Bem-vindo de volta, ${response.user.firstName}!`, {
            description: "Você está logado com sucesso.",
            duration: 4000,
            richColors: true,
          });

        } catch (error) {
          set((state) => {
            state.isLoading = false;
          });

          const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
          
          toast.error(`Erro ao fazer login: ${errorMessage}`, {
            description: "Por favor, verifique suas credenciais e tente novamente.",
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

      initializeAuth: () => {
        const { user, token } = get();
        if (user && token) {
          set((state) => {
            state.isAuthenticated = true;
          });
        }
      },
    })),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);