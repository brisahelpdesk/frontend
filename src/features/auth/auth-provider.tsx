import { useState } from "react";
import { AuthContext } from "./auth-context";
import type { UserModel } from "../users/user.model";

export interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const { children } = props;

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<UserModel | null>(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });
  
  async function login(email: string, password: string) {
    console.log("Login function called with", email, password);
  }

  function logout() {
    console.log("Logout function called");
    setUser(null);
    setLoading(false);
  }

  function hasRole(roles: string[]): boolean {
    if (!user) return false;
    return roles.includes(user.role);
  }

  const values = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    hasRole,
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}