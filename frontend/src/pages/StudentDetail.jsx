import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function StudentDetail(){
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(()=>{
    api.get(`/students/${id}`).then(r=>setStudent(r.data));
  },[id]);

  if(!student) return <div>Loading...</div>;

  const data = student.gpaTrend.map((g,i)=>({name:`Term ${i+1}`, gpa:g}));

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-3">{student.name} ({student.studentId})</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Personal</h3>
          <div>Email: {student.personal?.email}</div>
          <div>Phone: {student.personal?.phone}</div>
          <div>Address: {student.personal?.address}</div>
        </div>
        <div>
          <h3 className="font-semibold">GPA Trend</h3>
          <div style={{height:300}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0,4]} />
                <Tooltip />
                <Line type="monotone" dataKey="gpa" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <h3 className="mt-4 font-semibold">Courses & Grades</h3>
      <ul className="list-disc ml-5">
        {student.courses?.map(c => <li key={c.code}>{c.code} — {c.title}: {c.grade}</li>)}
      </ul>
    </div>
  );
}
