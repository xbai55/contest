import React, { useState, useEffect, useCallback } from "react";

let toastTimer = null;

export default function Toast() {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((msg) => {
    setMessage(msg);
    setVisible(true);
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => setVisible(false), 2800);
  }, []);

  useEffect(() => {
    const handler = (e) => showToast(e.detail);
    window.addEventListener("toast", handler);
    return () => window.removeEventListener("toast", handler);
  }, [showToast]);

  if (!visible) return null;

  return (
    <div className="toast visible" role="status" aria-live="polite">
      {message}
    </div>
  );
}

// 全局工具函数，方便在组件外部调用
export function showToast(message) {
  window.dispatchEvent(new CustomEvent("toast", { detail: message }));
}
