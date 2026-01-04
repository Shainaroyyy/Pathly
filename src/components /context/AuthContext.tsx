import { createContext, useContext, useState, ReactNode } from "react";

interface UserProfile {
  name?: string;
  email?: string;
  tokens?: number;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;

  login: () => Promise<boolean>;
  signup: () => Promise<boolean>;
  logout: () => Promise<void>;

  updateProfile: () => void;
  addTokens: () => void;
  spendTokens: () => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => false,
  signup: async () => false,
  logout: async () => {},
  updateProfile: () => {},
  addTokens: () => {},
  spendTokens: () => false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate auth restore (optional)
  setTimeout(() => setLoading(false), 800);

  const login = async () => {
    setUser({
      name: "Student",
      email: "user@email.com",
      tokens: 200,
    });
    return true;
  };

  const signup = async () => true;

  const logout = async () => setUser(null);

  const updateProfile = () => {};
  const addTokens = () => {};
  const spendTokens = () => false;

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    addTokens,
    spendTokens,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
