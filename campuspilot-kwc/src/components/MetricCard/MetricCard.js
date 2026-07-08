import React from "react";

export default function MetricCard({ label, value, note, tone = "blue", icon }) {
  return (
    <article className={`metric-card tone-${tone}`}>
      <div className="metric-top">
        <span className="metric-label">{label}</span>
        <span className="metric-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d={icon} /></svg>
        </span>
      </div>
      <strong className="metric-value">{value}</strong>
      <span className="muted">{note}</span>
    </article>
  );
}
