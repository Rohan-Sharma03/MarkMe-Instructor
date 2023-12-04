import React, { ReactNode, createContext, useContext, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  courses: string[];
  number: string;
  // Add other user-related fields as needed
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedValue = localStorage.getItem("isLoggedIn");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const [userData, setUserData] = useState<User | null>(() => {
    const storedUserData = localStorage.getItem("userData");
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  const login = (userData: User) => {
    setIsLoggedIn(true);
    setUserData(userData);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    localStorage.clear();
  };

  const authContextValue: AuthContextType = {
    isLoggedIn,
    user: userData,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
