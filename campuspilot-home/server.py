from __future__ import annotations

import json
from datetime import datetime
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote


ROOT = Path(__file__).resolve().parent


DATA = {
    "overview": {
        "totalStudents": 5,
        "highRisk": 1,
        "watchRisk": 1,
        "normal": 2,
        "improved": 1,
        "pendingWarnings": 1,
        "activeWarnings": 1,
        "closedWarnings": 1,
        "averageGpa": 3.02,
        "averageAttendance": 88,
    },
    "riskDistribution": [
        {"name": "高风险", "value": 1, "color": "#d43f3a", "key": "high"},
        {"name": "需要关注", "value": 1, "color": "#d98314", "key": "watch"},
        {"name": "正常", "value": 2, "color": "#24966d", "key": "normal"},
        {"name": "改善中", "value": 1, "color": "#60758d", "key": "improved"},
    ],
    "students": [
        {"name": "张明远", "no": "STU2026001", "college": "信息工程学院", "major": "人工智能", "grade": "2023级", "className": "AI 2301", "goal": "AI 算法工程师", "interest": "机器学习、算法竞赛", "gpa": 2.31, "creditRate": 71, "failed": 2, "attendance": 76, "assignment": 62, "innovation": 38, "riskLevel": "高风险", "riskKey": "high", "riskScore": 86, "reason": "高等数学和数据结构薄弱，出勤率与作业完成率偏低。", "advice": "建议辅导员确认预警，导师制定 4 周课程补强计划。", "status": "帮扶中", "updatedAt": "2026-06-05"},
        {"name": "李佳怡", "no": "STU2026002", "college": "信息工程学院", "major": "数据科学", "grade": "2023级", "className": "DS 2302", "goal": "数据分析师", "interest": "数据可视化、商业分析", "gpa": 3.08, "creditRate": 88, "failed": 0, "attendance": 78, "assignment": 82, "innovation": 55, "riskLevel": "需要关注", "riskKey": "watch", "riskScore": 62, "reason": "无挂科，但近期出勤率下降，学习平台活跃度偏低。", "advice": "建议辅导员进行学习习惯提醒，并跟踪未来两周出勤。", "status": "待确认", "updatedAt": "2026-06-05"},
        {"name": "陈思琪", "no": "STU2026003", "college": "计算机学院", "major": "软件工程", "grade": "2023级", "className": "SE 2301", "goal": "待明确", "interest": "前端开发、产品设计", "gpa": 3.21, "creditRate": 91, "failed": 0, "attendance": 91, "assignment": 89, "innovation": 42, "riskLevel": "正常", "riskKey": "normal", "riskScore": 28, "reason": "学业表现稳定，但职业目标不够明确。", "advice": "建议导师帮助其明确成长方向，推荐参与课程项目。", "status": "成长规划中", "updatedAt": "2026-06-04"},
        {"name": "周泽宇", "no": "STU2026004", "college": "网络空间安全学院", "major": "网络安全", "grade": "2023级", "className": "NS 2301", "goal": "安全工程师", "interest": "攻防演练、网络协议", "gpa": 3.62, "creditRate": 96, "failed": 0, "attendance": 96, "assignment": 94, "innovation": 81, "riskLevel": "正常", "riskKey": "normal", "riskScore": 16, "reason": "学业和行为表现良好，科创参与度高。", "advice": "建议继续参加安全竞赛和项目实践。", "status": "正常跟踪", "updatedAt": "2026-06-03"},
        {"name": "王嘉宁", "no": "STU2026005", "college": "信息工程学院", "major": "计算机科学与技术", "grade": "2023级", "className": "CS 2303", "goal": "后端工程师", "interest": "数据库、分布式系统", "gpa": 2.92, "creditRate": 84, "failed": 0, "attendance": 89, "assignment": 87, "innovation": 63, "riskLevel": "改善中", "riskKey": "improved", "riskScore": 41, "reason": "曾有行为风险，近期出勤和作业完成率明显改善。", "advice": "建议保持复评，沉淀为帮扶改善案例。", "status": "已结案", "updatedAt": "2026-06-02"},
    ],
    "courses": [
        {"student": "张明远", "course": "高等数学", "score": 58, "type": "核心基础", "status": "不及格", "advice": "每周 2 次辅导与错题复盘"},
        {"student": "张明远", "course": "数据结构", "score": 61, "type": "核心专业", "status": "薄弱", "advice": "补强线性表、树、图基础"},
        {"student": "张明远", "course": "Python 程序设计", "score": 72, "type": "程序设计", "status": "一般", "advice": "结合算法题巩固语法与调试"},
        {"student": "李佳怡", "course": "数据可视化", "score": 86, "type": "专业方向", "status": "良好", "advice": "可参与驾驶舱展示优化"},
        {"student": "陈思琪", "course": "Java 程序设计", "score": 84, "type": "程序设计", "status": "良好", "advice": "建议参与 Web 项目实践"},
        {"student": "周泽宇", "course": "网络安全基础", "score": 92, "type": "专业方向", "status": "优秀", "advice": "推荐参加攻防演练"},
        {"student": "王嘉宁", "course": "数据库原理", "score": 81, "type": "核心专业", "status": "良好", "advice": "可拓展事务与索引优化"},
    ],
    "behaviors": [
        {"student": "张明远", "attendance": 76, "assignment": 62, "activity": 48, "interaction": 3, "lastLogin": "2026-06-04", "note": "出勤和作业完成率均偏低"},
        {"student": "李佳怡", "attendance": 78, "assignment": 82, "activity": 51, "interaction": 4, "lastLogin": "2026-06-03", "note": "近期出勤下降，需要行为关注"},
        {"student": "陈思琪", "attendance": 91, "assignment": 89, "activity": 67, "interaction": 7, "lastLogin": "2026-06-05", "note": "学习行为稳定"},
        {"student": "周泽宇", "attendance": 96, "assignment": 94, "activity": 88, "interaction": 12, "lastLogin": "2026-06-05", "note": "活跃度和互动次数高"},
        {"student": "王嘉宁", "attendance": 89, "assignment": 87, "activity": 70, "interaction": 8, "lastLogin": "2026-06-04", "note": "帮扶后行为改善明显"},
    ],
    "warnings": [
        {"code": "RW2026001", "title": "张明远高风险学业预警", "studentNo": "STU2026001", "student": "张明远", "level": "高风险", "riskKey": "high", "score": 86, "source": "Agent 风险分析", "status": "帮扶中", "statusKey": "active", "owner": "辅导员 / 专业导师", "reviewAt": "2026-06-10", "counselorNote": "已确认存在学业高风险，需进入重点帮扶。", "mentorPlan": "制定高等数学与数据结构 4 周补强计划。", "studentFeedback": "愿意参加每周辅导并提交学习记录。"},
        {"code": "RW2026002", "title": "李佳怡学习行为关注预警", "studentNo": "STU2026002", "student": "李佳怡", "level": "需要关注", "riskKey": "watch", "score": 62, "source": "学习行为监测", "status": "待确认", "statusKey": "todo", "owner": "辅导员", "reviewAt": "2026-06-12", "counselorNote": "待辅导员核实近期请假与课程参与情况。", "mentorPlan": "暂未进入导师帮扶。", "studentFeedback": "未反馈。"},
        {"code": "RW2026003", "title": "王嘉宁阶段帮扶改善记录", "studentNo": "STU2026005", "student": "王嘉宁", "level": "改善中", "riskKey": "improved", "score": 41, "source": "辅导员复评", "status": "已结案", "statusKey": "done", "owner": "学院管理者", "reviewAt": "2026-06-15", "counselorNote": "连续两周出勤与作业完成率改善。", "mentorPlan": "继续跟踪数据库课程项目。", "studentFeedback": "已完成阶段任务。"},
    ],
    "workflow": [
        {"step": "风险识别", "owner": "系统 / Agent", "time": "2026-06-04", "detail": "根据画像、成绩和行为识别张明远为高风险。"},
        {"step": "生成预警单", "owner": "风险预警对象", "time": "2026-06-04", "detail": "形成 RW2026001，预警来源为 Agent 风险分析。"},
        {"step": "辅导员确认", "owner": "辅导员", "time": "2026-06-05", "detail": "确认风险，填写辅导员意见并推进导师帮扶。"},
        {"step": "导师帮扶", "owner": "专业导师", "time": "2026-06-05", "detail": "制定高等数学与数据结构 4 周补强计划。"},
        {"step": "学生反馈", "owner": "学生", "time": "2026-06-06", "detail": "学生确认参加辅导并提交阶段学习记录。"},
        {"step": "复评结案", "owner": "辅导员 / 学院", "time": "待复评", "detail": "根据后续出勤、作业和课程测验决定是否结案。"},
    ],
    "agentInsight": {
        "title": "优先处理张明远高风险学业预警",
        "summary": "建议辅导员先确认 RW2026001，导师同步制定高等数学与数据结构 4 周补强计划，并在下次复评中重点观察出勤率和作业完成率。",
        "tags": ["高风险", "导师帮扶", "4 周复评", "可生成预警建议"],
    },
    "roles": [
        {"role": "学生", "duty": "查看自己的成长画像、查看 AI 学习建议、提交帮扶反馈。", "route": "#students", "actor": "张明远"},
        {"role": "辅导员", "duty": "查看风险学生列表、确认风险预警单、填写辅导员意见、跟踪处理状态。", "route": "#warnings", "actor": "王老师"},
        {"role": "导师", "duty": "查看学生课程短板、制定帮扶措施、推荐课程和项目。", "route": "#courses", "actor": "陈导师"},
        {"role": "学院管理者", "duty": "查看驾驶舱、风险分布、预警处理情况和帮扶成效。", "route": "#dashboard", "actor": "学院管理者"},
    ],
    "auditLogs": [
        {"time": "2026-06-06 18:40", "actor": "王老师", "action": "查看张明远学生画像"},
        {"time": "2026-06-06 18:47", "actor": "CampusPilot Agent", "action": "生成高风险帮扶建议"},
        {"time": "2026-06-06 18:55", "actor": "陈导师", "action": "更新导师帮扶措施"},
    ],
    "workflowLogs": [
        {"code": "RW2026001", "time": "2026-06-04 09:12", "actor": "CampusPilot Agent", "action": "风险识别", "detail": "根据画像、课程成绩和学习行为识别为高风险。"},
        {"code": "RW2026001", "time": "2026-06-05 10:20", "actor": "王老师", "action": "辅导员确认", "detail": "确认风险，进入导师帮扶阶段。"},
        {"code": "RW2026001", "time": "2026-06-05 16:40", "actor": "陈导师", "action": "导师帮扶", "detail": "制定 4 周课程补强计划。"},
        {"code": "RW2026002", "time": "2026-06-04 11:35", "actor": "CampusPilot Agent", "action": "风险识别", "detail": "学习行为下降，生成关注预警。"},
        {"code": "RW2026003", "time": "2026-06-02 18:10", "actor": "王老师", "action": "复评结案", "detail": "出勤和作业完成率改善，沉淀为帮扶案例。"},
    ],
    "riskTrend": [
        {"week": "第1周", "high": 2, "watch": 2, "done": 0},
        {"week": "第2周", "high": 2, "watch": 1, "done": 1},
        {"week": "第3周", "high": 1, "watch": 2, "done": 1},
        {"week": "第4周", "high": 1, "watch": 1, "done": 1},
    ],
    "integrationStatus": {
        "kingdeeBaseUrl": "http://10.0.160.250:8080/ierp",
        "agentMode": "金蝶 Agent API 接入",
        "objects": [
            {"name": "学生画像", "code": "cp_student_profile", "status": "已建模", "fields": 12},
            {"name": "课程成绩", "code": "cp_course_score", "status": "已建模", "fields": 6},
            {"name": "学习行为", "code": "cp_learning_behavior", "status": "已建模", "fields": 6},
            {"name": "风险预警单", "code": "cp_warning_order", "status": "已建模", "fields": 13},
            {"name": "风险处理日志", "code": "cp_warning_log", "status": "本地已实现", "fields": 5},
        ],
        "thirdPartyApp": {
            "appId": "campuspilot_isv",
            "auth": "AccessToken / API 授权 / IP 白名单",
            "status": "待配置真实密钥",
        },
    },
}

