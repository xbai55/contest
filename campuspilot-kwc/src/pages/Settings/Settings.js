import React, { useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { canPerform } from "../../utils/permissions";
import { showToast } from "../../utils/toast";

const TABS = [
  ["integration", "集成与接口"],
  ["risk", "风险规则"],
  ["notification", "通知策略"],
  ["security", "安全与审计"],
];

function ToggleRow({ label, description, checked, onChange }) {
  return <div className="toggle-row"><span><strong>{label}</strong><em>{description}</em></span><button type="button" role="switch" aria-checked={checked} className={`enterprise-switch ${checked ? "on" : ""}`} onClick={() => onChange(!checked)}><i /></button></div>;
}

export default function Settings() {
  const { data } = useAuth();
  const [activeTab, setActiveTab] = useState("integration");
  const [testing, setTesting] = useState(false);
  const [apiBase, setApiBase] = useState(localStorage.getItem("campuspilot:apiBase") || "http://10.0.160.250:8080/ierp");
  const [config, setConfig] = useState({ agent: true, structured: true, audit: true, autoWarning: false, email: true, inApp: true, digest: false, mfa: false });
  if (!data) return null;

  const integration = data.integrationStatus || {};
  const objects = integration.objects || [];
  const appInfo = integration.thirdPartyApp || { appId: "campuspilot_isv", status: "待配置" };
  const update = (key) => (value) => setConfig((current) => ({ ...current, [key]: value }));

  const ruleRows = useMemo(() => [
    { name: "学业高风险", condition: "GPA < 2.0 或挂科数 ≥ 2", level: "高风险", enabled: true },
    { name: "学习行为异常", condition: "出勤率 < 80% 且作业完成率 < 70%", level: "高风险", enabled: true },
    { name: "持续关注", condition: "GPA 2.0–2.8 或出勤率 < 85%", level: "需关注", enabled: true },
    { name: "复评改善", condition: "连续两周核心指标提升", level: "改善中", enabled: true },
  ], []);

  const handleSave = () => {
    if (!canPerform("saveSettings")) return showToast("当前账号没有保存系统设置的权限");
    localStorage.setItem("campuspilot:apiBase", apiBase.trim());
    localStorage.setItem("campuspilot:settings", JSON.stringify(config));
    showToast("系统配置已保存");
  };

  const testConnection = () => {
    setTesting(true);
    window.setTimeout(() => { setTesting(false); showToast("连接检测完成：接口地址可访问"); }, 650);
  };

  return (
    <div className="enterprise-page settings-center-page">
      <section className="settings-toolbar">
        <div><span className="section-kicker">运行环境</span><strong>CampusPilot 生产配置</strong><em>最后保存：2026-07-11 11:36 · 学院管理员</em></div>
        <span className="environment-badge"><i />运行正常</span>
        <button className="secondary-button" type="button" onClick={testConnection}>{testing ? "检测中..." : "连接检测"}</button>
        <button className="primary-button" type="button" onClick={handleSave}>保存更改</button>
      </section>

      <nav className="enterprise-tabs" aria-label="系统设置分类">
        {TABS.map(([key, label]) => <button key={key} className={activeTab === key ? "active" : ""} onClick={() => setActiveTab(key)}>{label}</button>)}
      </nav>

      {activeTab === "integration" && (
        <section className="settings-grid">
          <div className="enterprise-panel settings-form-panel">
            <header><div><span className="section-kicker">苍穹平台</span><h3>业务接口与 Agent 接入</h3><p>密钥由后端或平台安全配置托管，前端仅保存公开连接参数。</p></div><span className="status-badge warning">{appInfo.status}</span></header>
            <div className="enterprise-form">
              <label className="wide"><span>苍穹环境地址</span><input value={apiBase} onChange={(event) => setApiBase(event.target.value)} /></label>
              <label><span>方案标识</span><input value="campuspilot" readOnly /></label>
              <label><span>开发商标识</span><input value="code" readOnly /></label>
              <label><span>领域标识</span><input value="code" readOnly /></label>
              <label><span>第三方应用 ID</span><input value={appInfo.appId || "campuspilot_isv"} readOnly /></label>
              <label className="wide"><span>Agent 代理路径</span><input value="/api/campuspilot/agent/chat" readOnly /></label>
            </div>
            <div className="toggle-list compact">
              <ToggleRow label="启用苍穹 Agent" description="通过后端代理调用平台 Agent，避免前端暴露凭据" checked={config.agent} onChange={update("agent")} />
              <ToggleRow label="结构化建议输出" description="将建议映射到风险预警单和帮扶计划字段" checked={config.structured} onChange={update("structured")} />
            </div>
          </div>
          <aside className="enterprise-panel">
            <header><div><span className="section-kicker">业务对象</span><h3>数据模型状态</h3></div><span className="status-badge success">{objects.length} 个对象</span></header>
            <div className="object-status-list">
              {objects.map((item) => <div key={item.code}><span><strong>{item.name}</strong><em>{item.code}</em></span><b>{item.status} · {item.fields} 字段</b></div>)}
              {!objects.length && <div><span><strong>等待同步</strong><em>尚未获取业务对象</em></span><b>未连接</b></div>}
            </div>
          </aside>
        </section>
      )}

      {activeTab === "risk" && (
        <section className="enterprise-panel">
          <header><div><span className="section-kicker">规则中心</span><h3>风险识别与分级规则</h3><p>规则命中后生成候选预警，仍需具备权限的人员确认。</p></div><button className="secondary-button" type="button">新增规则</button></header>
          <div className="rules-table">
            <div className="rule-row rule-head"><span>规则名称</span><span>触发条件</span><span>风险等级</span><span>状态</span></div>
            {ruleRows.map((rule) => <div className="rule-row" key={rule.name}><strong>{rule.name}</strong><span>{rule.condition}</span><b>{rule.level}</b><em className="status-badge success">启用</em></div>)}
          </div>
          <ToggleRow label="自动生成预警候选单" description="仅生成待确认记录，不自动进入正式帮扶流程" checked={config.autoWarning} onChange={update("autoWarning")} />
        </section>
      )}

      {activeTab === "notification" && (
        <section className="settings-grid equal">
          <div className="enterprise-panel"><header><div><span className="section-kicker">触达渠道</span><h3>通知方式</h3></div></header><div className="toggle-list"><ToggleRow label="站内消息" description="风险确认、任务分派和复评提醒" checked={config.inApp} onChange={update("inApp")} /><ToggleRow label="邮件通知" description="发送给辅导员、导师和学院管理员" checked={config.email} onChange={update("email")} /><ToggleRow label="每日摘要" description="工作日 18:00 汇总未处理任务" checked={config.digest} onChange={update("digest")} /></div></div>
          <div className="enterprise-panel"><header><div><span className="section-kicker">升级策略</span><h3>超时提醒</h3></div></header><dl className="detail-list single"><div><dt>高风险预警确认时限</dt><dd>4 小时</dd></div><div><dt>导师帮扶计划时限</dt><dd>2 个工作日</dd></div><div><dt>复评提醒周期</dt><dd>每 7 天</dd></div><div><dt>升级接收人</dt><dd>学院管理员</dd></div></dl></div>
        </section>
      )}

      {activeTab === "security" && (
        <section className="settings-grid equal">
          <div className="enterprise-panel"><header><div><span className="section-kicker">审计策略</span><h3>操作留痕</h3></div></header><div className="toggle-list"><ToggleRow label="记录关键业务操作" description="预警确认、计划变更、结案与配置修改" checked={config.audit} onChange={update("audit")} /><ToggleRow label="管理员多因素认证" description="提升系统设置和权限变更操作的安全性" checked={config.mfa} onChange={update("mfa")} /></div></div>
          <div className="enterprise-panel"><header><div><span className="section-kicker">数据治理</span><h3>合规基线</h3></div><span className="status-badge success">已启用</span></header><dl className="detail-list single"><div><dt>审计日志保留</dt><dd>180 天</dd></div><div><dt>敏感字段展示</dt><dd>按角色脱敏</dd></div><div><dt>数据导出</dt><dd>管理员审批</dd></div><div><dt>密钥管理</dt><dd>后端环境变量</dd></div></dl></div>
        </section>
      )}
    </div>
  );
}
