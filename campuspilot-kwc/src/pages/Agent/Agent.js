import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import RiskPill from "../../components/RiskPill/RiskPill";
import { showToast } from "../../components/Toast/Toast";

const QUICK_PROMPTS = ["查看张明远当前风险情况", "李佳怡是否需要生成预警单", "为陈思琪生成成长规划", "列出待辅导员确认的预警单"];

export default function Agent() {
  const { data, user, api } = useAuth();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", name: "CampusPilot 学业成长助手", text: "你好，我可以查询学生画像、课程成绩、学习行为和风险预警单，并生成结构化帮扶建议。你可以直接输入学生姓名或预警单号。" },
    { role: "user", name: "辅导员提问", text: "张明远现在为什么属于高风险？下一步应该怎么处理？" },
    {
      role: "assistant", name: "结构化建议",
      text: "【风险等级】高风险。依据包括挂科数 2、出勤率 76%、作业完成率 62%，且高等数学和数据结构薄弱。建议辅导员确认 RW2026001，导师制定 4 周补强计划，并在 2026-06-10 复评。",
      chips: ["学生画像", "课程成绩", "学习行为", "风险预警单"],
    },
  ]);
  const threadRef = useRef(null);
  const sample = data?.students?.[0];

  useEffect(() => {
    if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const q = question.trim();
    if (!q) { showToast("请输入要咨询的问题"); return; }

    setMessages((prev) => [...prev, { role: "user", name: `${user?.role || "用户"}提问`, text: q }]);
    setQuestion("");

    const result = await api.agentChat(q, user?.role);
    const answer = result.answer || "Agent 分析结果";
    const chips = result.chips || ["工具查询结果", "风险规则", "预警单字段"];

    setMessages((prev) => [...prev, { role: "assistant", name: "Agent 建议", text: answer, chips }]);
    showToast("Agent 已通过 API 返回结构化建议");
  };

  const handleQuickPrompt = (prompt) => {
    setQuestion(prompt);
  };

  if (!data) return null;

  return (
    <section className="agent-workspace">
      <aside className="agent-context">
        <Link className="brand agent-brand" to="/dashboard" aria-label="返回驾驶舱">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32"><path d="M6 17.5 16 5l10 12.5-4.1 2.2L16 12.3l-5.9 7.4L6 17.5Z" /><path d="M8.8 22.5 16 18l7.2 4.5L16 27 8.8 22.5Z" /></svg>
          </span>
          <span><strong>AI 成长助手</strong><small>CampusPilot Agent</small></span>
        </Link>
        <div className="agent-context-actions">
          <button className="text-button" type="button" onClick={() => document.body.classList.add("agent-nav-open")}>主导航</button>
          <a className="text-button" href="#/warnings">查看预警单</a>
        </div>
        {sample && (
          <div className="agent-focus">
            <p className="eyebrow">当前重点学生</p>
            <strong>{sample.name}</strong>
            <RiskPill level={sample.riskLevel} />
            <div className="profile-key-grid slim">
              <span><strong>{sample.riskScore}</strong><em>风险分数</em></span>
              <span><strong>{sample.gpa}</strong><em>GPA</em></span>
              <span><strong>{sample.attendance}%</strong><em>出勤率</em></span>
              <span><strong>{sample.failed}</strong><em>挂科数</em></span>
            </div>
          </div>
        )}
        <div className="tool-stack">
          {["query_student_profile", "query_course_score", "query_learning_behavior", "query_warning_order", "create_warning_order", "generate_growth_plan"].map((t) => <span key={t}>{t}<b>已预留</b></span>)}
        </div>
        {sample && (
          <div className="agent-field-map">
            <p className="eyebrow">预警单字段</p>
            {[`学生编号 ${sample.no}`, `学生姓名 ${sample.name}`, `风险等级 ${sample.riskLevel}`, `风险分数 ${sample.riskScore}`, "处理状态 待确认"].map((f) => <span key={f}>{f}</span>)}
          </div>
        )}
      </aside>
      <article className="agent-console">
        <div className="chat-shell immersive">
          <div className="chat-thread" ref={threadRef}>
            {messages.map((m, i) => (
              <article key={i} className={`chat-message ${m.role}`}>
                <span className="avatar small">{m.role === "assistant" ? "AI" : (user?.name?.slice(0, 1) || "王")}</span>
                <div className="chat-bubble">
                  <strong>{m.name}</strong>
                  <p>{m.text}</p>
                  {m.chips && <div className="agent-chips">{m.chips.map((c, j) => <span key={j} className="chip">{c}</span>)}</div>}
                </div>
              </article>
            ))}
          </div>
          <div className="quick-prompts" aria-label="建议提问">
            {QUICK_PROMPTS.map((p) => (
              <button key={p} type="button" onClick={() => handleQuickPrompt(p)}>{p}</button>
            ))}
          </div>
          <form className="chat-input" onSubmit={handleSubmit}>
            <label className="field">
              <span>输入问题</span>
              <textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="例如：张明远下一步应该由谁处理？是否需要生成风险预警单？" />
            </label>
            <button className="primary-button send-arrow-button" type="submit" aria-label="发送给学业成长助手">→</button>
          </form>
        </div>
      </article>
    </section>
  );
}
