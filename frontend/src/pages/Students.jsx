import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import StudentTable from "../components/StudentTable";
import StudentFormModal from "../components/StudentFormModal";

export default function Students(){
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const res = await api.get("/students");
    setStudents(res.data);
  };

  useEffect(()=>{ load(); },[]);

  const handleDelete = async (id) => {
    if(!confirm("Delete student?")) return;
    await api.delete(`/students/${id}`);
    setStudents(students.filter(s=>s.id!==id));
  };

  const handleEdit = (s) => setEditing(s);
  const handleSave = async (data) => {
    if(data.id){
      await api.put(`/students/${data.id}`, data);
      setStudents(students.map(s=>s.id===data.id?data:s));
    } else {
      const res = await api.post("/students", data);
      setStudents([...students, res.data]);
    }
    setEditing(null);
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Students</h1>
      <button className="mb-4 px-3 py-2 bg-green-600 text-white rounded" onClick={()=>setEditing({})}>Add Student</button>
      <StudentTable students={students} onDelete={handleDelete} onEdit={handleEdit} />
      {editing && <StudentFormModal student={editing} onClose={()=>setEditing(null)} onSave={handleSave} />}
    </div>
  );
}
