---
title: "OthmanAdi/planning-with-files：跨会话持久化任务规划 skill"
date: 2026-07-14
source: "OthmanAdi"
src: "https://github.com/OthmanAdi/planning-with-files"
tags: [工作流, Agent, Skill]
summary: "让 AI agent 在上下文压缩/清除/崩溃后仍能续跑任务的持久化规划 skill：三个 Markdown 文件（task_plan/findings/progress）在项目目录内持久化，lifecycle hooks 在每次工具调用前注入计划、停止前校验完成状态；含 SHA-256 防篡改与防注入机制，支持 60+ agent 平台。"
---

**简介**：持久化文件规划 skill，通过在项目目录内维护三个 Markdown 文件（task_plan.md / findings.md / progress.md）实现任务连续性——lifecycle hooks 在每次工具调用前注入当前计划、在停止前验证完成状态，使 agent 在上下文压缩、清除或崩溃后仍能接着跑。

**要点**：SHA-256 hash 证明防止计划被注入篡改，Nonce 随机分隔符防 prompt injection；有中文变体 planning-with-files-zh；支持 60+ agent 平台（Claude / Codex / Cursor / Copilot / Kiro 等）；v3 提供自主与门控两种模式；含 Windows PowerShell 兼容版本。适合工作坊 AI agent 演示与工程项目多 session 任务管理。

**活跃度**：25,283★（全生态最高星之一）/ 更新至 2026-07-14（MIT）；作者 OthmanAdi 个人维护，25k★ 为极大社区验证。

**安全审查（七项客观事实，审查于 2026-07）**：① 无隐藏指令，SKILL.md 与脚本内容和目的一致；② 数据外泄——完全本地文件操作，脚本仅读写项目目录内 Markdown，无任何外部网络调用；③ 越权——Shell 脚本仅在项目根目录内操作，有路径锁定检查（canonicalize 验证，阻止 symlink 逃逸出项目）；④ 无 `curl|bash`、无远程代码执行、无 base64 混淆；⑤ 描述与行为一致，SHA-256 证明 / Nonce 分隔符等机制与文档描述对应；⑥ 供应链为 Python + Shell + PowerShell / MIT，开源依赖、无私有来源；⑦ 无凭证窃取。

**风险评级**：🟢 低。

> 安全审查基于审查时（2026-07）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/OthmanAdi/planning-with-files)。
