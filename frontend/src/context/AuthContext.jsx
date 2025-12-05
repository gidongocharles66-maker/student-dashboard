import React, { createContext, useState, useContext, useEffect } from "react";
import { api } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    // mock auth: fetch users and compare password with plaintext against hashed password is not possible client-side.
    // For the mock server we will accept the admin credentials from db.json
    setLoading(true);
    try {
      const res = await api.get(`/users?email=${encodeURIComponent(email)}`);
      const users = res.data;
      if (users.length === 0) throw new Error("Invalid email or password");

      const u = users[0];
      // NOTE: json-server returns hashed password; since we don't have server hashing, we will accept if email matches and password equals ADMIN_PASSWORD (frontend mock)
      // In production you'd POST /auth/login and server would validate and return token.
      const expected = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

      if (password === expected) {
        const userData = { id: u.id, name: u.name, email: u.email, role: u.role };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setLoading(false);
        return userData;
      } else {
        setLoading(false);
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
