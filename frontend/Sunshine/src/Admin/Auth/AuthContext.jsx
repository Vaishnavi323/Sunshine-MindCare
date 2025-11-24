import React, { createContext, useState, useContext, useEffect } from "react";
import { adminLogin } from "../../utils/Admin/login";

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
  const [token, setToken] = useState(() => sessionStorage.getItem("admin_token"));
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
    try {
      const response = await adminLogin(email, password);
      console.log("Login API Response:", response.data);

      const data = response.data;

      if (data.success === true) {
        sessionStorage.setItem("admin_token", data.token);

        if (data.user) {
          sessionStorage.setItem("admin_user", JSON.stringify(data.user));
          setUser(data.user);
        }

        return { success: true, message: data.message || "Login Successful" };
      }

      if (data.status === true) {
        sessionStorage.setItem("admin_token", data.token);

        if (data.user) {
          sessionStorage.setItem("admin_user", JSON.stringify(data.user));
          setUser(data.user);
        }

        return { success: true, message: data.message || "Login Successful" };
      }

      return { success: false, message: data.message || "Invalid credentials" };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "An unexpected error occurred.",
      };
    }
  };


  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("admin_token");
  };

  const value = {
    user,
    login,
    logout,
    loading,
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
