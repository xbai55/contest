const API_BASE = window.CAMPUSPILOT_API_BASE ?? "";

const mockData = {
  overview: {
    totalStudents: 5,
    highRisk: 1,
    watchRisk: 1,
    normal: 2,
    improved: 1,
    pendingWarnings: 1,
    activeWarnings: 1,
    closedWarnings: 1,
    averageGpa: 3.02,
    averageAttendance: 88,
  },
  riskDistribution: [
    { name: "高风险", value: 1, color: "#d43f3a", key: "high" },
    { name: "需要关注", value: 1, color: "#d98314", key: "watch" },
    { name: "正常", value: 2, color: "#24966d", key: "normal" },
    { name: "改善中", value: 1, color: "#60758d", key: "improved" },
  ],
  students: [
    {
      name: "张明远",
      no: "STU2026001",
      college: "信息工程学院",
      major: "人工智能",
      grade: "2023级",
      className: "AI 2301",
      goal: "AI 算法工程师",
      interest: "机器学习、算法竞赛",
      gpa: 2.31,
      creditRate: 71,
      failed: 2,
      attendance: 76,
      assignment: 62,
      innovation: 38,
      riskLevel: "高风险",
      riskKey: "high",
      riskScore: 86,
      reason: "高等数学和数据结构薄弱，出勤率与作业完成率偏低。",
      advice: "建议辅导员确认预警，导师制定 4 周课程补强计划。",
      status: "帮扶中",
      updatedAt: "2026-06-05",
    },
    {
      name: "李佳怡",
      no: "STU2026002",
      college: "信息工程学院",
      major: "数据科学",
      grade: "2023级",
      className: "DS 2302",
      goal: "数据分析师",
      interest: "数据可视化、商业分析",
      gpa: 3.08,
      creditRate: 88,
      failed: 0,
      attendance: 78,
      assignment: 82,
      innovation: 55,
      riskLevel: "需要关注",
      riskKey: "watch",
      riskScore: 62,
      reason: "无挂科，但近期出勤率下降，学习平台活跃度偏低。",
      advice: "建议辅导员进行学习习惯提醒，并跟踪未来两周出勤。",
      status: "待确认",
      updatedAt: "2026-06-05",
    },
    {
      name: "陈思琪",
      no: "STU2026003",
      college: "计算机学院",
      major: "软件工程",
      grade: "2023级",
      className: "SE 2301",
      goal: "待明确",
      interest: "前端开发、产品设计",
      gpa: 3.21,
      creditRate: 91,
      failed: 0,
      attendance: 91,
      assignment: 89,
      innovation: 42,
      riskLevel: "正常",
      riskKey: "normal",
      riskScore: 28,
      reason: "学业表现稳定，但职业目标不够明确。",
      advice: "建议导师帮助其明确成长方向，推荐参与课程项目。",
      status: "成长规划中",
      updatedAt: "2026-06-04",
    },
    {
      name: "周泽宇",
      no: "STU2026004",
      college: "网络空间安全学院",
      major: "网络安全",
      grade: "2023级",
      className: "NS 2301",
      goal: "安全工程师",
      interest: "攻防演练、网络协议",
      gpa: 3.62,
      creditRate: 96,
      failed: 0,
      attendance: 96,
      assignment: 94,
      innovation: 81,
      riskLevel: "正常",
      riskKey: "normal",
      riskScore: 16,
      reason: "学业和行为表现良好，科创参与度高。",
      advice: "建议继续参加安全竞赛和项目实践。",
      status: "正常跟踪",
      updatedAt: "2026-06-03",
    },
    {
      name: "王嘉宁",
      no: "STU2026005",
      college: "信息工程学院",
      major: "计算机科学与技术",
      grade: "2023级",
      className: "CS 2303",
      goal: "后端工程师",
      interest: "数据库、分布式系统",
      gpa: 2.92,
      creditRate: 84,
      failed: 0,
      attendance: 89,
      assignment: 87,
      innovation: 63,
      riskLevel: "改善中",
      riskKey: "improved",
      riskScore: 41,
      reason: "曾有行为风险，近期出勤和作业完成率明显改善。",
      advice: "建议保持复评，沉淀为帮扶改善案例。",
      status: "已结案",
      updatedAt: "2026-06-02",
    },
  ],
  courses: [
    { student: "张明远", course: "高等数学", score: 58, type: "核心基础", status: "不及格", advice: "每周 2 次辅导与错题复盘" },
    { student: "张明远", course: "数据结构", score: 61, type: "核心专业", status: "薄弱", advice: "补强线性表、树、图基础" },
    { student: "张明远", course: "Python 程序设计", score: 72, type: "程序设计", status: "一般", advice: "结合算法题巩固语法与调试" },
    { student: "李佳怡", course: "数据可视化", score: 86, type: "专业方向", status: "良好", advice: "可参与驾驶舱展示优化" },
    { student: "陈思琪", course: "Java 程序设计", score: 84, type: "程序设计", status: "良好", advice: "建议参与 Web 项目实践" },
    { student: "周泽宇", course: "网络安全基础", score: 92, type: "专业方向", status: "优秀", advice: "推荐参加攻防演练" },
    { student: "王嘉宁", course: "数据库原理", score: 81, type: "核心专业", status: "良好", advice: "可拓展事务与索引优化" },
  ],
  behaviors: [
    { student: "张明远", attendance: 76, assignment: 62, activity: 48, interaction: 3, lastLogin: "2026-06-04", note: "出勤和作业完成率均偏低" },
    { student: "李佳怡", attendance: 78, assignment: 82, activity: 51, interaction: 4, lastLogin: "2026-06-03", note: "近期出勤下降，需要行为关注" },
    { student: "陈思琪", attendance: 91, assignment: 89, activity: 67, interaction: 7, lastLogin: "2026-06-05", note: "学习行为稳定" },
    { student: "周泽宇", attendance: 96, assignment: 94, activity: 88, interaction: 12, lastLogin: "2026-06-05", note: "活跃度和互动次数高" },
    { student: "王嘉宁", attendance: 89, assignment: 87, activity: 70, interaction: 8, lastLogin: "2026-06-04", note: "帮扶后行为改善明显" },
  ],
  warnings: [
    {
      code: "RW2026001",
      title: "张明远高风险学业预警",
      studentNo: "STU2026001",
      student: "张明远",
      level: "高风险",
      riskKey: "high",
      score: 86,
      source: "Agent 风险分析",
      status: "帮扶中",
      statusKey: "active",
      owner: "辅导员 / 专业导师",
      reviewAt: "2026-06-10",
      counselorNote: "已确认存在学业高风险，需进入重点帮扶。",
      mentorPlan: "制定高等数学与数据结构 4 周补强计划。",
      studentFeedback: "愿意参加每周辅导并提交学习记录。",
    },
    {
      code: "RW2026002",
      title: "李佳怡学习行为关注预警",
      studentNo: "STU2026002",
      student: "李佳怡",
      level: "需要关注",
      riskKey: "watch",
      score: 62,
      source: "学习行为监测",
      status: "待确认",
      statusKey: "todo",
      owner: "辅导员",
      reviewAt: "2026-06-12",
      counselorNote: "待辅导员核实近期请假与课程参与情况。",
      mentorPlan: "暂未进入导师帮扶。",
      studentFeedback: "未反馈。",
    },
    {
      code: "RW2026003",
      title: "王嘉宁阶段帮扶改善记录",
      studentNo: "STU2026005",
      student: "王嘉宁",
      level: "改善中",
      riskKey: "improved",
      score: 41,
      source: "辅导员复评",
      status: "已结案",
      statusKey: "done",
      owner: "学院管理者",
      reviewAt: "2026-06-15",
      counselorNote: "连续两周出勤与作业完成率改善。",
      mentorPlan: "继续跟踪数据库课程项目。",
      studentFeedback: "已完成阶段任务。",
    },
  ],
  workflow: [
    { step: "风险识别", owner: "系统 / Agent", time: "2026-06-04", detail: "根据画像、成绩和行为识别张明远为高风险。" },
    { step: "生成预警单", owner: "风险预警对象", time: "2026-06-04", detail: "形成 RW2026001，预警来源为 Agent 风险分析。" },
    { step: "辅导员确认", owner: "辅导员", time: "2026-06-05", detail: "确认风险，填写辅导员意见并推进导师帮扶。" },
    { step: "导师帮扶", owner: "专业导师", time: "2026-06-05", detail: "制定高等数学与数据结构 4 周补强计划。" },
    { step: "学生反馈", owner: "学生", time: "2026-06-06", detail: "学生确认参加辅导并提交阶段学习记录。" },
    { step: "复评结案", owner: "辅导员 / 学院", time: "待复评", detail: "根据后续出勤、作业和课程测验决定是否结案。" },
  ],
  agentInsight: {
    title: "优先处理张明远高风险学业预警",
    summary:
      "建议辅导员先确认 RW2026001，导师同步制定高等数学与数据结构 4 周补强计划，并在下次复评中重点观察出勤率和作业完成率。",
    tags: ["高风险", "导师帮扶", "4 周复评", "可生成预警建议"],
  },
  roles: [
    { role: "学生", duty: "查看自己的成长画像、查看 AI 学习建议、提交帮扶反馈。", route: "#students", actor: "张明远" },
    { role: "辅导员", duty: "查看风险学生列表、确认风险预警单、填写辅导员意见、跟踪处理状态。", route: "#warnings", actor: "王老师" },
    { role: "导师", duty: "查看学生课程短板、制定帮扶措施、推荐课程和项目。", route: "#courses", actor: "陈导师" },
    { role: "学院管理者", duty: "查看驾驶舱、风险分布、预警处理情况和帮扶成效。", route: "#dashboard", actor: "学院管理者" },
  ],
  auditLogs: [
    { time: "2026-06-06 18:40", actor: "王老师", action: "查看张明远学生画像" },
    { time: "2026-06-06 18:47", actor: "CampusPilot Agent", action: "生成高风险帮扶建议" },
    { time: "2026-06-06 18:55", actor: "陈导师", action: "更新导师帮扶措施" },
  ],
};

