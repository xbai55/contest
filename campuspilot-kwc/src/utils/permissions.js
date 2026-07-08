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

export function roleKey(role) {
  return { 学生: "student", 辅导员: "counselor", 导师: "mentor", 学院管理者: "manager" }[role] || "counselor";
}

export function getUser() {
  const stored = localStorage.getItem("campuspilot:user");
  if (stored) return JSON.parse(stored);
  return null;
}

export function isAuthenticated() {
  return Boolean(getUser());
}

export function getPermissions(role) {
  const r = role || getUser()?.role;
  return ROLE_PERMISSIONS[r] || ROLE_PERMISSIONS["辅导员"];
}

export function roleConfig(role) {
  return getPermissions(role);
}

export function canAccess(route) {
  if (route === "home") return true;
  if (!isAuthenticated()) return route === "home";
  return getPermissions().routes.includes(route);
}

export function canPerform(action) {
  if (!isAuthenticated()) return false;
  return getPermissions().actions.includes(action);
}

function isSelfStudentName(name, user) {
  if (!user) return false;
  return name === user.name || (user.role === "学生" && user.name === "张明远" && name === "张明远");
}

export function scopeStudents(students, user) {
  const scope = getPermissions(user?.role).dataScopes.students;
  if (scope === "self") return students.filter((s) => isSelfStudentName(s.name, user) || s.no === "STU2026001");
  if (scope === "risk") return students.filter((s) => ["high", "watch", "improved"].includes(s.riskKey));
  if (scope === "mentor") return students.filter((s) => s.riskKey === "high" || s.status.includes("帮扶") || s.status.includes("规划"));
  if (scope === "none") return [];
  return students;
}

export function scopeCourses(courses, user) {
  const scope = getPermissions(user?.role).dataScopes.courses;
  if (scope === "self") return courses.filter((c) => isSelfStudentName(c.student, user) || c.student === "张明远");
  if (scope === "risk") return courses.filter((c) => ["张明远", "李佳怡", "王嘉宁"].includes(c.student));
  if (scope === "mentor") return courses.filter((c) => c.score < 75 || c.student === "陈思琪");
  if (scope === "none") return [];
  return courses;
}

export function scopeBehaviors(behaviors, user) {
  const scope = getPermissions(user?.role).dataScopes.behaviors;
  if (scope === "self") return behaviors.filter((b) => isSelfStudentName(b.student, user) || b.student === "张明远");
  if (scope === "risk") return behaviors.filter((b) => b.attendance < 90 || b.assignment < 90);
  if (scope === "none") return [];
  return behaviors;
}

export function scopeWarnings(warnings, user) {
  const scope = getPermissions(user?.role).dataScopes.warnings;
  if (scope === "self") return warnings.filter((w) => isSelfStudentName(w.student, user) || w.studentNo === "STU2026001");
  if (scope === "mentor") return warnings.filter((w) => w.statusKey === "active" || w.riskKey === "high");
  if (scope === "counselor") return warnings.filter((w) => w.statusKey !== "done" || w.riskKey !== "normal");
  if (scope === "none") return [];
  return warnings;
}

export function scopeAuditLogs(auditLogs, user) {
  const scope = getPermissions(user?.role).dataScopes.auditLogs;
  if (scope === "self") return auditLogs.filter((log) => log.actor === user?.name || log.actor === "CampusPilot Agent");
  if (scope === "limited") return auditLogs.slice(0, 5);
  return auditLogs;
}

export { ROLE_PERMISSIONS };
