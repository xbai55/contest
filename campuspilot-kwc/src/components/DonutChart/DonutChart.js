import React from "react";

export default function DonutChart({ distribution }) {
  const total = distribution.reduce((sum, d) => sum + d.value, 0);
  let cursor = 0;
  const stops = distribution
    .map((d) => {
      const start = cursor;
      const end = cursor + (d.value / total) * 100;
      cursor = end;
      return `${d.color} ${start}% ${end}%`;
    })
    .join(", ");

  return (
    <>
      <div className="donut-wrap">
        <div className="donut-chart" style={{ background: `conic-gradient(${stops})` }} />
        <div className="donut-center">
          <strong>{total}</strong>
          <span>学生总数</span>
        </div>
      </div>
      <div className="risk-bars">
        {distribution.map((d) => {
          const pct = Math.round((d.value / total) * 100);
          return (
            <div key={d.key} className="risk-row" style={{ "--risk-color": d.color, "--width": `${pct}%` }}>
              <div className="risk-meta">
                <span className="risk-name"><i className="risk-dot" />{d.name}</span>
                <strong>{d.value} 人 · {pct}%</strong>
              </div>
              <div className="bar-track"><div className="bar-fill" /></div>
            </div>
          );
        })}
      </div>
    </>
  );
}
