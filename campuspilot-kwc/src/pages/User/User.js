import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { scopeAuditLogs } from "../../utils/permissions";

const ROLE_CAPTIONS = {
  student: "学生",
  counselor: "辅导员",
  mentor: "导师",
  manager: "学院管理者",
};

function roleCaption(role) {
  return ROLE_CAPTIONS[role] || role || "普通用户";
}

export default function User() {
  const { user, data, permissions } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  if (!data || !user || !permissions) return null;

  const logs = scopeAuditLogs(data.auditLogs || [], user);
  const permissionLabels = permissions.labels || [];
  const visibleScopes = Object.entries(permissions.dataScopes || {}).filter(([, value]) => value !== "none");
  const roleName = roleCaption(user.role);
  const initials = (user.name || "用户").slice(0, 1);

  const securityItems = useMemo(() => [
    { label: "登录密码", value: "已设置", state: "success" },
    { label: "多因素认证", value: "建议开启", state: "warning" },
    { label: "最近登录", value: "2026-07-11 11:42", state: "neutral" },
    { label: "会话状态", value: "当前设备在线", state: "success" },
  ], []);

  return (
    <div className="enterprise-page user-center-page">
      <section className="account-banner">
        <div className="account-identity">
          <span className="account-avatar" aria-hidden="true">{initials}</span>
          <div>
            <span className="section-kicker">当前账号</span>
            <h2>{user.name}</h2>
            <p>{user.email || "counselor@campus.edu"} · {user.college || "信息工程学院"}</p>
          </div>
        </div>
        <div className="account-summary">
          <span><b>{roleName}</b><em>当前角色</em></span>
          <span><b>{permissionLabels.length}</b><em>业务权限</em></span>
          <span><b>{visibleScopes.length}</b><em>数据范围</em></span>
          <Link className="secondary-button" to="/login">切换账号</Link>
        </div>
      </section>

      <nav className="enterprise-tabs" aria-label="用户中心视图">
        <button className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>账号概览</button>
        <button className={activeTab === "permissions" ? "active" : ""} onClick={() => setActiveTab("permissions")}>权限与数据范围</button>
        <button className={activeTab === "security" ? "active" : ""} onClick={() => setActiveTab("security")}>安全与活动</button>
      </nav>

      {activeTab === "overview" && (
        <section className="enterprise-layout enterprise-layout-main">
          <div className="enterprise-panel">
            <header><div><span className="section-kicker">岗位信息</span><h3>账号与组织归属</h3></div><span className="status-badge success">正常</span></header>
            <dl className="detail-list">
              <div><dt>姓名</dt><dd>{user.name}</dd></div>
              <div><dt>角色</dt><dd>{roleName}</dd></div>
              <div><dt>所属组织</dt><dd>{user.college || "信息工程学院"}</dd></div>
              <div><dt>账号类型</dt><dd>校内统一身份账号</dd></div>
              <div><dt>数据租户</dt><dd>CampusPilot 校园租户</dd></div>
              <div><dt>账号有效期</dt><dd>长期有效</dd></div>
            </dl>
          </div>
          <aside className="enterprise-panel activity-panel">
            <header><div><span className="section-kicker">操作记录</span><h3>最近活动</h3></div><Link className="text-link" to="/workflow">查看流程</Link></header>
            <ul className="activity-list">
              {logs.length ? logs.map((log, index) => (
                <li key={`${log.time}-${index}`}><i aria-hidden="true" /><div><strong>{log.action}</strong><span>{log.time} · {log.actor}</span></div></li>
              )) : <li><i aria-hidden="true" /><div><strong>暂无新的操作记录</strong><span>系统将保留关键业务操作</span></div></li>}
            </ul>
          </aside>
        </section>
      )}

      {activeTab === "permissions" && (
        <section className="enterprise-panel">
          <header><div><span className="section-kicker">RBAC 权限模型</span><h3>当前角色授权清单</h3></div><span className="status-badge">{roleName}</span></header>
          <div className="permission-matrix">
            {permissionLabels.map((label, index) => <div key={label}><span className="permission-index">{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong><em>已授权</em></div>)}
          </div>
          <div className="scope-table">
            <div className="scope-row scope-head"><span>业务对象</span><span>数据范围</span><span>约束说明</span></div>
            {visibleScopes.map(([key, value]) => <div className="scope-row" key={key}><strong>{key}</strong><span>{value}</span><em>由当前租户和角色权限共同约束</em></div>)}
          </div>
        </section>
      )}

      {activeTab === "security" && (
        <section className="enterprise-layout">
          <div className="enterprise-panel">
            <header><div><span className="section-kicker">账号安全</span><h3>安全基线</h3></div><button className="secondary-button" type="button">安全设置</button></header>
            <div className="security-list">
              {securityItems.map((item) => <div key={item.label}><span><strong>{item.label}</strong><em>账号安全策略状态</em></span><b className={item.state}>{item.value}</b></div>)}
            </div>
          </div>
          <div className="enterprise-panel">
            <header><div><span className="section-kicker">会话管理</span><h3>登录设备</h3></div></header>
            <div className="device-row"><span className="device-icon">PC</span><div><strong>Windows · 当前设备</strong><em>校园网 · 2026-07-11 11:42</em></div><span className="status-badge success">在线</span></div>
          </div>
        </section>
      )}
    </div>
  );
}
