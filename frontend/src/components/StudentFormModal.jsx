import React, { useState, useEffect } from "react";

export default function StudentFormModal({ student={}, onClose, onSave }) {
  const [form, setForm] = useState(student);

  useEffect(()=>setForm(student),[student]);

  const submit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form className="bg-white p-6 rounded w-96" onSubmit={submit}>
        <h3 className="text-lg mb-2">{form.id ? "Edit":"Add"} Student</h3>
        <input className="border p-2 w-full mb-2" placeholder="Name" value={form.name||""} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input className="border p-2 w-full mb-2" placeholder="Student ID" value={form.studentId||""} onChange={e=>setForm({...form,studentId:e.target.value})}/>
        <input className="border p-2 w-full mb-2" placeholder="Course" value={form.course||""} onChange={e=>setForm({...form,course:e.target.value})}/>
        <input className="border p-2 w-full mb-2" placeholder="GPA" type="number" step="0.01" value={form.gpa||0} onChange={e=>setForm({...form,gpa:parseFloat(e.target.value)||0})}/>
        <select className="border p-2 w-full mb-2" value={form.status||"active"} onChange={e=>setForm({...form,status:e.target.value})}>
          <option value="active">active</option>
          <option value="at-risk">at-risk</option>
          <option value="graduated">graduated</option>
        </select>
        <div className="flex gap-2 justify-end">
          <button type="button" className="px-3 py-1 border" onClick={onClose}>Cancel</button>
          <button className="px-3 py-1 bg-indigo-600 text-white">{form.id ? "Save":"Add"}</button>
        </div>
      </form>
    </div>
  );
}