const routeMeta = {
  home: {
    eyebrow: "AI 原生学业风险治理平台",
    title: "启航智伴 CampusPilot",
    subtitle: "面向学生成长画像、风险预警、帮扶协同与治理分析的一体化工作系统。",
  },
  "student-home": {
    eyebrow: "个人工作台",
    title: "我的成长画像",
    subtitle: "查看个人学业状态、AI 学习建议和帮扶反馈入口。",
  },
  "teacher-home": {
    eyebrow: "教学工作台",
    title: "课程短板与帮扶措施",
    subtitle: "查看学生课程短板，制定导师帮扶计划并跟踪复评结果。",
  },
  "counselor-home": {
    eyebrow: "风险处置",
    title: "风险学生处置工作台",
    subtitle: "确认风险预警、跟踪帮扶状态，并协调教师与学生反馈。",
  },
  "admin-home": {
    eyebrow: "治理驾驶舱",
    title: "学院风险治理驾驶舱",
    subtitle: "查看学院风险分布、预警处理进度、帮扶成效和系统配置。",
  },
  dashboard: {
    eyebrow: "AI 原生智慧校园平台",
    title: "CampusPilot 学业风险驾驶舱",
    subtitle: "学生画像、风险预警、Agent 分析与帮扶闭环的一体化工作台。",
  },
  students: {
    eyebrow: "低代码业务对象",
    title: "学生画像中心",
    subtitle: "沉淀学生基础信息、成长目标、学业表现、学习行为与风险状态。",
  },
  courses: {
    eyebrow: "课程成绩数据",
    title: "课程成绩与短板分析",
    subtitle: "识别核心课程薄弱点，为 Agent 风险解释和导师帮扶提供证据。",
  },
  behavior: {
    eyebrow: "学习行为数据",
    title: "学习行为监测",
    subtitle: "出勤、作业、平台活跃度和课堂互动共同支撑行为风险判断。",
  },
  warnings: {
    eyebrow: "风险预警闭环",
    title: "风险预警单管理",
    subtitle: "承载风险原因、AI 建议、处理状态、辅导员意见、导师措施和学生反馈。",
  },
  agent: {
    eyebrow: "Agent 智能分析",
    title: "CampusPilot 学业成长助手",
    subtitle: "标准化输出风险判断、成长规划和可映射到预警单字段的结构化建议。",
  },
  workflow: {
    eyebrow: "业务处理闭环",
    title: "风险处理过程展示",
    subtitle: "展示从风险识别、预警生成、辅导员确认、导师帮扶到复评结案的业务链路。",
  },
  user: {
    eyebrow: "组织与权限",
    title: "用户中心",
    subtitle: "展示当前账号、角色职责、权限范围与操作记录。",
  },
  settings: {
    eyebrow: "系统配置",
    title: "设置中心",
    subtitle: "配置接口地址、Agent 策略、风险规则、展示偏好和审计开关。",
  },
};

const defaultApi = {
  fetchOverview: () => fetchOrMock("/api/campuspilot/overview", mockData.overview),
  fetchRiskDistribution: () => fetchOrMock("/api/campuspilot/risk-distribution", mockData.riskDistribution),
  fetchStudents: () => fetchOrMock("/api/campuspilot/students", mockData.students),
  fetchCourses: () => fetchOrMock("/api/campuspilot/courses", mockData.courses),
  fetchBehaviors: () => fetchOrMock("/api/campuspilot/behaviors", mockData.behaviors),
  fetchWarnings: () => fetchOrMock("/api/campuspilot/warnings", mockData.warnings),
  fetchWorkflow: () => fetchOrMock("/api/campuspilot/workflow", mockData.workflow),
  fetchWorkflowLogs: () => fetchOrMock("/api/campuspilot/workflow-logs", []),
  fetchRiskTrend: () => fetchOrMock("/api/campuspilot/risk-trend", [
    { week: "第1周", high: 2, watch: 2, done: 0 },
    { week: "第2周", high: 2, watch: 1, done: 1 },
    { week: "第3周", high: 1, watch: 2, done: 1 },
    { week: "第4周", high: 1, watch: 1, done: 1 },
  ]),
  fetchEffectiveness: () => fetchOrMock("/api/campuspilot/effectiveness", { closedRate: 33, activeCount: 1, closedCount: 1, averageCycleDays: 7, highPriority: [] }),
  fetchIntegrationStatus: () => fetchOrMock("/api/campuspilot/integration-status", {
    kingdeeBaseUrl: "http://10.0.160.250:8080/ierp",
    agentMode: "金蝶 Agent API 接入",
    objects: [
      { name: "学生画像", code: "cp_student_profile", status: "已建模", fields: 12 },
      { name: "风险预警单", code: "cp_warning_order", status: "已建模", fields: 13 },
    ],
    thirdPartyApp: { appId: "campuspilot_isv", auth: "AccessToken / API 授权 / IP 白名单", status: "待配置真实密钥" },
  }),
  fetchAgentInsight: () => fetchOrMock("/api/campuspilot/agent-insight", mockData.agentInsight),
  fetchRoles: () => fetchOrMock("/api/campuspilot/roles", mockData.roles),
  fetchAuditLogs: () => fetchOrMock("/api/campuspilot/audit-logs", mockData.auditLogs),
  agentChat: (question, role) => postOrMock("/api/campuspilot/agent/chat", { question, role }, { answer: buildAgentAnswer(question), chips: ["本地兜底", "风险规则", "预警单字段"] }),
  createWarningSuggestion: () => postOrMock("/api/campuspilot/warnings/suggest", {}, {
    title: "张明远高风险学业预警",
    student_no: "STU2026001",
    student_name: "张明远",
    risk_level: "高风险",
    risk_score: 86,
    source: "Agent 风险分析",
    status: "待确认",
  }),
  confirmWarning: (code, counselorNote) => postOrMock(`/api/campuspilot/warnings/${code}/confirm`, { counselorNote }, { ok: true }),
  saveMentorPlan: (code, mentorPlan) => postOrMock(`/api/campuspilot/warnings/${code}/mentor-plan`, { mentorPlan }, { ok: true }),
  submitFeedback: (code, studentFeedback) => postOrMock(`/api/campuspilot/warnings/${code}/feedback`, { studentFeedback }, { ok: true }),
  closeWarning: (code, closeNote) => postOrMock(`/api/campuspilot/warnings/${code}/close`, { closeNote }, { ok: true }),
};

const api = window.CampusPilotAPI || defaultApi;
const state = {
  query: "",
  data: null,
  publicCarouselTimer: null,
};

const ROLE_PERMISSIONS = {
  学生: {
    home: "student-home",
    routes: ["student-home", "students", "courses", "behavior", "agent", "user"],
    actions: ["viewOwnProfile", "viewCourses", "viewAgentAdvice", "submitFeedback"],
    dataScopes: { students: "self", courses: "self", behaviors: "self", warnings: "self", auditLogs: "self" },
    labels: ["查看本人画像", "查看课程成绩", "查看 AI 学习建议", "提交帮扶反馈"],
  },
  辅导员: {
    home: "counselor-home",
    routes: ["counselor-home", "dashboard", "students", "behavior", "warnings", "agent", "workflow", "user"],
    actions: ["viewRiskStudents", "confirmWarning", "closeWarning", "createWarningSuggestion", "viewBehaviors", "viewWarnings"],
    dataScopes: { students: "risk", courses: "risk", behaviors: "risk", warnings: "counselor", auditLogs: "limited" },
    labels: ["查看风险学生", "确认风险预警单", "填写辅导员意见", "跟踪处理状态"],
  },
  导师: {
    home: "teacher-home",
    routes: ["teacher-home", "students", "courses", "warnings", "agent", "workflow", "user"],
    actions: ["viewCourseShortfalls", "saveMentorPlan", "viewWarnings", "viewWorkflow"],
    dataScopes: { students: "mentor", courses: "mentor", behaviors: "none", warnings: "mentor", auditLogs: "limited" },
    labels: ["查看课程短板", "制定帮扶措施", "推荐课程和项目", "查看帮扶进展"],
  },
  学院管理者: {
    home: "admin-home",
    routes: ["admin-home", "dashboard", "students", "warnings", "workflow", "user", "settings"],
    actions: ["viewDashboard", "viewWarnings", "viewAudit", "saveSettings"],
    dataScopes: { students: "all", courses: "all", behaviors: "all", warnings: "all", auditLogs: "all" },
    labels: ["查看驾驶舱", "查看风险分布", "查看预警处理情况", "查看帮扶成效", "配置系统规则"],
  },
};

function fetchOrMock(path, fallback) {
  return fetch(`${API_BASE}${path}`, { headers: requestHeaders() })
    .then((response) => {
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      return response.json();
    })
    .catch(() => clone(fallback));
}

function postOrMock(path, body, fallback) {
  return fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: requestHeaders(true),
    body: JSON.stringify({ ...body, __user: getUser() }),
  })
    .then((response) => {
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      return response.json();
    })
    .catch(() => clone(fallback));
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function requestHeaders(withBody = false) {
  const user = getUser();
  const headers = {
    Accept: "application/json",
  };
  if (user) {
    headers["X-CampusPilot-Role-Key"] = roleKey(user.role);
    headers["X-CampusPilot-User"] = encodeURIComponent(user.name);
  }
  if (withBody) headers["Content-Type"] = "application/json";
  return headers;
}

function roleKey(role) {
  return { 学生: "student", 辅导员: "counselor", 导师: "mentor", 学院管理者: "manager" }[role] || "counselor";
}

function getUser() {
  const stored = localStorage.getItem("campuspilot:user");
  if (stored) return JSON.parse(stored);
  return null;
}

function isAuthenticated() {
  return Boolean(getUser());
}

function getPermissions(role = getUser()?.role) {
  return ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS["辅导员"];
}

function roleConfig(role = getUser()?.role) {
  return getPermissions(role);
}

function canAccess(route) {
  if (route === "home") return true;
  if (!isAuthenticated()) return route === "home";
  return getPermissions().routes.includes(route);
}

function canPerform(action) {
  if (!isAuthenticated()) return false;
  return getPermissions().actions.includes(action);
}

function isSelfStudentName(name, user = getUser()) {
  if (!user) return false;
  return name === user.name || (user.role === "学生" && user.name === "张明远" && name === "张明远");
}

function scopeStudents(students) {
  const user = getUser();
  const scope = getPermissions().dataScopes.students;
  if (scope === "self") return students.filter((student) => isSelfStudentName(student.name, user) || student.no === "STU2026001");
  if (scope === "risk") return students.filter((student) => ["high", "watch", "improved"].includes(student.riskKey));
  if (scope === "mentor") return students.filter((student) => student.riskKey === "high" || student.status.includes("帮扶") || student.status.includes("规划"));
  if (scope === "none") return [];
  return students;
}

