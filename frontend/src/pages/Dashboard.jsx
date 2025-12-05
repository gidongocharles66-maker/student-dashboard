import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    api.get("/students?_limit=50").then((r) => setStudents(r.data));
  }, []);

  const avgGpa = (arr) =>
    (arr.reduce((s, a) => s + (a.gpa || 0), 0) / (arr.length || 1)).toFixed(2);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div
      className={`min-h-screen p-4 transition-all duration-300 ${
        dark ? "bg-pink-200" : "bg-blue-100"
      }`}
    >
      {/* 🌙 Theme Toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-1 rounded bg-gray-800 text-white dark:bg-gray-200 dark:text-black"
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <h1 className="text-3xl mb-4 dark:text-white">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-gray-700 dark:text-white rounded shadow">
          Total Students: <strong>{students.length}</strong>
        </div>

        <div className="p-4 bg-white dark:bg-gray-700 dark:text-white rounded shadow">
          Average GPA: <strong>{avgGpa(students)}</strong>
        </div>

        <div className="p-4 bg-white dark:bg-gray-700 dark:text-white rounded shadow">
          At Risk: <strong>{students.filter((s) => s.gpa < 2.5).length}</strong>
        </div>
      </div>

      <div className="mt-8 flex gap-4 flex-wrap">
        <Link
          to="/student-list"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          View Student List
        </Link>

        <Link
          to="/students"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Manage Students
        </Link>

        <Link
          to="/reports"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          View Reports
        </Link>

        <Link
          to="/dashboard"
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Refresh Dashboard
        </Link>
      </div>
    </div>
  );
}
