import type { Employee as User } from "../employee/employee-types";

export interface LoginCredentials {
  username: string;
  password: string;
}


export interface LoginResponse {
  userId: number;
  name: string;
  cpf: string;
  roles: string[];
  jwt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
