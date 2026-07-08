import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { canPerform } from "../../utils/permissions";
import Panel from "../../components/Panel/Panel";
import { showToast } from "../../components/Toast/Toast";

function SettingSwitch({ label, on }) {
  return <div className="module-card switch-line"><strong>{label}</strong><span className={`switch ${on ? "on" : ""}`} aria-hidden="true" /></div>;
}

export default function Settings() {
  const { data } = useAuth();
  const [apiBase, setApiBase] = useState(localStorage.getItem("campuspilot:apiBase") || "http://10.0.160.250:8080/ierp");

  if (!data) return null;

  const handleSave = () => {
    if (!canPerform("saveSettings")) { showToast("当前角色无权执行该操作"); return; }
    localStorage.setItem("campuspilot:apiBase", apiBase.trim());
    showToast("设置已保存到当前环境");
  };

  const integration = data.integrationStatus;

  return (
    <>
      <section className="content-grid">
        <Panel eyebrow="接口配置" title="数据源与 Agent 工具" actions={<button className="text-button" type="button" onClick={handleSave}>保存设置</button>}>
          <div className="form-grid">
            <label className="field"><span>金蝶环境地址</span><input value={apiBase} onChange={(e) => setApiBase(e.target.value)} /></label>
            <label className="field"><span>默认租户</span><input defaultValue="CampusPilot 校园租户" /></label>
            <label className="field"><span>学生画像对象编码</span><input defaultValue="cp_student_profile" /></label>
            <label className="field"><span>风险预警单对象编码</span><input defaultValue="cp_warning_order" /></label>
            <label className="field"><span>Agent 名称</span><input defaultValue="CampusPilot 学业成长助手" /></label>
            <label className="field"><span>工具调用模式</span>
              <select defaultValue="知识库优先 + 工具增强"><option>知识库优先 + 工具增强</option><option>工具优先 + 知识库兜底</option></select>
            </label>
          </div>
        </Panel>
        <Panel eyebrow="系统开关" title="运行与审计">
          <div className="setting-stack">
            <SettingSwitch label="启用驾驶舱统计" on={true} />
            <SettingSwitch label="启用 Agent 结构化输出" on={true} />
            <SettingSwitch label="启用处理过程记录" on={true} />
            <SettingSwitch label="记录用户操作审计" on={true} />
            <SettingSwitch label="自动生成预警单" on={false} />
          </div>
        </Panel>
      </section>
      <section className="content-grid">
        <Panel eyebrow="第三方应用" title="金蝶 OpenAPI 接入边界" actions={<span className="status-pill todo">{integration.thirdPartyApp.status}</span>}>
          <div className="integration-summary">
            <strong>{integration.thirdPartyApp.appId}</strong>
            <p>{integration.thirdPartyApp.auth}</p>
            <p>本地前后端只负责业务界面、数据闭环和 Agent API 调用入口；Agent 本体、RAG 和工具编排在金蝶平台低代码配置。</p>
          </div>
        </Panel>
        <Panel eyebrow="低代码模型" title="业务对象清单">
          <div className="object-grid">
            {integration.objects.map((o) => (
              <div key={o.code}><strong>{o.name}</strong><span>{o.code}</span><em>{o.status} · {o.fields} 字段</em></div>
            ))}
          </div>
        </Panel>
      </section>
      <Panel eyebrow="风险规则" title="标准化判断条件">
        <div className="grid-3">
          {["高风险：GPA < 2.0 或挂科数 >= 2", "高风险：核心课程明显不及格", "高风险：出勤 < 0.8 且作业 < 0.7", "需要关注：GPA 2.0 到 2.8", "需要关注：出勤低于 0.85", "正常：无挂科且行为稳定"].map((r) => (
            <div key={r} className="module-card"><strong>{r}</strong><p>同步到 Agent 提示词、知识库和项目说明。</p></div>
          ))}
        </div>
      </Panel>
    </>
  );
}
