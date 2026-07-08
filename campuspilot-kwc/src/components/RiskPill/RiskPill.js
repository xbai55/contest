import React from "react";

const RISK_CLASS = { high: "high", watch: "watch", normal: "normal", improved: "improved" };

export default function RiskPill({ level, className = "" }) {
  const cls = RISK_CLASS[level] || "normal";
  return <span className={`risk-pill ${cls} ${className}`}>{level}</span>;
}
