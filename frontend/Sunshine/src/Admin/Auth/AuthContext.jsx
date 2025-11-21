import React, { createContext, useState, useContext, useEffect } from "react";
import {adminLogin} from "../../utils/Admin/login";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(()=> sessionStorage.getItem("admin_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    const userData = sessionStorage.getItem("admin_user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
      const response = await adminLogin(email, password);
      sessionStorage.setItem("admin_token", response.data.token)
      return response.data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
