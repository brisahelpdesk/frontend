import { createContext } from "react";
import type { UserModel } from "../users/user.model";

interface AuthContextProps {
  user: UserModel | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (roles: string[]) => boolean;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
