import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

export default function StudentTable({ students, onDelete, onEdit }) {
  const [q, setQ] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = useMemo(() => {
    let arr = students;
    if (q) arr = arr.filter(s => s.name.toLowerCase().includes(q.toLowerCase()));
    if (courseFilter) arr = arr.filter(s => s.course === courseFilter);
    if (statusFilter) arr = arr.filter(s => s.status === statusFilter);
    arr = arr.sort((a,b)=> sortKey==="gpa" ? b.gpa - a.gpa : a.name.localeCompare(b.name));
    return arr;
  }, [students,q,courseFilter,statusFilter,sortKey]);

  const pages = Math.ceil(filtered.length / perPage);
  const pageItems = filtered.slice((page-1)*perPage, page*perPage);

  const courses = Array.from(new Set(students.map(s=>s.course)));
  const statuses = Array.from(new Set(students.map(s=>s.status)));

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex gap-2 mb-4">
        <input value={q} onChange={e=>{setQ(e.target.value); setPage(1)}} placeholder="Search..." className="border p-2 flex-1" />
        <select onChange={e=>setCourseFilter(e.target.value)} value={courseFilter} className="border p-2">
          <option value="">All courses</option>
          {courses.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <select onChange={e=>setStatusFilter(e.target.value)} value={statusFilter} className="border p-2">
          <option value="">All status</option>
          {statuses.map(s=> <option key={s} value={s}>{s}</option>)}
        </select>
        <select onChange={e=>setSortKey(e.target.value)} value={sortKey} className="border p-2">
          <option value="name">Sort: Name</option>
          <option value="gpa">Sort: GPA</option>
        </select>
      </div>

      <table className="w-full border-collapse">
        <thead><tr>
          <th className="border p-2 text-left">Name</th>
          <th className="border p-2">Student ID</th>
          <th className="border p-2">Course</th>
          <th className="border p-2">GPA</th>
          <th className="border p-2">Status</th>
          <th className="border p-2">Actions</th>
        </tr></thead>
        <tbody>
          {pageItems.map(s => (
            <tr key={s.id}>
              <td className="border p-2"><Link to={`/students/${s.id}`} className="text-indigo-600">{s.name}</Link></td>
              <td className="border p-2">{s.studentId}</td>
              <td className="border p-2">{s.course}</td>
              <td className="border p-2 text-center">{s.gpa}</td>
              <td className="border p-2 text-center">{s.status}</td>
              <td className="border p-2">
                <button className="mr-2" onClick={()=>onEdit(s)}>Edit</button>
                <button className="text-red-600" onClick={()=>onDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between items-center">
        <div>Showing {((page-1)*perPage)+1} - {Math.min(page*perPage, filtered.length)} of {filtered.length}</div>
        <div className="flex gap-2">
          <button disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))} className="border p-2">Prev</button>
          <button disabled={page>=pages} onClick={()=>setPage(p=>Math.min(p+1,pages))} className="border p-2">Next</button>
        </div>
      </div>
    </div>
  );
}