ROLE_PERMISSIONS = {
    "学生": {
        "actions": ["viewOwnProfile", "viewCourses", "viewAgentAdvice", "submitFeedback"],
        "labels": ["查看本人画像", "查看课程成绩", "查看 AI 学习建议", "提交帮扶反馈"],
    },
    "辅导员": {
        "actions": ["viewRiskStudents", "confirmWarning", "closeWarning", "createWarningSuggestion", "viewBehaviors", "viewWarnings"],
        "labels": ["查看风险学生", "确认风险预警单", "填写辅导员意见", "复评结案", "跟踪处理状态"],
    },
    "导师": {
        "actions": ["viewCourseShortfalls", "saveMentorPlan", "viewWarnings", "viewWorkflow"],
        "labels": ["查看课程短板", "制定帮扶措施", "推荐课程和项目", "查看帮扶进展"],
    },
    "学院管理者": {
        "actions": ["viewDashboard", "viewWarnings", "viewAudit", "saveSettings"],
        "labels": ["查看驾驶舱", "查看风险分布", "查看预警处理情况", "查看帮扶成效", "配置系统规则"],
    },
}


def now_label() -> str:
    return datetime.now().strftime("%Y-%m-%d %H:%M")


def add_audit(actor: str, action: str) -> None:
    DATA["auditLogs"].insert(0, {"time": now_label(), "actor": actor, "action": action})
    DATA["auditLogs"][:] = DATA["auditLogs"][:12]


