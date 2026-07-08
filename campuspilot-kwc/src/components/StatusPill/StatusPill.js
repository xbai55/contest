import React from "react";

const STATUS_CLASS = { todo: "todo", active: "active", done: "done" };

export default function StatusPill({ status, statusKey, className = "" }) {
  const cls = STATUS_CLASS[statusKey] || "todo";
  return <span className={`status-pill ${cls} ${className}`}>{status}</span>;
}
