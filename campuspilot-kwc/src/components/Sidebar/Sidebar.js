import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NAV_GROUPS = [
  {
    label: "工作台",
    items: [
      { route: "student-home", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0H5Z", label: "我的工作台" },
      { route: "teacher-home", icon: "M5 4h14v3H5V4Zm2 5h10v11H7V9Zm2 2v2h6v-2H9Zm0 4v2h4v-2H9Z", label: "教学工作台" },
      { route: "counselor-home", icon: "M12 3 2.8 19h18.4L12 3Zm1 12h-2v2h2v-2Zm0-6h-2v5h2V9Z", label: "处置工作台" },
      { route: "admin-home", icon: "M4 5h16v4H4V5Zm0 6h7v8H4v-8Zm9 0h7v8h-7v-8Z", label: "治理驾驶舱" },
    ],
  },
  {
    label: "业务模块",
    items: [
      { route: "dashboard", icon: "M4 5.5A1.5 1.5 0 0 1 5.5 4h4A1.5 1.5 0 0 1 11 5.5v4A1.5 1.5 0 0 1 9.5 11h-4A1.5 1.5 0 0 1 4 9.5v-4Zm9 0A1.5 1.5 0 0 1 14.5 4h4A1.5 1.5 0 0 1 20 5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4A1.5 1.5 0 0 1 13 9.5v-4ZM4 14.5A1.5 1.5 0 0 1 5.5 13h4a1.5 1.5 0 0 1 1.5 1.5v4A1.5 1.5 0 0 1 9.5 20h-4A1.5 1.5 0 0 1 4 18.5v-4Zm9 0a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a1.5 1.5 0 0 1-1.5-1.5v-4Z", label: "风险驾驶舱" },
      { route: "students", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0H5Z", label: "学生画像" },
      { route: "courses", icon: "M5 4h13a1 1 0 0 1 1 1v15H6.5A2.5 2.5 0 0 1 4 17.5V5a1 1 0 0 1 1-1Zm1 13.5a.5.5 0 0 0 .5.5H17V6H6v11.5ZM8 8h7v2H8V8Zm0 4h7v2H8v-2Z", label: "课程成绩" },
      { route: "behavior", icon: "M5 12h3v7H5v-7Zm5-7h3v14h-3V5Zm5 4h3v10h-3V9Z", label: "学习行为" },
      { route: "warnings", icon: "M12 3 2.8 19h18.4L12 3Zm1 12h-2v2h2v-2Zm0-6h-2v5h2V9Z", label: "风险预警单" },
    ],
  },
  {
    label: "智能闭环",
    items: [
      { route: "agent", icon: "M12 2a1 1 0 0 1 1 1v1.1A7.5 7.5 0 0 1 19.5 12v3.5A3.5 3.5 0 0 1 16 19h-1.8l-1.5 2.3a.8.8 0 0 1-1.4 0L9.8 19H8a3.5 3.5 0 0 1-3.5-3.5V12A7.5 7.5 0 0 1 11 4.1V3a1 1 0 0 1 1-1Zm-3 10.2a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Zm6 0a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Zm-6.5 3.1c1.9 1.2 5.1 1.2 7 0l-.8-1.3c-1.4.8-4 .8-5.4 0l-.8 1.3Z", label: "AI 成长助手" },
      { route: "workflow", icon: "M7 5a3 3 0 1 1 2.8 4H14a3 3 0 0 1 3 3v3.2a3 3 0 1 1-2 0V12a1 1 0 0 0-1-1H9.8A3 3 0 1 1 7 5Z", label: "处理闭环" },
    ],
  },
  {
    label: "组织与系统",
    items: [
      { route: "user", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0H5Z", label: "用户中心" },
      { route: "settings", icon: "m19.4 13.5 1.2.9-2 3.4-1.4-.6a7.4 7.4 0 0 1-1.8 1l-.2 1.5h-4l-.2-1.5a7.4 7.4 0 0 1-1.8-1l-1.4.6-2-3.4 1.2-.9a6.7 6.7 0 0 1 0-2.1l-1.2-.9 2-3.4 1.4.6a7.4 7.4 0 0 1 1.8-1l.2-1.5h4l.2 1.5a7.4 7.4 0 0 1 1.8 1l1.4-.6 2 3.4-1.2.9a6.7 6.7 0 0 1 0 2.1ZM13 15.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z", label: "系统设置" },
    ],
  },
];

export default function Sidebar({ currentRoute }) {
  const { isAuth, permissions } = useAuth();
  const navigate = useNavigate();

  const canAccessRoute = (route) => {
    if (!isAuth) return route === "home";
    return permissions?.routes.includes(route);
  };

  return (
    <aside className="sidebar" aria-label="主导航">
      <Link className="brand" to="/home" aria-label="CampusPilot 首页">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32">
            <path d="M6 17.5 16 5l10 12.5-4.1 2.2L16 12.3l-5.9 7.4L6 17.5Z" />
            <path d="M8.8 22.5 16 18l7.2 4.5L16 27 8.8 22.5Z" />
          </svg>
        </span>
        <span>
          <strong>启航智伴</strong>
          <small>CampusPilot</small>
        </span>
      </Link>

      <nav className="nav-stack" aria-label="业务模块">
        {NAV_GROUPS.map((group) => (
          <React.Fragment key={group.label}>
            <p className="nav-group">{group.label}</p>
            {group.items.map((item) => {
              const allowed = canAccessRoute(item.route);
              if (!allowed) return null;
              const isAgent = item.route === "agent";
              return (
                <React.Fragment key={item.route}>
                  <Link
                    className={`nav-item${currentRoute === item.route ? " active" : ""}`}
                    to={`/${item.route}`}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d={item.icon} />
                    </svg>
                    <span>{item.label}</span>
                  </Link>
                  {isAgent && (
                    <button
                      className="agent-context-return nav-context-return"
                      type="button"
                      onClick={() => document.body.classList.toggle("agent-nav-open")}
                    >
                      助手上下文
                    </button>
                  )}
                </React.Fragment>
              );
            })}
          </React.Fragment>
        ))}
      </nav>
    </aside>
  );
}