def add_workflow_log(code: str, actor: str, action: str, detail: str) -> None:
    DATA["workflowLogs"].insert(0, {"code": code, "time": now_label(), "actor": actor, "action": action, "detail": detail})
    DATA["workflowLogs"][:] = DATA["workflowLogs"][:24]


def find_warning(code: str) -> dict | None:
    return next((item for item in DATA["warnings"] if item["code"] == code), None)


def recalc_overview() -> None:
    warnings = DATA["warnings"]
    DATA["overview"]["pendingWarnings"] = sum(1 for item in warnings if item["statusKey"] == "todo")
    DATA["overview"]["activeWarnings"] = sum(1 for item in warnings if item["statusKey"] == "active")
    DATA["overview"]["closedWarnings"] = sum(1 for item in warnings if item["statusKey"] == "done")


def next_warning_code() -> str:
    max_no = 0
    for item in DATA["warnings"]:
        if item["code"].startswith("RW") and item["code"][2:].isdigit():
            max_no = max(max_no, int(item["code"][2:]))
    return f"RW{max_no + 1:07d}"


def warning_logs(code: str) -> list[dict]:
    return [item for item in DATA["workflowLogs"] if item["code"] == code]


def build_warning_from_student(student: dict) -> dict:
    score = max(int(student["riskScore"]), 55)
    risk_key = student["riskKey"] if student["riskKey"] != "normal" else "watch"
    level = student["riskLevel"] if student["riskKey"] != "normal" else "需要关注"
    return {
        "code": next_warning_code(),
        "title": f"{student['name']}{level}成长跟进单",
        "studentNo": student["no"],
        "student": student["name"],
        "level": level,
        "riskKey": risk_key,
        "score": score,
        "source": "金蝶 Agent API 建议",
        "status": "待确认",
        "statusKey": "todo",
        "owner": "辅导员",
        "reviewAt": "2026-06-18",
        "counselorNote": "待辅导员核实画像、成绩和行为证据。",
        "mentorPlan": "待导师制定课程补强或成长规划。",
        "studentFeedback": "未反馈。",
    }


