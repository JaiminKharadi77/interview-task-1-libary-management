"use client";

import { createContext, useContext, useState } from "react";
import { users } from "../authDataBase/user";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const login = (email, password) => {
    setError("");

    const foundUser = users.find((u) => u.email === email);
    if (!foundUser) {
      setError("Email not found");
      return false;
    }

    if (foundUser.password !== password) {
      setError("Invalid password");
      return false;
    }

    setIsAuthenticated(true);
    setUser({
      id: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
      name: foundUser.name,
    });

    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setError("");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        user,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
