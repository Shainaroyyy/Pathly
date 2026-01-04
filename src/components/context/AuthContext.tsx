// Simplified dummy Auth Context because the app no longer uses login.
// This prevents crashes from existing imports while keeping everything simple.

import React, { createContext, useContext } from "react";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  tokens?: number;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: () => Promise<boolean>;
  signup: () => Promise<boolean>;
  logout: () => void;
  updateProfile: () => void;
  addTokens: () => void;
  spendTokens: () => boolean;
}

const defaultAuth: AuthContextType = {
  user: null,
  isAuthenticated: false,
  loading: false,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  updateProfile: () => {},
  addTokens: () => {},
  spendTokens: () => false,
};

const AuthContext = createContext<AuthContextType>(defaultAuth);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Keep provider simple for now — return the default synchronous dummy auth state.
  return (
    <AuthContext.Provider value={defaultAuth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