def create_warning_suggestion() -> dict:
    warned = {item["studentNo"] for item in DATA["warnings"] if item["statusKey"] != "done"}
    candidate = next((item for item in DATA["students"] if item["no"] not in warned), DATA["students"][0])
    warning = build_warning_from_student(candidate)
    DATA["warnings"].insert(0, warning)
    recalc_overview()
    add_workflow_log(warning["code"], "CampusPilot Agent", "生成预警单", "根据画像、成绩、行为和风险规则生成结构化预警单。")
    add_audit("CampusPilot Agent", f"创建预警单 {warning['code']}：{warning['student']}")
    return warning


def effectiveness_summary() -> dict:
    warnings = DATA["warnings"]
    total = len(warnings)
    done = sum(1 for item in warnings if item["statusKey"] == "done")
    active = sum(1 for item in warnings if item["statusKey"] == "active")
    return {
        "closedRate": round(done / total * 100) if total else 0,
        "activeCount": active,
        "closedCount": done,
        "averageCycleDays": 7,
        "highPriority": [item for item in warnings if item["riskKey"] == "high" and item["statusKey"] != "done"],
    }


def current_user(headers, body=None) -> dict:
    body = body or {}
    embedded = body.get("__user") if isinstance(body, dict) else None
    role_aliases = {
        "student": "学生",
        "counselor": "辅导员",
        "mentor": "导师",
        "manager": "学院管理者",
    }
    role_key = headers.get("X-CampusPilot-Role-Key")
    raw_role = headers.get("X-CampusPilot-Role") or (embedded or {}).get("role")
    role = role_aliases.get(role_key or "", raw_role)
    header_name = headers.get("X-CampusPilot-User")
    name = unquote(header_name) if header_name else (embedded or {}).get("name")
    return {"role": role, "name": name, "authenticated": bool(role and name)}


