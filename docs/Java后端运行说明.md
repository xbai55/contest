# CampusPilot Java 后端运行说明

## 1. 为什么正式后端必须用 Java

A6 赛题实现条件中明确写到：

```text
开发环境：金蝶AI苍穹平台
开发语言：Java
数据库：PostgreSQL
```

因此本项目的正式后端已经从 Python 开发脚本升级为 Java 工程：

```text
campuspilot-server/
```

原来的 `campuspilot-home/server.py` 只适合作为开发期快速验证脚本，不建议作为最终提交主后端。

## 2. 当前 Java 工程结构

```text
campuspilot-server/
  config/
    application.example.properties
  scripts/
    build.ps1
    run.ps1
  src/main/java/com/campuspilot/
    CampusPilotApplication.java
    config/AppConfig.java
    http/ApiHandler.java
    http/StaticFileHandler.java
    service/AgentClient.java
    store/InMemoryCampusPilotStore.java
    util/Json.java
    util/RequestUtil.java
```

这不是“只有一个 Java 文件”的临时实现，而是按后端落地思路拆成了入口、配置、HTTP 路由、静态资源、Agent 客户端、业务数据仓储和工具层。

## 3. 覆盖的业务能力

- 登录与注册接口。
- 学生画像、课程成绩、学习行为数据接口。
- 风险预警单列表与驾驶舱。
- 生成预警单。
- 辅导员确认预警。
- 导师保存帮扶措施。
- 学生提交反馈。
- 辅导员/管理者复评结案。
- 风险处理日志、风险趋势、帮扶成效。
- 金蝶第三方应用与对象接入状态展示。
- Agent API 代理入口：`/api/campuspilot/agent/chat`。

一个简单例子：学生连续缺勤、课程低分时，后端可以生成预警单；辅导员确认后，导师写帮扶计划，学生提交反馈，最后复评结案。这就对应比赛要求里的“智能体能力 + 业务闭环”。

## 4. 本地运行

进入后端目录：

```powershell
cd C:\Users\xbai55\Documents\contest\campuspilot-server
```

编译：

```powershell
.\scripts\build.ps1
```

运行：

```powershell
.\scripts\run.ps1
```

浏览器访问：

```text
http://127.0.0.1:8787/index.html#dashboard
```

健康检查：

```powershell
curl.exe -s http://127.0.0.1:8787/api/campuspilot/health
```

## 5. 接入真实金蝶 Agent API

默认不配置 Agent API 时，后端使用本地兜底回答，保证演示不中断。

接入真实金蝶 Agent 时，在云主机或 PowerShell 里配置：

```powershell
$env:CAMPUSPILOT_AGENT_API_URL="https://你的金蝶Agent接口地址"
$env:CAMPUSPILOT_AGENT_API_KEY="你的接口密钥"
```

再运行：

```powershell
.\scripts\run.ps1
```

后端会把前端问题以 JSON POST 到金蝶 Agent：

```json
{
  "question": "请分析张明远为什么是高风险",
  "role": "辅导员",
  "campusContext": {}
}
```

如果金蝶 Agent 返回 JSON，后端直接透传；如果返回纯文本，后端会包装成前端可识别的 `answer` 字段。

## 6. 仍需注意

当前版本为了方便比赛演示，业务数据仍是 Java 内存数据，上传云主机后不依赖数据库也能完整演示。项目已补充 PostgreSQL 表结构：

```text
campuspilot-server/db/schema.sql
campuspilot-server/db/seed.sql
```

若要进一步贴合“企业级生产系统”，下一步可以把 `InMemoryCampusPilotStore` 替换为 PostgreSQL/JDBC 仓储层；前端接口不需要改。