function scopeCourses(courses) {
  const user = getUser();
  const scope = getPermissions().dataScopes.courses;
  if (scope === "self") return courses.filter((item) => isSelfStudentName(item.student, user) || item.student === "张明远");
  if (scope === "risk") return courses.filter((item) => ["张明远", "李佳怡", "王嘉宁"].includes(item.student));
  if (scope === "mentor") return courses.filter((item) => item.score < 75 || item.student === "陈思琪");
  if (scope === "none") return [];
  return courses;
}

function scopeBehaviors(behaviors) {
  const user = getUser();
  const scope = getPermissions().dataScopes.behaviors;
  if (scope === "self") return behaviors.filter((item) => isSelfStudentName(item.student, user) || item.student === "张明远");
  if (scope === "risk") return behaviors.filter((item) => item.attendance < 90 || item.assignment < 90);
  if (scope === "none") return [];
  return behaviors;
}

function scopeWarnings(warnings) {
  const user = getUser();
  const scope = getPermissions().dataScopes.warnings;
  if (scope === "self") return warnings.filter((warning) => isSelfStudentName(warning.student, user) || warning.studentNo === "STU2026001");
  if (scope === "mentor") return warnings.filter((warning) => warning.statusKey === "active" || warning.riskKey === "high");
  if (scope === "counselor") return warnings.filter((warning) => warning.statusKey !== "done" || warning.riskKey !== "normal");
  if (scope === "none") return [];
  return warnings;
}

function scopeAuditLogs(auditLogs) {
  const user = getUser();
  const scope = getPermissions().dataScopes.auditLogs;
  if (scope === "self") return auditLogs.filter((log) => log.actor === user.name || log.actor === "CampusPilot Agent");
  if (scope === "limited") return auditLogs.slice(0, 5);
  return auditLogs;
}

async function loadData() {
  if (!isAuthenticated()) {
    state.data = null;
    return;
  }
  const [overview, riskDistribution, students, courses, behaviors, warnings, workflow, workflowLogs, riskTrend, effectiveness, integrationStatus, agentInsight, roles, auditLogs] =
    await Promise.all([
      api.fetchOverview(),
      api.fetchRiskDistribution(),
      api.fetchStudents(),
      api.fetchCourses(),
      api.fetchBehaviors(),
      api.fetchWarnings(),
      api.fetchWorkflow(),
      api.fetchWorkflowLogs(),
      api.fetchRiskTrend(),
      api.fetchEffectiveness(),
      api.fetchIntegrationStatus(),
      api.fetchAgentInsight(),
      api.fetchRoles(),
      api.fetchAuditLogs(),
    ]);
  state.data = {
    overview,
    riskDistribution,
    students,
    courses,
    behaviors,
    warnings,
    workflow,
    workflowLogs,
    riskTrend,
    effectiveness,
    integrationStatus,
    agentInsight,
    roles,
    auditLogs,
  };
}

function currentRoute() {
  const requested = (location.hash || "#home").replace("#", "") || "home";
  if (requested === "home") return "home";
  if (!isAuthenticated()) return "home";
  if (routeMeta[requested] && canAccess(requested)) return requested;
  return roleConfig().home;
}

function matchQuery(item) {
  if (!state.query.trim()) return true;
  return Object.values(item).join(" ").toLowerCase().includes(state.query.trim().toLowerCase());
}

function riskClass(key) {
  return { high: "high", watch: "watch", normal: "normal", improved: "improved" }[key] || "normal";
}

function statusClass(key) {
  return { todo: "todo", active: "active", done: "done" }[key] || "todo";
}

function metricCards(overview) {
  const metrics = [
    { label: "学生总数", value: overview.totalStudents, note: "已接入学生画像", tone: "blue", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0H5Z" },
    { label: "高风险学生数", value: overview.highRisk, note: "需优先处理", tone: "red", icon: "M12 3 2.8 19h18.4L12 3Zm1 12h-2v2h2v-2Zm0-6h-2v5h2V9Z" },
    { label: "需要关注学生数", value: overview.watchRisk, note: "需辅导员确认", tone: "orange", icon: "M12 2 20 6v6c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6l8-4Zm0 4-4 2v4c0 2.8 1.6 4.8 4 6 2.4-1.2 4-3.2 4-6V8l-4-2Z" },
    { label: "正常学生数", value: overview.normal, note: "保持常规跟踪", tone: "green", icon: "M9.5 16.2 5.8 12.5l-1.4 1.4 5.1 5.1L20 8.5l-1.4-1.4-9.1 9.1Z" },
    { label: "待确认预警单数", value: overview.pendingWarnings, note: "待辅导员核实", tone: "orange", icon: "M5 4h14v16H5V4Zm3 4h8v2H8V8Zm0 4h8v2H8v-2Zm0 4h5v2H8v-2Z" },
    { label: "帮扶中预警单数", value: overview.activeWarnings, note: "导师措施推进中", tone: "blue", icon: "M4 5h16v3H4V5Zm0 5h16v9H4v-9Zm3 2v2h7v-2H7Z" },
    { label: "已结案预警单数", value: overview.closedWarnings, note: "沉淀改善案例", tone: "slate", icon: "M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm7 3.2 5.4-5.4-1.4-1.4-4 4-2-2-1.4 1.4 3.4 3.4Z" },
    { label: "平均 GPA", value: overview.averageGpa, note: "满分 4.0", tone: "blue", icon: "M5 4h14v3H5V4Zm0 5h9v3H5V9Zm0 5h14v3H5v-3Z" },
    { label: "平均出勤率", value: `${overview.averageAttendance}%`, note: "学习行为均值", tone: "green", icon: "M5 12h3v7H5v-7Zm5-7h3v14h-3V5Zm5 4h3v10h-3V9Z" },
  ];
  return `<section class="metric-grid">${metrics.map((item) => `
    <article class="metric-card tone-${item.tone}">
      <div class="metric-top">
        <span class="metric-label">${item.label}</span>
        <span class="metric-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${item.icon}"></path></svg></span>
      </div>
      <strong class="metric-value">${item.value}</strong>
      <span class="muted">${item.note}</span>
    </article>`).join("")}</section>`;
}

function statusDistributionPanel(warnings) {
  const statuses = [
    { name: "待确认", key: "todo", color: "#d98314" },
    { name: "帮扶中", key: "active", color: "#1267e8" },
    { name: "已结案", key: "done", color: "#60758d" },
  ].map((item) => ({
    ...item,
    value: warnings.filter((warning) => warning.statusKey === item.key).length,
  }));
  const max = Math.max(...statuses.map((item) => item.value), 1);
  return `<article class="panel">
    <div class="panel-heading"><div><p class="eyebrow">预警单状态</p><h2>处理状态分布</h2></div><span class="role-pill">闭环进度</span></div>
    <div class="bar-chart">${statuses.map((item) => `
      <div class="bar-column" style="--height:${Math.max((item.value / max) * 100, 8)}%;--bar:${item.color}">
        <strong>${item.value}</strong><span class="bar-visual"></span><em>${item.name}</em>
      </div>`).join("")}</div>
  </article>`;
}

function majorRiskPanel(students) {
  const majors = [...new Set(students.map((student) => student.major))].map((major) => {
    const scoped = students.filter((student) => student.major === major);
    return {
      major,
      high: scoped.filter((student) => student.riskKey === "high").length,
      watch: scoped.filter((student) => student.riskKey === "watch").length,
      total: scoped.length,
    };
  });
  const max = Math.max(...majors.map((item) => item.high + item.watch), 1);
  return `<article class="panel">
    <div class="panel-heading"><div><p class="eyebrow">专业对比</p><h2>各专业风险人数统计</h2></div></div>
    <div class="risk-bars compact">${majors.map((item) => {
      const risky = item.high + item.watch;
      return `<div class="risk-row" style="--risk-color:#1267e8;--width:${Math.max((risky / max) * 100, 6)}%">
        <div class="risk-meta"><span class="risk-name"><i class="risk-dot"></i>${item.major}</span><strong>${risky}/${item.total} 人</strong></div>
        <div class="bar-track"><div class="bar-fill"></div></div>
      </div>`;
    }).join("")}</div>
  </article>`;
}

function gpaAttendancePanel(students) {
  return `<article class="panel">
    <div class="panel-heading"><div><p class="eyebrow">关联分析</p><h2>学生 GPA 与出勤率关系</h2></div></div>
    <div class="scatter-chart" aria-label="GPA 与出勤率散点图">
      <span class="axis-label y">出勤率</span><span class="axis-label x">GPA</span>
      ${students.map((student) => `<span class="scatter-point ${riskClass(student.riskKey)}" style="--x:${(student.gpa / 4) * 100}%;--y:${student.attendance}%;" title="${student.name}：GPA ${student.gpa}，出勤率 ${student.attendance}%">${student.name.slice(-1)}</span>`).join("")}
    </div>
  </article>`;
}

function riskTopListPanel(students) {
  const list = [...students].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5);
  return `<article class="panel">
    <div class="panel-heading"><div><p class="eyebrow">处置优先级</p><h2>风险学生 Top 列表</h2></div><a class="text-button" href="#students">看画像</a></div>
    <div class="priority-list">${list.map((student, index) => `
      <a class="priority-item" href="#students">
        <span class="rank">${index + 1}</span>
        <span><strong>${student.name}</strong><em>${student.major} · ${student.reason}</em></span>
        <b class="${riskClass(student.riskKey)}">${student.riskScore}</b>
      </a>`).join("")}</div>
  </article>`;
}