def can_perform(role: str, action: str) -> bool:
    return action in ROLE_PERMISSIONS.get(role, ROLE_PERMISSIONS["辅导员"])["actions"]


def forbidden() -> dict:
    return {"ok": False, "message": "当前角色无权执行该操作"}


def unauthorized() -> dict:
    return {"ok": False, "message": "请先登录后再访问业务数据"}


def is_self_student(student_name: str, user_name: str) -> bool:
    return student_name == user_name or (user_name == "张明远" and student_name == "张明远")


def filter_students_for_role(role: str, user_name: str, students: list[dict]) -> list[dict]:
    if role == "学生":
        return [item for item in students if is_self_student(item["name"], user_name) or item["no"] == "STU2026001"]
    if role == "辅导员":
        return [item for item in students if item["riskKey"] in {"high", "watch", "improved"}]
    if role == "导师":
        return [item for item in students if item["riskKey"] == "high" or "帮扶" in item["status"] or "规划" in item["status"]]
    return students


def filter_courses_for_role(role: str, user_name: str, courses: list[dict]) -> list[dict]:
    if role == "学生":
        return [item for item in courses if is_self_student(item["student"], user_name) or item["student"] == "张明远"]
    if role == "辅导员":
        return [item for item in courses if item["student"] in {"张明远", "李佳怡", "王嘉宁"}]
    if role == "导师":
        return [item for item in courses if item["score"] < 75 or item["student"] == "陈思琪"]
    return courses


def filter_behaviors_for_role(role: str, user_name: str, behaviors: list[dict]) -> list[dict]:
    if role == "学生":
        return [item for item in behaviors if is_self_student(item["student"], user_name) or item["student"] == "张明远"]
    if role == "辅导员":
        return [item for item in behaviors if item["attendance"] < 90 or item["assignment"] < 90]
    if role == "导师":
        return []
    return behaviors


def filter_warnings_for_role(role: str, user_name: str, warnings: list[dict]) -> list[dict]:
    if role == "学生":
        return [item for item in warnings if is_self_student(item["student"], user_name) or item["studentNo"] == "STU2026001"]
    if role == "导师":
        return [item for item in warnings if item["statusKey"] == "active" or item["riskKey"] == "high"]
    if role == "辅导员":
        return [item for item in warnings if item["statusKey"] != "done" or item["riskKey"] != "normal"]
    return warnings


def filter_audit_for_role(role: str, user_name: str, logs: list[dict]) -> list[dict]:
    if role == "学生":
        return [item for item in logs if item["actor"] in {user_name, "CampusPilot Agent"}]
    if role in {"辅导员", "导师"}:
        return logs[:5]
    return logs


