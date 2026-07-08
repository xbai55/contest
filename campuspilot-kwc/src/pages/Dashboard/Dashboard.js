import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { scopeStudents, scopeWarnings, scopeCourses, scopeBehaviors, scopeAuditLogs } from "../../utils/permissions";
import MetricCard from "../../components/MetricCard/MetricCard";
import Panel from "../../components/Panel/Panel";
import RiskPill from "../../components/RiskPill/RiskPill";
import StatusPill from "../../components/StatusPill/StatusPill";
import DonutChart from "../../components/DonutChart/DonutChart";
import TrendChart from "../../components/TrendChart/TrendChart";
import ScatterChart from "../../components/ScatterChart/ScatterChart";
import ScoreLine from "../../components/ScoreLine/ScoreLine";

const METRIC_ICONS = {
  totalStudents: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0H5Z",
  highRisk: "M12 3 2.8 19h18.4L12 3Zm1 12h-2v2h2v-2Zm0-6h-2v5h2V9Z",
  watchRisk: "M12 2 20 6v6c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6l8-4Zm0 4-4 2v4c0 2.8 1.6 4.8 4 6 2.4-1.2 4-3.2 4-6V8l-4-2Z",
  normal: "M9.5 16.2 5.8 12.5l-1.4 1.4 5.1 5.1L20 8.5l-1.4-1.4-9.1 9.1Z",
  pendingWarnings: "M5 4h14v16H5V4Zm3 4h8v2H8V8Zm0 4h8v2H8v-2Zm0 4h5v2H8v-2Z",
  activeWarnings: "M4 5h16v3H4V5Zm0 5h16v9H4v-9Zm3 2v2h7v-2H7Z",
  closedWarnings: "M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm7 3.2 5.4-5.4-1.4-1.4-4 4-2-2-1.4 1.4 3.4 3.4Z",
  avgGpa: "M5 4h14v3H5V4Zm0 5h9v3H5V9Zm0 5h14v3H5v-3Z",
  avgAttendance: "M5 12h3v7H5v-7Zm5-7h3v14h-3V5Zm5 4h3v10h-3V9Z",
};

function riskClass(key) {
  return { high: "high", watch: "watch", normal: "normal", improved: "improved" }[key] || "normal";
}

