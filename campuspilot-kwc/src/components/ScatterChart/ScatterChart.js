import React from "react";

function riskClass(key) {
  return { high: "high", watch: "watch", normal: "normal", improved: "improved" }[key] || "normal";
}

export default function ScatterChart({ students }) {
  return (
    <div className="scatter-chart" aria-label="GPA 与出勤率散点图">
      <span className="axis-label y">出勤率</span>
      <span className="axis-label x">GPA</span>
      {students.map((s) => (
        <span
          key={s.no}
          className={`scatter-point ${riskClass(s.riskKey)}`}
          style={{ "--x": `${(s.gpa / 4) * 100}%`, "--y": `${s.attendance}%` }}
          title={`${s.name}：GPA ${s.gpa}，出勤率 ${s.attendance}%`}
        >
          {s.name.slice(-1)}
        </span>
      ))}
    </div>
  );
}
