import React, { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Reports(){
  const [students, setStudents] = useState([]);

  useEffect(()=>{ api.get("/students").then(r=>setStudents(r.data)); },[]);

  const avgPerCourse = () => {
    const map = {};
    students.forEach(s=>{
      map[s.course] = map[s.course] || {total:0,count:0};
      map[s.course].total += s.gpa;
      map[s.course].count += 1;
    });
    return Object.entries(map).map(([course, v])=>({course, avg:(v.total/v.count).toFixed(2)}));
  };

  const topPerformers = [...students].sort((a,b)=>b.gpa-a.gpa).slice(0,5);
  const atRisk = students.filter(s=>s.gpa<2.5);

  const exportCSV = (rows, filename="report.csv") => {
    const csv = [Object.keys(rows[0]||{}).join(","),
      ...rows.map(r=>Object.values(r).join(","))].join("\n");
    const blob = new Blob([csv], {type:"text/csv"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Reports</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3>Average GPA per Course</h3>
          <ul>
            {avgPerCourse().map(r => <li key={r.course}>{r.course}: {r.avg}</li>)}
          </ul>
          <button className="mt-2 px-2 py-1 bg-blue-600 text-white" onClick={()=>exportCSV(avgPerCourse(),"avg_per_course.csv")}>Export CSV</button>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3>Top Performers</h3>
          <ol>
            {topPerformers.map(s => <li key={s.id}>{s.name} — {s.gpa}</li>)}
          </ol>
          <button className="mt-2 px-2 py-1 bg-blue-600 text-white" onClick={()=>exportCSV(topPerformers,"top_performers.csv")}>Export CSV</button>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3>At-risk Students</h3>
          <ol>
            {atRisk.map(s => <li key={s.id}>{s.name} — {s.gpa}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );
}