function dashboardRightRail(data) {
  const pending = data.warnings.filter((warning) => warning.statusKey === "todo");
  const closed = data.warnings.filter((warning) => warning.statusKey === "done");
  return `<aside class="dashboard-rail">
    <article class="panel vivid-panel">
      <div class="panel-heading"><div><p class="eyebrow">Agent 推荐</p><h2>今日处理事项</h2></div><a class="text-button" href="#agent">进入对话</a></div>
      <div class="agent-main"><strong>${data.agentInsight.title}</strong><p>${data.agentInsight.summary}</p></div>
      <div class="agent-chips">${data.agentInsight.tags.map((tag) => `<span class="chip">${tag}</span>`).join("")}</div>
    </article>
    <article class="panel">
      <div class="panel-heading"><div><p class="eyebrow">最近生成</p><h2>风险预警单</h2></div></div>
      <div class="compact-list">${data.warnings.map((item) => `<a href="#warnings"><strong>${item.code}</strong><span>${item.student} · ${item.status}</span></a>`).join("")}</div>
    </article>
    <article class="panel">
      <div class="panel-heading"><div><p class="eyebrow">辅导员待办</p><h2>待确认列表</h2></div></div>
      <div class="compact-list">${pending.map((item) => `<a href="#warnings"><strong>${item.student}</strong><span>${item.title}</span></a>`).join("") || `<div class="empty-mini">暂无待确认预警单</div>`}</div>
    </article>
    <article class="panel">
      <div class="panel-heading"><div><p class="eyebrow">闭环案例</p><h2>已结案帮扶</h2></div></div>
      <div class="compact-list">${closed.map((item) => `<a href="#workflow"><strong>${item.student}</strong><span>${item.studentFeedback}</span></a>`).join("") || `<div class="empty-mini">暂无已结案案例</div>`}</div>
    </article>
  </aside>`;
}

function roleScenarioPanel(data) {
  const user = getUser();
  const activeRole = user.role || "辅导员";
  const activeInfo = data.roles.find((item) => item.role === activeRole) || data.roles[1];
  return `<section class="role-scenario">
    <div class="agent-main">
      <strong>${activeInfo.role}账号已绑定</strong>
      <p>${activeInfo.duty}</p>
      <p>一个登录账号只对应一个角色。如需更换角色，请退出当前账号后重新登录对应账号。</p>
    </div>
    <div class="role-path">
      ${data.roles.map((item) => `<div class="role-path-card ${item.role === activeRole ? "active" : ""}">
        <strong>${item.role}</strong><p>${item.role === activeRole ? "当前账号角色。" : "需退出当前账号后，用对应账号重新登录。"}</p>
      </div>`).join("")}
    </div>
  </section>`;
}

function riskDistributionPanel(distribution) {
  const total = distribution.reduce((sum, item) => sum + item.value, 0);
  let cursor = 0;
  const stops = distribution.map((item) => {
    const start = cursor;
    const end = cursor + (item.value / total) * 100;
    cursor = end;
    return `${item.color} ${start}% ${end}%`;
  }).join(", ");
  return `
    <article class="panel">
      <div class="panel-heading">
        <div><p class="eyebrow">风险概览</p><h2>学业风险分布</h2></div>
        <div class="segmented-control"><button class="active" type="button">本周</button><button type="button">本月</button><button type="button">学期</button></div>
      </div>
      <div class="chart-layout">
        <div class="donut-wrap">
          <div class="donut-chart" style="background: conic-gradient(${stops})"></div>
          <div class="donut-center"><strong>${total}</strong><span>学生总数</span></div>
        </div>
        <div class="risk-bars">
          ${distribution.map((item) => {
            const percent = Math.round((item.value / total) * 100);
            return `<div class="risk-row" style="--risk-color:${item.color};--width:${percent}%">
              <div class="risk-meta"><span class="risk-name"><i class="risk-dot"></i>${item.name}</span><strong>${item.value} 人 · ${percent}%</strong></div>
              <div class="bar-track"><div class="bar-fill"></div></div>
            </div>`;
          }).join("")}
        </div>
      </div>
    </article>`;
}

function trendPanel(trend) {
  const max = Math.max(...trend.flatMap((item) => [item.high, item.watch, item.done]), 1);
  return `<article class="panel">
    <div class="panel-heading"><div><p class="eyebrow">趋势判断</p><h2>风险与结案趋势</h2></div><span class="role-pill">数据驱动决策</span></div>
    <div class="trend-chart">
      ${trend.map((item) => `<div class="trend-week">
        <div class="trend-bars">
          <span class="danger" style="--height:${Math.max(12, (item.high / max) * 100)}%"></span>
          <span class="warning" style="--height:${Math.max(12, (item.watch / max) * 100)}%"></span>
          <span class="done" style="--height:${Math.max(12, (item.done / max) * 100)}%"></span>
        </div>
        <strong>${item.week}</strong>
      </div>`).join("")}
    </div>
    <div class="legend-row"><span><i class="danger"></i>高风险</span><span><i class="warning"></i>关注</span><span><i class="done"></i>结案</span></div>
  </article>`;
}

function effectivenessPanel(effectiveness) {
  const highPriority = effectiveness.highPriority || [];
  return `<article class="panel">
    <div class="panel-heading"><div><p class="eyebrow">帮扶成效</p><h2>闭环处理质量</h2></div><a class="text-button" href="#workflow">看日志</a></div>
    <div class="manager-kpi-grid">
      <span><strong>${effectiveness.closedRate}%</strong><em>结案率</em></span>
      <span><strong>${effectiveness.activeCount}</strong><em>帮扶中</em></span>
      <span><strong>${effectiveness.closedCount}</strong><em>已结案</em></span>
      <span><strong>${effectiveness.averageCycleDays}</strong><em>平均周期/天</em></span>
    </div>
    <div class="compact-list effectiveness-list">
      ${highPriority.map((item) => `<a href="#warnings"><strong>${item.student}</strong><span>${item.code} · ${item.status} · ${item.reviewAt} 复评</span></a>`).join("") || emptyInline("当前没有未结案高风险预警")}
    </div>
  </article>`;
}

function integrationPanel(integrationStatus) {
  return `<article class="panel">
    <div class="panel-heading"><div><p class="eyebrow">苍穹接入</p><h2>低代码对象与 Agent API</h2></div><a class="text-button" href="#settings">配置</a></div>
    <div class="integration-summary">
      <strong>${integrationStatus.agentMode}</strong>
      <p>${integrationStatus.kingdeeBaseUrl}</p>
      <span class="status-pill active">${integrationStatus.thirdPartyApp.status}</span>
    </div>
    <div class="object-grid">
      ${integrationStatus.objects.map((item) => `<div><strong>${item.name}</strong><span>${item.code}</span><em>${item.status} · ${item.fields} 字段</em></div>`).join("")}
    </div>
  </article>`;
}

function renderDashboard(data) {
  const visibleStudents = scopeStudents(data.students);
  const visibleWarnings = scopeWarnings(data.warnings);
  const priorityStudents = [...visibleStudents].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5);
  const pendingWarnings = visibleWarnings.filter((warning) => warning.statusKey === "todo");
  const activeWarnings = visibleWarnings.filter((warning) => warning.statusKey === "active");
  const selectedWarning = pendingWarnings[0] || activeWarnings[0] || visibleWarnings[0];
  return `
    <section class="workbench-summary">
      <div class="summary-title">
        <p class="eyebrow">今日工作台</p>
        <h2>先处理风险，再沉淀帮扶结果</h2>
        <p>把学生画像、课程短板、学习行为和预警单放在同一条业务线上，减少跨系统查找和人工汇总成本。</p>
      </div>
      <div class="summary-actions">
        <a class="primary-link" href="#warnings">处理预警</a>
        <a class="text-button" href="#students">查看画像</a>
        <a class="text-button" href="#agent">询问 Agent</a>
      </div>
    </section>

    <section class="kpi-strip" aria-label="关键风险指标">
      ${[
        ["学生总数", data.overview.totalStudents, "已接入画像"],
        ["高风险", data.overview.highRisk, "优先处理"],
        ["待确认", data.overview.pendingWarnings, "辅导员核实"],
        ["帮扶中", data.overview.activeWarnings, "导师推进"],
        ["已结案", data.overview.closedWarnings, "形成案例"],
        ["平均 GPA", data.overview.averageGpa, "满分 4.0"],
      ].map(([label, value, note]) => `<div class="kpi-cell"><span>${label}</span><strong>${value}</strong><em>${note}</em></div>`).join("")}
    </section>

    <section class="dashboard-layout">
      <div class="dashboard-main">
        <section class="ops-board">
          <article class="panel focus-panel">
            <div class="panel-heading">
              <div><p class="eyebrow">重点待办</p><h2>当前最需要处理的学生</h2></div>
              <a class="text-button" href="#students">看全部画像</a>
            </div>
            <div class="student-queue">
              ${priorityStudents.map((student, index) => `<a class="queue-row ${index === 0 ? "active" : ""}" href="#students">
                <span class="rank">${index + 1}</span>
                <span class="queue-person"><strong>${student.name}</strong><em>${student.major} · ${student.reason}</em></span>
                <b class="${riskClass(student.riskKey)}">${student.riskScore}</b>
              </a>`).join("") || emptyInline("当前角色暂无可见学生")}
            </div>
          </article>

          <article class="panel focus-panel">
            <div class="panel-heading">
              <div><p class="eyebrow">Agent 建议</p><h2>下一步动作</h2></div>
              <a class="text-button" href="#agent">打开对话</a>
            </div>
            <div class="agent-main"><strong>${data.agentInsight.title}</strong><p>${data.agentInsight.summary}</p></div>
            <div class="agent-chips">${data.agentInsight.tags.map((tag) => `<span class="chip">${tag}</span>`).join("")}</div>
            ${selectedWarning ? `<div class="next-warning">
              <span class="status-pill ${statusClass(selectedWarning.statusKey)}">${selectedWarning.status}</span>
              <strong>${selectedWarning.code}</strong>
              <p>${selectedWarning.title}</p>
            </div>` : ""}
          </article>
        </section>

        <section class="grid-2">
          ${riskDistributionPanel(data.riskDistribution)}
          ${statusDistributionPanel(visibleWarnings)}
        </section>

        <section class="grid-2">
          ${majorRiskPanel(visibleStudents)}
          ${gpaAttendancePanel(visibleStudents)}
        </section>

        <section class="grid-2">
          ${trendPanel(data.riskTrend)}
          ${effectivenessPanel(data.effectiveness)}
        </section>

        ${integrationPanel(data.integrationStatus)}

        <article class="panel">
          <div class="panel-heading"><div><p class="eyebrow">预警闭环</p><h2>近期风险预警单</h2></div><a class="text-button" href="#warnings">进入管理</a></div>
          ${warningTable(visibleWarnings.slice(0, 5))}
        </article>
      </div>
      ${dashboardRightRail({ ...data, students: visibleStudents, warnings: visibleWarnings, auditLogs: scopeAuditLogs(data.auditLogs) })}
  </section>`;
}

