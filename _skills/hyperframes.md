---
title: "heygen-com/hyperframes：HeyGen 开源的「用 HTML 写视频」框架与 21 个 agent skill"
date: 2026-10-06
source: "HeyGen"
src: "https://github.com/heygen-com/hyperframes"
risk: medium
theme: [creative-web, design-teaching]
repo: "heygen-com/hyperframes"
stars: 57385
pushed: 2026-10-06
stats_at: 2026-10-06
tags: [动效, AI视频, HTML, Skill]
summary: "HeyGen 官方开源的视频框架：用 HTML 写视频，附 21 个 agent skill，覆盖需求访谈、分镜、制作到渲染；访谈只产出一份 BRIEF.md 作为下游依据，再分流到产品宣传、知识讲解、口播字幕、音乐卡点、幻灯片等 10 类工作流。CLI 遥测默认开启。"
---

**简介**：HeyGen 官方开源的「用 HTML 写视频」框架，附 21 个 agent skill，覆盖从需求访谈、分镜、制作到渲染的全流程。

**要点**：需求访谈只产出一份 BRIEF.md，作为下游唯一依据，再分流到 10 类工作流（产品宣传、知识讲解、口播加字幕、音乐卡点、幻灯片等）；知识按阶段按需加载；附一份「不可商量的规则」和「首轮必查的 lint 问题」清单，配 check 与 snapshot 两道质量检查；提交问题反馈时禁止包含绝对路径和机器标识。Apache-2.0（依赖 mediabunny 为 MPL-2.0）。

**作者可信度**：高（HeyGen 官方，活跃维护）。

**安全审查（七项客观事实，审查于 2026-10）**：① 入口 skill 自称「任何视频请求的必经入口」和默认框架，要求创作前运行 usage、渲染后提交反馈（进入公开渠道），figma skill 会发送使用统计；② 外传——CLI 遥测默认开启，上报到 PostHog（系统指纹、agent 类型、skill 名）；本机登录过 HeyGen 时，media-use 脚本会把凭证文件里的邮箱一并上报；③ 越权——usage 命令会读取宿主 agent 的登录凭证（macOS 钥匙串中的 Claude Code 凭证、~/.claude/.credentials.json、~/.codex/auth.json、~/.grok/auth.json），只发回各自官方端点查询额度；④ 无混淆，但运行时用 npx …@latest 自动更新，skill 内容会随之变化；⑤ 「hyperframes telemetry disable」只写配置文件，media-use 脚本只认环境变量，关不住它的上报；⑥ 供应链——版本不固定，会下载 Chrome 与语音识别模型；⑦ 未见凭证外发。

**风险评级**：🟡 中（遥测默认开启，且关闭开关覆盖不全；会读取多个 agent 的本机登录凭证查询额度；版本随 @latest 变化）。

> 安全审查基于审查时（2026-10）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/heygen-com/hyperframes)。
