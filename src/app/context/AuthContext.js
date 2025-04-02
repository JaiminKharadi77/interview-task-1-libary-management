"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { users } from "../authDataBase/user";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Check localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

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

    const userData = {
      id: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
      name: foundUser.name,
    };

    // Store user data in localStorage
    localStorage.setItem("user", JSON.stringify(userData));

    setIsAuthenticated(true);
    setUser(userData);

    return true;
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem("user");

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