function renderPublicHome() {
  return `
    <section class="public-home">
      <div class="public-copy">
        <p class="eyebrow">CampusPilot Growth Intelligence</p>
        <h2>风险预警与帮扶工作台</h2>
        <p>围绕学生成长画像、学业表现、学习行为和风险预警单，提供辅导员、导师、学生与学院管理者共同使用的日常工作入口。</p>
        <div class="public-shortcuts">
          <a href="./login.html">查看画像</a>
          <a href="./login.html">处理预警</a>
          <a href="./login.html">制定帮扶</a>
          <a href="./login.html">治理分析</a>
        </div>
      </div>
      <div class="public-carousel" aria-label="平台能力轮播">
        <div class="public-carousel-head">
          <span>平台能力</span>
          <strong>业务流程</strong>
        </div>
        <div class="public-carousel-track">
          ${[
            ["01", "风险识别", "汇总成绩、出勤、作业和活跃度，形成学生风险分数与风险原因。", "课程低分", "出勤下降", "作业缺交"],
            ["02", "协同处置", "不同角色进入对应工作台，围绕同一张预警单推进处理。", "辅导员确认", "导师帮扶", "学生反馈"],
            ["03", "Agent 建议", "Agent 根据画像和预警上下文，输出风险解释与成长建议。", "画像解释", "预警建议", "成长计划"],
            ["04", "数据联动", "统一连接学生画像、课程成绩、学习行为和风险预警单，支撑跨角色协同与审计追踪。", "业务对象", "数据同步", "审计日志"],
          ].map(([index, title, text, tagA, tagB, tagC], slideIndex) => `
            <article class="public-carousel-slide ${slideIndex === 0 ? "active" : ""}" data-public-slide="${slideIndex}">
              <div class="slide-index"><span>${index}</span><small>/ 04</small></div>
              <strong>${title}</strong>
              <p>${text}</p>
              <div class="slide-tags">
                <em>${tagA}</em>
                <em>${tagB}</em>
                <em>${tagC}</em>
              </div>
            </article>`).join("")}
        </div>
        <div class="public-carousel-list" aria-hidden="true">
          <span>画像</span>
          <i></i>
          <span>预警</span>
          <i></i>
          <span>帮扶</span>
          <i></i>
          <span>复评</span>
        </div>
        <div class="public-carousel-dots" aria-label="切换平台能力">
          ${[0, 1, 2, 3].map((index) => `<button class="${index === 0 ? "active" : ""}" type="button" data-public-dot="${index}" aria-label="查看第 ${index + 1} 项能力"></button>`).join("")}
        </div>
      </div>
    </section>
    <section class="public-status-strip" aria-label="平台能力">
      ${[
        ["统一入口", "画像 / 预警 / 帮扶 / 治理"],
        ["核心流程", "识别 - 确认 - 帮扶 - 反馈 - 复评"],
        ["智能能力", "画像解释 / 预警建议 / 成长方案"],
        ["部署形态", "校内租户 / API 接入 / 审计留痕"],
        ].map(([title, text]) => `<div><strong>${title}</strong><p>${text}</p></div>`).join("")}
    </section>`;
}

function renderRoleHome(data, role) {
  const roleInfo = {
    学生: {
      title: "个人工作台",
      intent: "关注个人成长状态、课程建议和反馈提交。",
      primary: "#students",
      primaryText: "查看我的画像",
      secondary: "#agent",
      secondaryText: "咨询 AI 建议",
      queueTitle: "我的待办",
      queue: ["查看本人成长画像", "确认 AI 学习建议", "提交帮扶反馈"],
    },
    导师: {
      title: "教学工作台",
      intent: "围绕课程短板制定帮扶计划，并跟踪复评结果。",
      primary: "#courses",
      primaryText: "查看课程短板",
      secondary: "#warnings",
      secondaryText: "处理帮扶措施",
      queueTitle: "教学帮扶任务",
      queue: ["查看高风险学生课程短板", "保存导师帮扶措施", "推荐课程和项目"],
    },
    辅导员: {
      title: "风险处置",
      intent: "识别并确认风险学生，推动预警单进入帮扶闭环。",
      primary: "#warnings",
      primaryText: "处理预警单",
      secondary: "#students",
      secondaryText: "查看风险画像",
      queueTitle: "风险处置队列",
      queue: ["确认待处理预警", "填写辅导员意见", "跟踪学生反馈"],
    },
    学院管理者: {
      title: "治理驾驶舱",
      intent: "查看学院风险分布、预警处理进度和系统治理配置。",
      primary: "#dashboard",
      primaryText: "查看治理驾驶舱",
      secondary: "#settings",
      secondaryText: "系统配置",
      queueTitle: "治理关注点",
      queue: ["查看风险分布", "查看帮扶成效", "维护系统规则"],
    },
  }[role];
  const students = scopeStudents(data.students);
  const warnings = scopeWarnings(data.warnings);
  const targetStudent = students[0];
  const targetWarning = warnings[0];
  return `
    <section class="workbench-summary role-home-summary">
      <div class="summary-title">
        <p class="eyebrow">${roleInfo.title}</p>
        <h2>${roleInfo.intent}</h2>
        <p>系统会根据当前账号权限呈现对应任务、数据范围和可执行操作，界面保持统一的工作台体验。</p>
      </div>
      <div class="summary-actions">
        <a class="primary-link" href="${roleInfo.primary}">${roleInfo.primaryText}</a>
        <a class="text-button" href="${roleInfo.secondary}">${roleInfo.secondaryText}</a>
      </div>
    </section>
    <section class="kpi-strip" aria-label="${roleInfo.title}关键指标">
      ${[
        ["可见学生", students.length, "按角色过滤"],
        ["可见预警", warnings.length, "按权限范围"],
        ["待确认", warnings.filter((item) => item.statusKey === "todo").length, "需推进"],
        ["帮扶中", warnings.filter((item) => item.statusKey === "active").length, "处理中"],
        ["已结案", warnings.filter((item) => item.statusKey === "done").length, "已沉淀"],
        ["工作权限", role, "当前账号"],
      ].map(([label, value, note]) => `<div class="kpi-cell"><span>${label}</span><strong>${value}</strong><em>${note}</em></div>`).join("")}
    </section>
    <section class="ops-board">
      <article class="panel focus-panel">
        <div class="panel-heading"><div><p class="eyebrow">${roleInfo.queueTitle}</p><h2>今天要处理什么</h2></div><span class="role-pill">当前任务</span></div>
        <div class="student-queue">
          ${roleInfo.queue.map((item, index) => `<div class="queue-row"><span class="rank">${index + 1}</span><span class="queue-person"><strong>${item}</strong><em>${roleInfo.intent}</em></span><b>${index + 1}</b></div>`).join("")}
        </div>
      </article>
      <article class="panel focus-panel">
        <div class="panel-heading"><div><p class="eyebrow">当前关注对象</p><h2>${targetStudent ? targetStudent.name : "暂无可见学生"}</h2></div>${targetStudent ? `<span class="risk-pill ${riskClass(targetStudent.riskKey)}">${targetStudent.riskLevel}</span>` : ""}</div>
        ${targetStudent ? `<div class="evidence-strip compact">
          ${[["风险分数", targetStudent.riskScore], ["GPA", targetStudent.gpa], ["挂科", targetStudent.failed], ["出勤", `${targetStudent.attendance}%`], ["作业", `${targetStudent.assignment}%`]].map(([label, value]) => `<span><em>${label}</em><strong>${value}</strong></span>`).join("")}
        </div>
        <div class="agent-main"><strong>AI 建议</strong><p>${targetStudent.advice}</p></div>` : `<div class="agent-main"><strong>暂无业务数据</strong><p>当前角色没有可见学生数据。</p></div>`}
        ${targetWarning ? `<div class="next-warning"><span class="status-pill ${statusClass(targetWarning.statusKey)}">${targetWarning.status}</span><strong>${targetWarning.code}</strong><p>${targetWarning.title}</p></div>` : ""}
      </article>
    </section>`;
}

function renderStudents(data) {
  const students = scopeStudents(data.students).filter(matchQuery);
  const selected = students[0];
  if (!selected) return emptyPanel("未找到匹配学生", "请换用学生姓名、编号、专业或风险等级继续检索。");
  const courses = scopeCourses(data.courses).filter((item) => item.student === selected.name);
  const behavior = scopeBehaviors(data.behaviors).find((item) => item.student === selected.name);
  return `
    <section class="split-workspace">
      <article class="panel list-panel">
        <div class="panel-heading">
          <div><p class="eyebrow">学生队列</p><h2>按风险分数排序</h2></div>
          <span class="role-pill">${getUser().role}</span>
        </div>
        <div class="student-list-table">
          ${students.map((student, index) => `<button class="student-row ${index === 0 ? "active" : ""}" type="button">
            <span class="avatar small">${student.name.slice(-1)}</span>
            <strong>${student.name}</strong>
            <span>${student.major}</span>
            <span class="risk-pill ${riskClass(student.riskKey)}">${student.riskLevel}</span>
            <b>${student.riskScore}</b>
          </button>`).join("")}
        </div>
      </article>

      <article class="panel detail-panel">
        <div class="entity-top">
          <div class="person-line"><span class="avatar">${selected.name.slice(-2)}</span><div><strong>${selected.name}</strong><div class="student-meta">${selected.no} · ${selected.college} · ${selected.className}</div></div></div>
          <span class="risk-pill ${riskClass(selected.riskKey)}">${selected.riskLevel}</span>
        </div>
        <div class="evidence-strip">
          ${[
            ["风险分数", selected.riskScore],
            ["GPA", selected.gpa],
            ["挂科数", selected.failed],
            ["出勤率", `${selected.attendance}%`],
            ["作业完成率", `${selected.assignment}%`],
            ["职业目标", selected.goal],
          ].map(([label, value]) => `<span><em>${label}</em><strong>${value}</strong></span>`).join("")}
        </div>
        <div class="detail-columns">
          <div>
            <h3>风险证据</h3>
            <p class="card-note">${selected.reason}</p>
            ${scoreLine("GPA", Math.round((selected.gpa / 4) * 100), "#1267e8")}
            ${scoreLine("出勤率", selected.attendance, selected.attendance < 80 ? "#d43f3a" : "#24966d")}
            ${scoreLine("作业完成率", selected.assignment, selected.assignment < 70 ? "#d43f3a" : "#24966d")}
          </div>
          <div>
            <h3>课程与行为</h3>
            <div class="compact-list">
              ${courses.map((course) => `<a href="#courses"><strong>${course.course}</strong><span>${course.score} 分 · ${course.status} · ${course.advice}</span></a>`).join("") || `<div class="empty-mini">暂无课程短板</div>`}
              ${behavior ? `<a href="#behavior"><strong>学习行为</strong><span>出勤 ${behavior.attendance}% · 作业 ${behavior.assignment}% · ${behavior.note}</span></a>` : ""}
            </div>
          </div>
        </div>
        <div class="agent-main"><strong>AI 建议</strong><p>${selected.advice}</p></div>
      </article>
    </section>
    <section class="panel">
      <div class="panel-heading"><div><p class="eyebrow">字段设计</p><h2>学生画像业务对象字段</h2></div><span class="role-pill">Kingdee BOS Object</span></div>
      <div class="field-row">
        ${["学院 / 专业 / 年级 / 班级", "职业目标 / 兴趣方向", "GPA / 学分完成率 / 挂科数", "出勤率 / 作业完成率", "风险等级 / 风险分数", "风险原因 / AI 建议 / 当前状态"].map((item) => `<span>${item}</span>`).join("")}
      </div>
    </section>
  `;
}

