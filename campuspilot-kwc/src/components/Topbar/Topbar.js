import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Topbar({ meta }) {
  const { user, isAuth, logout, loadData } = useAuth();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const searchTimer = useRef(null);

  const handleRefresh = async () => {
    await loadData();
    window.dispatchEvent(new CustomEvent("toast", { detail: "数据已刷新" }));
  };

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      window.dispatchEvent(new CustomEvent("search", { detail: value }));
    }, 160);
  };

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">{meta?.eyebrow || "AI 原生智慧校园平台"}</p>
        <h1>{meta?.title || "CampusPilot 学业风险驾驶舱"}</h1>
        <p className="route-subtitle">{meta?.subtitle || ""}</p>
      </div>
      <div className="top-actions">
        <label className="search-box">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10.8 4a6.8 6.8 0 1 1 0 13.6 6.8 6.8 0 0 1 0-13.6Zm0 2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm5.4 9 3.8 3.8-1.4 1.4-3.8-3.8 1.4-1.4Z" />
          </svg>
          <input
            type="search"
            placeholder="搜索学生 / 课程 / 预警单"
            value={query}
            onChange={handleSearchChange}
            autoComplete="off"
          />
        </label>
        <button className="icon-button" type="button" onClick={handleRefresh} aria-label="刷新数据">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.5 7.3A8 8 0 1 0 20 12h-2a6 6 0 1 1-1.1-3.5L14 11.4h7V4.3l-2.5 3Z" />
          </svg>
        </button>
        {!isAuth ? (
          <>
            <Link className="auth-link" to="/login">登录</Link>
            <Link className="auth-link primary" to="/login">注册</Link>
          </>
        ) : (
          <>
            <Link className="user-button" to="/user" aria-label="进入用户中心">
              <span className="avatar small">{user?.name?.slice(0, 1) || "访"}</span>
              <span>
                <strong>{user?.name || "未登录"}</strong>
                <small>{user?.role || "访客"}</small>
              </span>
            </Link>
            <button className="auth-link" onClick={handleLogout} style={{ marginLeft: 8 }}>退出</button>
          </>
        )}
      </div>
    </header>
  );
}
