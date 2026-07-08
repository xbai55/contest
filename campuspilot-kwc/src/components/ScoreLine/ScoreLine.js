import React from "react";

export default function ScoreLine({ label, value, color = "#1267e8" }) {
  return (
    <div className="risk-row">
      <div className="risk-meta">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="score-track">
        <div className="score-fill" style={{ "--width": `${value}%`, "--fill": color }} />
      </div>
    </div>
  );
}