function studentCard(student, selected = false) {
  return `<article class="entity-card ${selected ? "selected" : ""}">
    <div class="entity-top">
      <div class="person-line"><span class="avatar">${student.name.slice(-2)}</span><div><strong>${student.name}</strong><div class="student-meta">${student.no} · ${student.major}</div></div></div>
      <span class="risk-pill ${riskClass(student.riskKey)}">${student.riskLevel}</span>
    </div>
    <div class="profile-key-grid">
      <span><strong>${student.riskScore}</strong><em>风险分数</em></span>
      <span><strong>${student.gpa}</strong><em>GPA</em></span>
      <span><strong>${student.failed}</strong><em>挂科数</em></span>
      <span><strong>${student.goal}</strong><em>职业目标</em></span>
    </div>
    <p class="card-note">${student.reason}</p>
    ${scoreLine("GPA", Math.round((student.gpa / 4) * 100), "#1267e8")}
    ${scoreLine("出勤率", student.attendance, student.attendance < 80 ? "#d43f3a" : "#24966d")}
    ${scoreLine("作业完成率", student.assignment, student.assignment < 70 ? "#d43f3a" : "#24966d")}
    <div class="agent-main"><strong>AI 建议</strong><p>${student.advice}</p></div>
  </article>`;
}

function scoreLine(label, value, color) {
  return `<div class="risk-row"><div class="risk-meta"><span>${label}</span><strong>${value}%</strong></div><div class="score-track"><div class="score-fill" style="--width:${value}%;--fill:${color}"></div></div></div>`;
}

function renderCourses(data) {
  const rows = scopeCourses(data.courses).filter(matchQuery);
  return `
    <section class="content-grid">
      <article class="panel">
        <div class="panel-heading"><div><p class="eyebrow">成绩数据</p><h2>课程成绩明细</h2></div></div>
        ${courseTable(rows)}
      </article>
      <article class="panel">
        <div class="panel-heading"><div><p class="eyebrow">短板识别</p><h2>核心课程补强建议</h2></div></div>
        <div class="setting-stack">
          <div class="agent-main"><strong>张明远</strong><p>高等数学 58 分，数据结构 61 分，与 AI 算法工程师目标存在明显基础短板。</p></div>
          <div class="module-card"><strong>补强计划</strong><p>每周 2 次课程辅导，结合算法题训练与阶段测验进行复评。</p></div>
          <div class="module-card"><strong>接口预留</strong><p>后续对接 query_course_score 工具，按学生编号实时读取课程数据。</p></div>
        </div>
      </article>
    </section>`;
}

function courseTable(rows) {
  return `<div class="table-wrap"><table class="data-table"><thead><tr><th>学生</th><th>课程</th><th>类型</th><th>成绩</th><th>状态</th><th>建议</th></tr></thead><tbody>
    ${rows.map((item) => `<tr><td>${item.student}</td><td>${item.course}</td><td>${item.type}</td><td><strong>${item.score}</strong></td><td>${item.status}</td><td>${item.advice}</td></tr>`).join("") || tableEmpty(6)}
  </tbody></table></div>`;
}

function renderBehavior(data) {
  const rows = scopeBehaviors(data.behaviors).filter(matchQuery);
  return `
    <section class="grid-2">
      ${rows.map((item) => `<article class="entity-card"><div class="entity-top"><strong>${item.student}</strong><span class="role-pill">最近登录 ${item.lastLogin}</span></div>${scoreLine("出勤率", item.attendance, item.attendance < 80 ? "#d43f3a" : "#24966d")}${scoreLine("作业完成率", item.assignment, item.assignment < 70 ? "#d43f3a" : "#24966d")}${scoreLine("平台活跃度", item.activity, "#1267e8")}<p class="card-note">${item.note}</p></article>`).join("") || emptyPanel("未找到匹配行为数据", "请换用学生姓名继续检索。")}
    </section>
    <section class="panel">
      <div class="panel-heading"><div><p class="eyebrow">行为风险规则</p><h2>学习行为判断依据</h2></div></div>
      <div class="grid-3">
        ${["出勤率低于 0.85 进入关注", "出勤率低于 0.8 且作业低于 0.7 进入高风险", "平台活跃度下降触发辅导员提醒"].map((item) => `<div class="module-card"><strong>${item}</strong><p>规则同步到 Agent 提示词与知识库。</p></div>`).join("")}
      </div>
    </section>`;
}

function renderWarnings(data) {
  const warnings = scopeWarnings(data.warnings).filter(matchQuery);
  const selected = warnings[0];
  const selectedLogs = selected ? data.workflowLogs.filter((log) => log.code === selected.code) : [];
  return `
    <section class="warning-workspace">
      <article class="panel list-panel">
        <div class="panel-heading">
          <div><p class="eyebrow">预警单列表</p><h2>按处理状态推进</h2></div>
          ${canPerform("createWarningSuggestion") ? `<button class="text-button" type="button" id="createWarningButton">生成预警单</button>` : `<span class="role-pill">${getUser().role}视图</span>`}
        </div>
        ${warningTable(warnings)}
      </article>

      <article class="panel detail-panel">
        ${selected ? warningOpsPanel(selected) : emptyPanel("未找到匹配预警单", "请换用预警单号、学生姓名或状态继续检索。")}
      </article>
    </section>
    <section class="panel">
      <div class="panel-heading"><div><p class="eyebrow">处理轨迹</p><h2>${selected ? selected.code : "预警单"} 操作日志</h2></div><a class="text-button" href="#workflow">查看完整流程</a></div>
      <ul class="timeline">${selectedLogs.map((item) => `<li class="timeline-item"><strong>${item.action}</strong><div class="student-meta">${item.time} · ${item.actor}</div><p>${item.detail}</p></li>`).join("") || emptyInline("该预警单暂无处理日志")}</ul>
    </section>`;
}

function warningOpsPanel(item) {
  return `<div class="warning-detail-shell">
    <div class="entity-top"><div><strong>${item.title}</strong><div class="student-meta">${item.code} · ${item.studentNo} · ${item.student}</div></div><span class="status-pill ${statusClass(item.statusKey)}">${item.status}</span></div>
    <div class="evidence-strip compact">
      ${[
        ["风险等级", item.level],
        ["风险分数", item.score],
        ["预警来源", item.source],
        ["建议处理人", item.owner],
        ["复评时间", item.reviewAt],
      ].map(([label, value]) => `<span><em>${label}</em><strong>${value}</strong></span>`).join("")}
    </div>
    <div class="warning-section-grid">
      <div><span>辅导员意见</span><p>${item.counselorNote}</p></div>
      <div><span>导师帮扶措施</span><p>${item.mentorPlan}</p></div>
      <div><span>学生反馈</span><p>${item.studentFeedback}</p></div>
      <div><span>处理说明</span><p>当前状态字段显示为“${item.status}”，时间线用于补充待确认、帮扶、反馈和复评过程。</p></div>
    </div>
    <div class="role-action-area">
      ${canPerform("confirmWarning") ? `<form class="action-form" data-action="confirm" data-code="${item.code}">
        <label class="field"><span>辅导员意见</span><textarea name="counselorNote">${item.counselorNote}</textarea></label>
        <button class="primary-button" type="submit">确认风险预警单</button>
      </form>` : ""}
      ${canPerform("saveMentorPlan") ? `<form class="action-form" data-action="mentor-plan" data-code="${item.code}">
        <label class="field"><span>导师帮扶措施</span><textarea name="mentorPlan">${item.mentorPlan}</textarea></label>
        <button class="primary-button" type="submit">保存导师措施</button>
      </form>` : ""}
      ${canPerform("submitFeedback") ? `<form class="action-form" data-action="feedback" data-code="${item.code}">
        <label class="field"><span>学生反馈</span><textarea name="feedback">${item.studentFeedback}</textarea></label>
        <button class="primary-button" type="submit">提交学生反馈</button>
      </form>` : ""}
      ${canPerform("closeWarning") && item.statusKey !== "done" ? `<form class="action-form" data-action="close" data-code="${item.code}">
        <label class="field"><span>复评结案说明</span><textarea name="closeNote">复评通过，出勤、作业和课程补强情况达到阶段目标。</textarea></label>
        <button class="secondary-button" type="submit">复评结案</button>
      </form>` : ""}
      ${!canPerform("confirmWarning") && !canPerform("saveMentorPlan") && !canPerform("submitFeedback") && !canPerform("closeWarning") ? `<div class="agent-main"><strong>只读视图</strong><p>当前角色可查看预警处理进度，写操作由对应业务角色完成。</p></div>` : ""}
    </div>
  </div>`;
}

function warningTable(rows) {
  return `<div class="table-wrap"><table class="data-table"><thead><tr><th>预警单</th><th>学生</th><th>风险等级</th><th>处理状态</th><th>建议处理人</th><th>复评时间</th></tr></thead><tbody>
    ${rows.map((item) => `<tr><td><strong>${item.code}</strong><br><span class="student-meta">${item.title}</span></td><td>${item.student}</td><td><span class="risk-pill ${riskClass(item.riskKey)}">${item.level}</span></td><td><span class="status-pill ${statusClass(item.statusKey)}">${item.status}</span></td><td>${item.owner}</td><td>${item.reviewAt}</td></tr>`).join("") || tableEmpty(6)}
  </tbody></table></div>`;
}

