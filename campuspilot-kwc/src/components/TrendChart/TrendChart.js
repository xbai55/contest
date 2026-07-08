import React from "react";

export default function TrendChart({ trend }) {
  const max = Math.max(...trend.flatMap((t) => [t.high, t.watch, t.done]), 1);
  return (
    <>
      <div className="trend-chart">
        {trend.map((t) => (
          <div key={t.week} className="trend-week">
            <div className="trend-bars">
              <span className="danger" style={{ "--height": `${Math.max(12, (t.high / max) * 100)}%` }} />
              <span className="warning" style={{ "--height": `${Math.max(12, (t.watch / max) * 100)}%` }} />
              <span className="done" style={{ "--height": `${Math.max(12, (t.done / max) * 100)}%` }} />
            </div>
            <strong>{t.week}</strong>
          </div>
        ))}
      </div>
      <div className="legend-row">
        <span><i className="danger" />高风险</span>
        <span><i className="warning" />关注</span>
        <span><i className="done" />结案</span>
      </div>
    </>
  );
}
