import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow p-4 flex items-center justify-between">
      <div className="flex space-x-6">
        <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800 font-medium">
          Dashboard
        </Link>

        <Link to="/students" className="text-indigo-600 hover:text-indigo-800 font-medium">
          Students
        </Link>

        <Link to="/student-list" className="text-indigo-600 hover:text-indigo-800 font-medium">
          Student List
        </Link>

        <Link to="/reports" className="text-indigo-600 hover:text-indigo-800 font-medium">
          Reports
        </Link>
      </div>

      {user && (
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      )}
    </nav>
  );
}