function warningDetail(item) {
  return `<article class="entity-card">
    <div class="entity-top"><div><strong>${item.title}</strong><div class="student-meta">${item.code} · ${item.studentNo}</div></div><span class="status-pill ${statusClass(item.statusKey)}">${item.status}</span></div>
    <div class="warning-section-grid">
      <div><span>风险等级</span><strong>${item.level} · ${item.score} 分</strong></div>
      <div><span>风险识别</span><strong>${item.source}</strong></div>
      <div><span>辅导员意见</span><p>${item.counselorNote}</p></div>
      <div><span>导师帮扶措施</span><p>${item.mentorPlan}</p></div>
      <div><span>学生反馈</span><p>${item.studentFeedback}</p></div>
      <div><span>时间信息</span><p>复评时间：${item.reviewAt}</p></div>
    </div>
  </article>`;
}

function renderAgent(data) {
  const sample = data.students[0];
  return `
    <section class="agent-workspace">
      <aside class="agent-context">
        <a class="brand agent-brand" href="#dashboard" aria-label="返回驾驶舱">
          <span class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32"><path d="M6 17.5 16 5l10 12.5-4.1 2.2L16 12.3l-5.9 7.4L6 17.5Z" /><path d="M8.8 22.5 16 18l7.2 4.5L16 27 8.8 22.5Z" /></svg>
          </span>
          <span><strong>AI 成长助手</strong><small>CampusPilot Agent</small></span>
        </a>
        <div class="agent-context-actions">
          <button class="text-button" type="button" id="agentNavToggle">主导航</button>
          <a class="text-button" href="#warnings">查看预警单</a>
        </div>
        <div class="agent-focus">
          <p class="eyebrow">当前重点学生</p>
          <strong>${sample.name}</strong>
          <span class="risk-pill ${riskClass(sample.riskKey)}">${sample.riskLevel}</span>
          <div class="profile-key-grid slim">
            <span><strong>${sample.riskScore}</strong><em>风险分数</em></span>
            <span><strong>${sample.gpa}</strong><em>GPA</em></span>
            <span><strong>${sample.attendance}%</strong><em>出勤率</em></span>
            <span><strong>${sample.failed}</strong><em>挂科数</em></span>
          </div>
        </div>
        <div class="tool-stack">
          ${["query_student_profile", "query_course_score", "query_learning_behavior", "query_warning_order", "create_warning_order", "generate_growth_plan"].map((tool) => `<span>${tool}<b>已预留</b></span>`).join("")}
        </div>
        <div class="agent-field-map">
          <p class="eyebrow">预警单字段</p>
          ${["学生编号 STU2026001", `学生姓名 ${sample.name}`, `风险等级 ${sample.riskLevel}`, `风险分数 ${sample.riskScore}`, "处理状态 待确认"].map((item) => `<span>${item}</span>`).join("")}
        </div>
      </aside>
      <article class="agent-console">
        <div class="chat-shell immersive">
          <div class="chat-thread" id="agentThread">
            <article class="chat-message assistant">
              <span class="avatar small">AI</span>
              <div class="chat-bubble">
                <strong>CampusPilot 学业成长助手</strong>
                <p>你好，我可以查询学生画像、课程成绩、学习行为和风险预警单，并生成结构化帮扶建议。你可以直接输入学生姓名或预警单号。</p>
              </div>
            </article>
            <article class="chat-message user">
              <span class="avatar small">王</span>
              <div class="chat-bubble">
                <strong>辅导员提问</strong>
                <p>张明远现在为什么属于高风险？下一步应该怎么处理？</p>
              </div>
            </article>
            <article class="chat-message assistant">
              <span class="avatar small">AI</span>
              <div class="chat-bubble">
                <strong>结构化建议</strong>
                <p>【风险等级】高风险。依据包括挂科数 2、出勤率 76%、作业完成率 62%，且高等数学和数据结构薄弱。建议辅导员确认 RW2026001，导师制定 4 周补强计划，并在 2026-06-10 复评。</p>
                <div class="agent-chips"><span class="chip">学生画像</span><span class="chip">课程成绩</span><span class="chip">学习行为</span><span class="chip">风险预警单</span></div>
              </div>
            </article>
          </div>
          <div class="quick-prompts" aria-label="建议提问">
            ${["查看张明远当前风险情况", "李佳怡是否需要生成预警单", "为陈思琪生成成长规划", "列出待辅导员确认的预警单"].map((prompt) => `<button type="button" data-prompt="${prompt}">${prompt}</button>`).join("")}
          </div>
          <form class="chat-input" id="agentChatForm">
            <label class="field">
              <span>输入问题</span>
              <textarea id="agentQuestion" placeholder="例如：张明远下一步应该由谁处理？是否需要生成风险预警单？"></textarea>
            </label>
            <button class="primary-button send-arrow-button" type="submit" aria-label="发送给学业成长助手">→</button>
          </form>
        </div>
      </article>
    </section>`;
}

function renderWorkflow(data) {
  const groupedLogs = data.workflowLogs.reduce((map, log) => {
    if (!map[log.code]) map[log.code] = [];
    map[log.code].push(log);
    return map;
  }, {});
  return `
    <section class="content-grid">
      <article class="panel">
        <div class="panel-heading"><div><p class="eyebrow">处理过程记录</p><h2>RW2026001 闭环轨迹</h2></div><span class="status-pill active">帮扶中</span></div>
        <ul class="timeline">${data.workflow.map((item) => `<li class="timeline-item"><strong>${item.step}</strong><div class="student-meta">${item.time} · ${item.owner}</div><p>${item.detail}</p></li>`).join("")}</ul>
      </article>
      <article class="panel">
        <div class="panel-heading"><div><p class="eyebrow">升级路径</p><h2>从单字段到正式流程</h2></div></div>
        <div class="setting-stack">
          ${["当前版本：处理状态字段 + 处理过程记录", "轻量增强：新增风险处理日志对象", "正式版本：接入 BPMN 流程与审批轨迹", "展示目标：待确认、帮扶中、学生反馈、复评、结案全链路可追踪"].map((item) => `<div class="module-card"><strong>${item}</strong></div>`).join("")}
        </div>
      </article>
    </section>
    <section class="panel">
      <div class="panel-heading"><div><p class="eyebrow">业务日志对象</p><h2>风险处理日志</h2></div><span class="role-pill">除 Agent 外已本地闭环</span></div>
      <div class="log-board">
        ${Object.entries(groupedLogs).map(([code, logs]) => `<article>
          <strong>${code}</strong>
          <ul class="timeline mini">${logs.map((log) => `<li class="timeline-item"><strong>${log.action}</strong><div class="student-meta">${log.time} · ${log.actor}</div><p>${log.detail}</p></li>`).join("")}</ul>
        </article>`).join("")}
      </div>
    </section>`;
}

function renderUser(data) {
  const user = getUser();
  const permissions = roleConfig(user.role);
  const logs = scopeAuditLogs(data.auditLogs);
  return `
    <section class="content-grid">
      <article class="panel">
        <div class="panel-heading"><div><p class="eyebrow">当前账号</p><h2>${user.name}</h2><p class="muted">${user.email} · ${user.college}</p></div><span class="role-pill">${user.role}</span></div>
        ${roleScenarioPanel(data)}
      </article>
      <article class="panel">
        <div class="panel-heading"><div><p class="eyebrow">操作记录</p><h2>最近活动</h2></div></div>
        <ul class="timeline">${logs.map((log) => `<li class="timeline-item"><strong>${log.action}</strong><div class="student-meta">${log.time} · ${log.actor}</div></li>`).join("")}</ul>
      </article>
    </section>
    <section class="panel">
      <div class="panel-heading"><div><p class="eyebrow">权限范围</p><h2>当前租户权限</h2></div><a class="text-button" href="./login.html">切换账号</a></div>
      <div class="grid-3">${permissions.labels.map((item) => `<div class="module-card"><strong>${item}</strong><p>${user.role}角色已获得此业务权限。</p></div>`).join("")}</div>
    </section>`;
}

function renderSettings() {
  const endpoint = localStorage.getItem("campuspilot:apiBase") || API_BASE || "http://10.0.160.250:8080/ierp";
  const integration = state.data.integrationStatus;
  return `
    <section class="content-grid">
      <article class="panel">
        <div class="panel-heading"><div><p class="eyebrow">接口配置</p><h2>数据源与 Agent 工具</h2></div><button class="text-button" type="button" id="saveSettingsButton">保存设置</button></div>
        <div class="form-grid">
          <label class="field"><span>金蝶环境地址</span><input id="apiBaseInput" value="${endpoint}" /></label>
          <label class="field"><span>默认租户</span><input value="CampusPilot 校园租户" /></label>
          <label class="field"><span>学生画像对象编码</span><input value="cp_student_profile" /></label>
          <label class="field"><span>风险预警单对象编码</span><input value="cp_warning_order" /></label>
          <label class="field"><span>Agent 名称</span><input value="CampusPilot 学业成长助手" /></label>
          <label class="field"><span>工具调用模式</span><select><option>知识库优先 + 工具增强</option><option>工具优先 + 知识库兜底</option></select></label>
        </div>
      </article>
      <article class="panel">
        <div class="panel-heading"><div><p class="eyebrow">系统开关</p><h2>运行与审计</h2></div></div>
        <div class="setting-stack">
          ${settingSwitch("启用驾驶舱统计", true)}
          ${settingSwitch("启用 Agent 结构化输出", true)}
          ${settingSwitch("启用处理过程记录", true)}
          ${settingSwitch("记录用户操作审计", true)}
          ${settingSwitch("自动生成预警单", false)}
        </div>
      </article>
    </section>
    <section class="content-grid">
      <article class="panel">
        <div class="panel-heading"><div><p class="eyebrow">第三方应用</p><h2>金蝶 OpenAPI 接入边界</h2></div><span class="status-pill todo">${integration.thirdPartyApp.status}</span></div>
        <div class="integration-summary">
          <strong>${integration.thirdPartyApp.appId}</strong>
          <p>${integration.thirdPartyApp.auth}</p>
          <p>本地前后端只负责业务界面、数据闭环和 Agent API 调用入口；Agent 本体、RAG 和工具编排在金蝶平台低代码配置。</p>
        </div>
      </article>
      <article class="panel">
        <div class="panel-heading"><div><p class="eyebrow">低代码模型</p><h2>业务对象清单</h2></div></div>
        <div class="object-grid">
          ${integration.objects.map((item) => `<div><strong>${item.name}</strong><span>${item.code}</span><em>${item.status} · ${item.fields} 字段</em></div>`).join("")}
        </div>
      </article>
    </section>
    <section class="panel">
      <div class="panel-heading"><div><p class="eyebrow">风险规则</p><h2>标准化判断条件</h2></div></div>
      <div class="grid-3">
        ${["高风险：GPA < 2.0 或挂科数 >= 2", "高风险：核心课程明显不及格", "高风险：出勤 < 0.8 且作业 < 0.7", "需要关注：GPA 2.0 到 2.8", "需要关注：出勤低于 0.85", "正常：无挂科且行为稳定"].map((item) => `<div class="module-card"><strong>${item}</strong><p>同步到 Agent 提示词、知识库和项目说明。</p></div>`).join("")}
      </div>
    </section>`;
}

