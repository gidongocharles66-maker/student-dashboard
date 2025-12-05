import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import StudentDetail from "./pages/StudentDetail";
import Reports from "./pages/Reports";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import StudentList from "./pages/StudentList";

const Protected = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
          <Route path="/students" element={<Protected><Students /></Protected>} />
          <Route path="/students/:id" element={<Protected><StudentDetail /></Protected>} />
          <Route path="/reports" element={<Protected><Reports /></Protected>} />

          {/* ✅ Added StudentList Route (as requested) */}
          <Route path="/student-list" element={<Protected><StudentList /></Protected>} />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
}