def agent_answer(question: str, role: str) -> dict:
    if "李佳怡" in question:
        answer = "【风险等级】需要关注。李佳怡没有挂科，但出勤率为 78%，学习平台活跃度偏低。建议辅导员先确认近期请假和课堂参与情况，可生成学习行为关注预警单，初始状态为待确认。"
        chips = ["query_student_profile", "query_learning_behavior", "create_warning_order"]
    elif "陈思琪" in question:
        answer = "【成长规划】陈思琪学业稳定，但职业目标暂不明确。建议短期完成前端项目实践，中期明确软件工程或产品技术方向，导师可推荐课程项目并在 2 周后复盘。"
        chips = ["query_student_profile", "generate_growth_plan", "mentor_recommendation"]
    elif "待辅导员" in question or "确认" in question:
        answer = "【待处理事项】当前优先确认 RW2026002 李佳怡学习行为关注预警；RW2026001 张明远已进入帮扶中，需要跟进导师补强计划和复评时间。"
        chips = ["query_warning_order", "update_warning_status", "counselor_followup"]
    else:
        answer = "【风险等级】高风险。张明远当前 GPA 2.31，挂科数 2，出勤率 76%，作业完成率 62%，且高等数学和数据结构薄弱。建议辅导员确认预警，导师制定 4 周补强计划，并在 2026-06-10 复评。"
        chips = ["query_course_score", "query_learning_behavior", "risk_rule_engine"]
    add_audit(role or "CampusPilot Agent", f"通过 Agent 问答生成建议：{question[:18]}")
    return {"answer": answer, "chips": chips, "source": "CampusPilot Agent API"}


class CampusPilotHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def send_json(self, value, status=200):
        payload = json.dumps(value, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def read_json(self):
        length = int(self.headers.get("Content-Length", "0") or "0")
        if length == 0:
            return {}
        return json.loads(self.rfile.read(length).decode("utf-8"))

    def do_GET(self):
        path = unquote(self.path.split("?", 1)[0])
        user = current_user(self.headers)
        mapping = {
            "/api/campuspilot/overview": "overview",
            "/api/campuspilot/risk-distribution": "riskDistribution",
            "/api/campuspilot/students": "students",
            "/api/campuspilot/courses": "courses",
            "/api/campuspilot/behaviors": "behaviors",
            "/api/campuspilot/warnings": "warnings",
            "/api/campuspilot/workflow": "workflow",
            "/api/campuspilot/workflow-logs": "workflowLogs",
            "/api/campuspilot/risk-trend": "riskTrend",
            "/api/campuspilot/integration-status": "integrationStatus",
            "/api/campuspilot/agent-insight": "agentInsight",
            "/api/campuspilot/roles": "roles",
            "/api/campuspilot/audit-logs": "auditLogs",
        }
        if path == "/api/campuspilot/health":
            self.send_json({"ok": True, "service": "CampusPilot API", "time": now_label()})
            return
        recalc_overview()
        protected_paths = set(mapping) - {"/api/campuspilot/roles"}
        if path in protected_paths and not user["authenticated"]:
            self.send_json(unauthorized(), 401)
            return
        if path == "/api/campuspilot/students":
            self.send_json(filter_students_for_role(user["role"], user["name"], DATA["students"]))
            return
        if path == "/api/campuspilot/courses":
            self.send_json(filter_courses_for_role(user["role"], user["name"], DATA["courses"]))
            return
        if path == "/api/campuspilot/behaviors":
            self.send_json(filter_behaviors_for_role(user["role"], user["name"], DATA["behaviors"]))
            return
        if path == "/api/campuspilot/warnings":
            self.send_json(filter_warnings_for_role(user["role"], user["name"], DATA["warnings"]))
            return
        if path == "/api/campuspilot/audit-logs":
            self.send_json(filter_audit_for_role(user["role"], user["name"], DATA["auditLogs"]))
            return
        if path == "/api/campuspilot/effectiveness":
            if not user["authenticated"]:
                self.send_json(unauthorized(), 401)
                return
            self.send_json(effectiveness_summary())
            return
        if path in mapping:
            self.send_json(DATA[mapping[path]])
            return
        super().do_GET()

    def do_POST(self):
        path = unquote(self.path.split("?", 1)[0])
        body = self.read_json()
        user_context = current_user(self.headers, body)
        if path == "/api/campuspilot/agent/chat":
            if not user_context["authenticated"]:
                self.send_json(unauthorized(), 401)
                return
            self.send_json(agent_answer(body.get("question", ""), user_context["role"]))
            return
        if path == "/api/campuspilot/auth/login":
            role = body.get("role") or "辅导员"
            user = {
                "name": body.get("name") or "王老师",
                "role": role,
                "email": body.get("account") or "counselor@campus.edu",
                "college": "信息工程学院",
                "tenant": "CampusPilot 校园租户",
                "permissions": ROLE_PERMISSIONS.get(role, ROLE_PERMISSIONS["辅导员"])["labels"],
            }
            add_audit(user["name"], "登录 CampusPilot 工作台")
            self.send_json({"ok": True, "user": user})
            return
        if path == "/api/campuspilot/auth/register":
            user = {
                "name": body.get("name") or "校园用户",
                "role": body.get("role") or "辅导员",
                "email": body.get("email") or "demo@campus.edu",
                "college": "信息工程学院",
                "tenant": "CampusPilot 校园租户",
                "permissions": ROLE_PERMISSIONS.get(body.get("role") or "辅导员", ROLE_PERMISSIONS["辅导员"])["labels"],
            }
            add_audit(user["name"], "创建 CampusPilot 账号")
            self.send_json({"ok": True, "user": user})
            return
        if path == "/api/campuspilot/warnings/suggest":
            if not user_context["authenticated"]:
                self.send_json(unauthorized(), 401)
                return
            if not can_perform(user_context["role"], "createWarningSuggestion"):
                self.send_json(forbidden(), 403)
                return
            warning = create_warning_suggestion()
            self.send_json({"ok": True, "created": True, "warning": warning})
            return
        parts = path.strip("/").split("/")
        if len(parts) == 5 and parts[:3] == ["api", "campuspilot", "warnings"]:
            code, action = parts[3], parts[4]
            warning = find_warning(code)
            if not warning:
                self.send_json({"ok": False, "message": "warning not found"}, 404)
                return
            if action == "confirm":
                if not user_context["authenticated"]:
                    self.send_json(unauthorized(), 401)
                    return
                if not can_perform(user_context["role"], "confirmWarning"):
                    self.send_json(forbidden(), 403)
                    return
                warning["counselorNote"] = body.get("counselorNote") or warning["counselorNote"]
                warning["status"] = "帮扶中"
                warning["statusKey"] = "active"
                add_audit(user_context["name"], f"确认预警单 {code} 并填写辅导员意见")
                add_workflow_log(code, user_context["name"], "辅导员确认", warning["counselorNote"])
            elif action == "mentor-plan":
                if not user_context["authenticated"]:
                    self.send_json(unauthorized(), 401)
                    return
                if not can_perform(user_context["role"], "saveMentorPlan"):
                    self.send_json(forbidden(), 403)
                    return
                warning["mentorPlan"] = body.get("mentorPlan") or warning["mentorPlan"]
                warning["status"] = "帮扶中"
                warning["statusKey"] = "active"
                add_audit(user_context["name"], f"更新预警单 {code} 的导师帮扶措施")
                add_workflow_log(code, user_context["name"], "导师帮扶", warning["mentorPlan"])
            elif action == "feedback":
                if not user_context["authenticated"]:
                    self.send_json(unauthorized(), 401)
                    return
                if not can_perform(user_context["role"], "submitFeedback"):
                    self.send_json(forbidden(), 403)
                    return
                warning["studentFeedback"] = body.get("studentFeedback") or warning["studentFeedback"]
                add_audit(user_context["name"], f"提交预警单 {code} 的学生反馈")
                add_workflow_log(code, user_context["name"], "学生反馈", warning["studentFeedback"])
            elif action == "close":
                if not user_context["authenticated"]:
                    self.send_json(unauthorized(), 401)
                    return
                if not can_perform(user_context["role"], "closeWarning"):
                    self.send_json(forbidden(), 403)
                    return
                close_note = body.get("closeNote") or "复评通过，预警单结案。"
                warning["status"] = "已结案"
                warning["statusKey"] = "done"
                warning["reviewAt"] = now_label().split(" ")[0]
                add_audit(user_context["name"], f"复评结案预警单 {code}")
                add_workflow_log(code, user_context["name"], "复评结案", close_note)
            else:
                self.send_json({"ok": False, "message": "unknown action"}, 404)
                return
            recalc_overview()
            self.send_json({"ok": True, "warning": warning})
            return
        self.send_json({"ok": False, "message": "not found"}, 404)


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 8787), CampusPilotHandler)
    print("CampusPilot API server: http://127.0.0.1:8787/index.html?v=enterprise6#dashboard")
    server.serve_forever()