function settingSwitch(label, on) {
  return `<div class="module-card switch-line"><strong>${label}</strong><span class="switch ${on ? "on" : ""}" aria-hidden="true"></span></div>`;
}

function tableEmpty(colspan) {
  return `<tr><td colspan="${colspan}"><div class="agent-main"><strong>暂无匹配数据</strong><p>请调整检索条件。</p></div></td></tr>`;
}

function emptyInline(text) {
  return `<div class="empty-mini">${text}</div>`;
}

function emptyPanel(title, text) {
  return `<article class="panel"><div class="agent-main"><strong>${title}</strong><p>${text}</p></div></article>`;
}

async function renderRoute() {
  const route = routeMeta[currentRoute()] ? currentRoute() : "dashboard";
  const meta = routeMeta[route];
  if (route !== "home" && !state.data) await loadData();
  hydrateUser(route === "home");
  document.body.classList.toggle("agent-route", route === "agent");
  document.body.classList.remove("agent-nav-open");
  document.querySelector("#routeEyebrow").textContent = meta.eyebrow;
  document.querySelector("#routeTitle").textContent = meta.title;
  document.querySelector("#routeSubtitle").textContent = meta.subtitle;
  document.querySelectorAll(".nav-item").forEach((item) => {
    const allowed = canAccess(item.dataset.route);
    item.classList.toggle("active", item.dataset.route === route);
    item.classList.toggle("locked", !allowed);
    item.hidden = !allowed;
    if (item.dataset.route === "agent") {
      item.addEventListener("click", () => document.body.classList.remove("agent-nav-open"));
    }
  });

  const renderers = {
    home: renderPublicHome,
    "student-home": (data) => renderRoleHome(data, "学生"),
    "teacher-home": (data) => renderRoleHome(data, "导师"),
    "counselor-home": (data) => renderRoleHome(data, "辅导员"),
    "admin-home": (data) => renderRoleHome(data, "学院管理者"),
    dashboard: renderDashboard,
    students: renderStudents,
    courses: renderCourses,
    behavior: renderBehavior,
    warnings: renderWarnings,
    agent: renderAgent,
    workflow: renderWorkflow,
    user: renderUser,
    settings: renderSettings,
  };

  document.querySelector("#appView").innerHTML = renderers[route](state.data);
  bindRouteActions(route);
}

function bindRouteActions(route) {
  if (state.publicCarouselTimer) {
    window.clearInterval(state.publicCarouselTimer);
    state.publicCarouselTimer = null;
  }
  if (route === "home") {
    bindPublicCarousel();
  }

  document.querySelector("#createWarningButton")?.addEventListener("click", async () => {
    if (!canPerform("createWarningSuggestion")) {
      showToast("当前角色无权执行该操作");
      return;
    }
    const result = await api.createWarningSuggestion();
    const warning = result.warning || result;
    showToast(`已生成预警单：${warning.code || ""} ${warning.student || warning.student_name} · ${warning.level || warning.risk_level}`);
    state.data = null;
    await renderRoute();
  });
  document.querySelectorAll("[data-prompt]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.querySelector("#agentQuestion");
      input.value = button.dataset.prompt;
      input.focus();
    });
  });
  document.querySelector("#agentNavToggle")?.addEventListener("click", () => {
    document.body.classList.add("agent-nav-open");
  });
  document.querySelector("#agentContextToggle")?.addEventListener("click", () => {
    document.body.classList.remove("agent-nav-open");
  });
  document.querySelector("#agentChatForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const input = document.querySelector("#agentQuestion");
    const question = input.value.trim();
    if (!question) {
      showToast("请输入要咨询的问题");
      return;
    }
    await appendAgentConversation(question);
    input.value = "";
    showToast("Agent 已通过 API 返回结构化建议");
  });
  document.querySelectorAll(".action-form").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      await submitRoleAction(form);
    });
  });
  document.querySelector("#saveSettingsButton")?.addEventListener("click", () => {
    if (!canPerform("saveSettings")) {
      showToast("当前角色无权执行该操作");
      return;
    }
    const input = document.querySelector("#apiBaseInput");
    localStorage.setItem("campuspilot:apiBase", input.value.trim());
    showToast("设置已保存到当前环境");
  });
}

function bindPublicCarousel() {
  const slides = [...document.querySelectorAll("[data-public-slide]")];
  const dots = [...document.querySelectorAll("[data-public-dot]")];
  if (!slides.length) return;

  let activeIndex = slides.findIndex((slide) => slide.classList.contains("active"));
  if (activeIndex < 0) activeIndex = 0;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === activeIndex);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === activeIndex);
    });
  };

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.publicDot));
      window.clearInterval(state.publicCarouselTimer);
      state.publicCarouselTimer = window.setInterval(() => showSlide(activeIndex + 1), 4300);
    });
  });

  state.publicCarouselTimer = window.setInterval(() => showSlide(activeIndex + 1), 4300);
}

async function submitRoleAction(form) {
  const action = form.dataset.action;
  const code = form.dataset.code;
  const requiredAction = { confirm: "confirmWarning", "mentor-plan": "saveMentorPlan", feedback: "submitFeedback", close: "closeWarning" }[action];
  if (!requiredAction || !canPerform(requiredAction)) {
    showToast("当前角色无权执行该操作");
    return;
  }
  if (action === "confirm") {
    const value = form.elements.counselorNote.value.trim();
    await api.confirmWarning(code, value);
    showToast(`${code} 已确认，辅导员意见已保存`);
  }
  if (action === "mentor-plan") {
    const value = form.elements.mentorPlan.value.trim();
    await api.saveMentorPlan(code, value);
    showToast(`${code} 导师帮扶措施已保存`);
  }
  if (action === "feedback") {
    const value = form.elements.feedback.value.trim();
    await api.submitFeedback(code, value);
    showToast(`${code} 学生反馈已提交`);
  }
  if (action === "close") {
    const value = form.elements.closeNote.value.trim();
    await api.closeWarning(code, value);
    showToast(`${code} 已复评结案`);
  }
  state.data = null;
  await renderRoute();
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("visible"), 2800);
}

async function appendAgentConversation(question) {
  const thread = document.querySelector("#agentThread");
  if (!thread) return;
  const result = await api.agentChat(question, getUser().role);
  const answer = result.answer || buildAgentAnswer(question);
  const chips = result.chips || ["工具查询结果", "风险规则", "预警单字段"];
  thread.insertAdjacentHTML(
    "beforeend",
    `<article class="chat-message user">
      <span class="avatar small">王</span>
      <div class="chat-bubble"><strong>辅导员提问</strong><p>${escapeHtml(question)}</p></div>
    </article>
    <article class="chat-message assistant">
      <span class="avatar small">AI</span>
      <div class="chat-bubble">
        <strong>Agent 建议</strong>
        <p>${escapeHtml(answer)}</p>
        <div class="agent-chips">${chips.map((chip) => `<span class="chip">${escapeHtml(chip)}</span>`).join("")}</div>
      </div>
    </article>`,
  );
  thread.scrollTop = thread.scrollHeight;
}

function buildAgentAnswer(question) {
  if (question.includes("李佳怡")) {
    return "【风险等级】需要关注。李佳怡没有挂科，但出勤率为 78%，学习平台活跃度偏低。建议辅导员先确认近期请假和课堂参与情况，可生成学习行为关注预警单，初始状态为待确认。";
  }
  if (question.includes("陈思琪")) {
    return "【成长规划】陈思琪学业表现稳定，但职业目标暂不明确。建议短期完成前端项目实践，中期明确软件工程或产品技术方向，导师可推荐课程项目并在 2 周后复盘。";
  }
  if (question.includes("待辅导员") || question.includes("确认")) {
    return "【待处理事项】当前优先确认 RW2026002 李佳怡学习行为关注预警；RW2026001 张明远已进入帮扶中，需要跟进导师补强计划和复评时间。";
  }
  return "【风险等级】高风险。张明远当前 GPA 2.31，挂科数 2，出勤率 76%，作业完成率 62%，且高等数学和数据结构薄弱。建议辅导员确认预警，导师制定 4 周补强计划，并在 2026-06-10 复评。";
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function hydrateUser(publicMode = false) {
  const user = getUser();
  const effectiveAuthenticated = Boolean(user) && !publicMode;
  document.body.dataset.authenticated = String(effectiveAuthenticated);
  document.body.dataset.role = user?.role || "匿名";
  document.querySelector("#topUserName").textContent = user?.name || "未登录";
  document.querySelector("#topUserRole").textContent = user?.role || "访客";
  document.querySelector("#topAvatar").textContent = user?.name?.slice(0, 1) || "访";
  document.querySelectorAll('[data-auth-control="login"], [data-auth-control="register"]').forEach((item) => {
    item.hidden = effectiveAuthenticated;
  });
  document.querySelectorAll('[data-auth-control="user"]').forEach((item) => {
    item.hidden = !effectiveAuthenticated;
  });
}

document.querySelector("#refreshButton").addEventListener("click", async () => {
  state.data = null;
  await renderRoute();
  showToast("数据已刷新");
});

document.querySelector("#globalSearch").addEventListener("input", (event) => {
  state.query = event.target.value;
  window.clearTimeout(window.__campusSearchTimer);
  window.__campusSearchTimer = window.setTimeout(renderRoute, 160);
});

document.querySelectorAll('a[href^="./login.html"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    document.body.classList.add("page-exit");
    window.setTimeout(() => {
      window.location.href = link.href;
    }, 220);
  });
});

window.addEventListener("hashchange", renderRoute);
hydrateUser();
renderRoute();