export default function Dashboard() {
  const { data, user, loading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handler = (e) => setSearchQuery(e.detail);
    window.addEventListener("search", handler);
    return () => window.removeEventListener("search", handler);
  }, []);

  const matchQuery = (item) => {
    if (!searchQuery.trim()) return true;
    return Object.values(item).join(" ").toLowerCase().includes(searchQuery.trim().toLowerCase());
  };

  if (loading || !data) {
    return <div className="agent-main" style={{ padding: 40 }}><strong>加载数据中...</strong></div>;
  }

  const students = scopeStudents(data.students, user);
  const warnings = scopeWarnings(data.warnings, user);
  const visibleWarnings = warnings.filter(matchQuery);
  const priorityStudents = [...students].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5);
  const pendingWarnings = visibleWarnings.filter((w) => w.statusKey === "todo");
  const activeWarnings = visibleWarnings.filter((w) => w.statusKey === "active");
  const selectedWarning = pendingWarnings[0] || activeWarnings[0] || visibleWarnings[0];

  const majors = [...new Set(students.map((s) => s.major))].map((major) => {
    const scoped = students.filter((s) => s.major === major);
    return { major, high: scoped.filter((s) => s.riskKey === "high").length, watch: scoped.filter((s) => s.riskKey === "watch").length, total: scoped.length };
  });
  const maxMajor = Math.max(...majors.map((m) => m.high + m.watch), 1);

  const statuses = [
    { name: "待确认", key: "todo", color: "#d98314" },
    { name: "帮扶中", key: "active", color: "#1267e8" },
    { name: "已结案", key: "done", color: "#60758d" },
  ].map((s) => ({ ...s, value: visibleWarnings.filter((w) => w.statusKey === s.key).length }));
  const maxStatus = Math.max(...statuses.map((s) => s.value), 1);

  return (
    <>
      <section className="workbench-summary">
        <div className="summary-title">
          <p className="eyebrow">今日工作台</p>
          <h2>先处理风险，再沉淀帮扶结果</h2>
          <p>把学生画像、课程短板、学习行为和预警单放在同一条业务线上，减少跨系统查找和人工汇总成本。</p>
        </div>
        <div className="summary-actions">
          <Link className="primary-link" to="/warnings">处理预警</Link>
          <Link className="text-button" to="/students">查看画像</Link>
          <Link className="text-button" to="/agent">询问 Agent</Link>
        </div>
      </section>

      <section className="kpi-strip" aria-label="关键风险指标">
        {[
          ["学生总数", data.overview.totalStudents, "已接入画像"],
          ["高风险", data.overview.highRisk, "优先处理"],
          ["待确认", data.overview.pendingWarnings, "辅导员核实"],
          ["帮扶中", data.overview.activeWarnings, "导师推进"],
          ["已结案", data.overview.closedWarnings, "形成案例"],
          ["平均 GPA", data.overview.averageGpa, "满分 4.0"],
        ].map(([label, value, note]) => (
          <div key={label} className="kpi-cell"><span>{label}</span><strong>{value}</strong><em>{note}</em></div>
        ))}
      </section>

      <section className="dashboard-layout">
        <div className="dashboard-main">
          <section className="ops-board">
            <Panel eyebrow="重点待办" title="当前最需要处理的学生" actions={<Link className="text-button" to="/students">看全部画像</Link>}>
              <div className="student-queue">
                {priorityStudents.map((s, i) => (
                  <Link key={s.no} className={`queue-row ${i === 0 ? "active" : ""}`} to="/students">
                    <span className="rank">{i + 1}</span>
                    <span className="queue-person"><strong>{s.name}</strong><em>{s.major} · {s.reason}</em></span>
                    <b className={riskClass(s.riskKey)}>{s.riskScore}</b>
                  </Link>
                ))}
              </div>
            </Panel>

            <Panel eyebrow="Agent 建议" title="下一步动作" actions={<Link className="text-button" to="/agent">打开对话</Link>}>
              <div className="agent-main"><strong>{data.agentInsight.title}</strong><p>{data.agentInsight.summary}</p></div>
              <div className="agent-chips">{data.agentInsight.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
              {selectedWarning && (
                <div className="next-warning">
                  <StatusPill status={selectedWarning.status} statusKey={selectedWarning.statusKey} />
                  <strong>{selectedWarning.code}</strong>
                  <p>{selectedWarning.title}</p>
                </div>
              )}
            </Panel>
          </section>

          <section className="grid-2">
            <Panel
              eyebrow="风险概览" title="学业风险分布"
              actions={
                <div className="segmented-control">
                  <button className="active" type="button">本周</button>
                  <button type="button">本月</button>
                  <button type="button">学期</button>
                </div>
              }
            >
              <div className="chart-layout">
                <DonutChart distribution={data.riskDistribution} />
              </div>
            </Panel>
            <Panel eyebrow="预警单状态" title="处理状态分布" actions={<span className="role-pill">闭环进度</span>}>
              <div className="bar-chart">
                {statuses.map((s) => (
                  <div key={s.key} className="bar-column" style={{ "--height": `${Math.max((s.value / maxStatus) * 100, 8)}%`, "--bar": s.color }}>
                    <strong>{s.value}</strong><span className="bar-visual" /><em>{s.name}</em>
                  </div>
                ))}
              </div>
            </Panel>
          </section>

          <section className="grid-2">
            <Panel eyebrow="专业对比" title="各专业风险人数统计">
              <div className="risk-bars compact">
                {majors.map((m) => {
                  const risky = m.high + m.watch;
                  return (
                    <div key={m.major} className="risk-row" style={{ "--risk-color": "#1267e8", "--width": `${Math.max((risky / maxMajor) * 100, 6)}%` }}>
                      <div className="risk-meta"><span className="risk-name"><i className="risk-dot" />{m.major}</span><strong>{risky}/{m.total} 人</strong></div>
                      <div className="bar-track"><div className="bar-fill" /></div>
                    </div>
                  );
                })}
              </div>
            </Panel>
            <Panel eyebrow="关联分析" title="学生 GPA 与出勤率关系">
              <ScatterChart students={students} />
            </Panel>
          </section>

          <section className="grid-2">
            <Panel eyebrow="趋势判断" title="风险与结案趋势" actions={<span className="role-pill">数据驱动决策</span>}>
              <TrendChart trend={data.riskTrend} />
            </Panel>
            <Panel eyebrow="帮扶成效" title="闭环处理质量" actions={<Link className="text-button" to="/workflow">看日志</Link>}>
              <div className="manager-kpi-grid">
                <span><strong>{data.effectiveness.closedRate}%</strong><em>结案率</em></span>
                <span><strong>{data.effectiveness.activeCount}</strong><em>帮扶中</em></span>
                <span><strong>{data.effectiveness.closedCount}</strong><em>已结案</em></span>
                <span><strong>{data.effectiveness.averageCycleDays}</strong><em>平均周期/天</em></span>
              </div>
              <div className="compact-list effectiveness-list">
                {(data.effectiveness.highPriority || []).map((item) => (
                  <Link key={item.student} to="/warnings"><strong>{item.student}</strong><span>{item.code} · {item.status} · {item.reviewAt} 复评</span></Link>
                ))}
                {(data.effectiveness.highPriority || []).length === 0 && (
                  <div className="empty-mini">当前没有未结案高风险预警</div>
                )}
              </div>
            </Panel>
          </section>

          <Panel eyebrow="苍穹接入" title="低代码对象与 Agent API" actions={<Link className="text-button" to="/settings">配置</Link>}>
            <div className="integration-summary">
              <strong>{data.integrationStatus.agentMode}</strong>
              <p>{data.integrationStatus.kingdeeBaseUrl}</p>
              <span className="status-pill active">{data.integrationStatus.thirdPartyApp.status}</span>
            </div>
            <div className="object-grid">
              {data.integrationStatus.objects.map((o) => (
                <div key={o.code}><strong>{o.name}</strong><span>{o.code}</span><em>{o.status} · {o.fields} 字段</em></div>
              ))}
            </div>
          </Panel>

          <Panel eyebrow="预警闭环" title="近期风险预警单" actions={<Link className="text-button" to="/warnings">进入管理</Link>}>
            <div className="table-wrap">
              <table className="data-table">
                <thead><tr><th>预警单</th><th>学生</th><th>风险等级</th><th>处理状态</th><th>建议处理人</th><th>复评时间</th></tr></thead>
                <tbody>
                  {visibleWarnings.slice(0, 5).map((w) => (
                    <tr key={w.code}>
                      <td><strong>{w.code}</strong><br /><span className="student-meta">{w.title}</span></td>
                      <td>{w.student}</td>
                      <td><RiskPill level={w.level} /></td>
                      <td><StatusPill status={w.status} statusKey={w.statusKey} /></td>
                      <td>{w.owner}</td>
                      <td>{w.reviewAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>

        <aside className="dashboard-rail">
          <Panel eyebrow="Agent 推荐" title="今日处理事项" actions={<Link className="text-button" to="/agent">进入对话</Link>} className="vivid-panel">
            <div className="agent-main"><strong>{data.agentInsight.title}</strong><p>{data.agentInsight.summary}</p></div>
            <div className="agent-chips">{data.agentInsight.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
          </Panel>
          <Panel eyebrow="最近生成" title="风险预警单">
            <div className="compact-list">
              {data.warnings.map((w) => (
                <Link key={w.code} to="/warnings"><strong>{w.code}</strong><span>{w.student} · {w.status}</span></Link>
              ))}
            </div>
          </Panel>
          <Panel eyebrow="辅导员待办" title="待确认列表">
            <div className="compact-list">
              {pendingWarnings.map((w) => (
                <Link key={w.code} to="/warnings"><strong>{w.student}</strong><span>{w.title}</span></Link>
              ))}
              {pendingWarnings.length === 0 && <div className="empty-mini">暂无待确认预警单</div>}
            </div>
          </Panel>
          <Panel eyebrow="闭环案例" title="已结案帮扶">
            <div className="compact-list">
              {warnings.filter((w) => w.statusKey === "done").map((w) => (
                <Link key={w.code} to="/workflow"><strong>{w.student}</strong><span>{w.studentFeedback}</span></Link>
              ))}
              {warnings.filter((w) => w.statusKey === "done").length === 0 && <div className="empty-mini">暂无已结案案例</div>}
            </div>
          </Panel>
        </aside>
      </section>
    </>
  );
}
