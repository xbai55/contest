# CampusPilot Java Backend

这是 A6 智慧校园项目的正式 Java 后端。它负责：

- 服务前端静态页面。
- 提供学生画像、课程成绩、学习行为、风险预警、流程日志、驾驶舱等业务接口。
- 维护“风险识别 -> 预警生成 -> 辅导员确认 -> 导师帮扶 -> 学生反馈 -> 复评结案”的演示闭环。
- 通过环境变量代理调用金蝶 Agent API；未配置时自动使用本地兜底回答，便于离线演示。

## 运行

```powershell
cd C:\Users\xbai55\Documents\contest\campuspilot-server
.\scripts\build.ps1
.\scripts\run.ps1
```

访问：

```text
http://127.0.0.1:8787/index.html#dashboard
```

## 云主机环境变量

```text
CAMPUSPILOT_HOST=0.0.0.0
CAMPUSPILOT_PORT=8787
CAMPUSPILOT_STATIC_ROOT=/opt/campuspilot/campuspilot-home
CAMPUSPILOT_AGENT_API_URL=https://你的金蝶Agent接口地址
CAMPUSPILOT_AGENT_API_KEY=你的接口密钥
CAMPUSPILOT_AGENT_TIMEOUT_MS=8000
```

只要前端和后端目录一起上传，云主机上改 `CAMPUSPILOT_AGENT_API_URL` 和 `CAMPUSPILOT_AGENT_API_KEY` 就能切换到真实金蝶 Agent。
