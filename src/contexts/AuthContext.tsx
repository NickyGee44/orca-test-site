import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { isAuthenticated, login as authLogin, logout as authLogout } from "../services/authService";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    setAuthenticated(isAuthenticated());
    setLoading(false);
  }, []);

  const login = async (password: string) => {
    const result = await authLogin(password);
    if (result.success) {
      setAuthenticated(true);
    }
    return result;
  };

  const logout = () => {
    authLogout();
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: authenticated, isLoading: loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
