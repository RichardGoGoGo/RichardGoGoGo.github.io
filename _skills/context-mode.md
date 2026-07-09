---
title: "mksglu/context-mode：AI 编码上下文优化 MCP"
date: 2026-07-09
source: "mksglu"
src: "https://github.com/mksglu/context-mode"
tags: [开发, MCP, 上下文优化, Skill]
summary: "面向 AI 编码 Agent 的上下文优化 MCP server，沙箱执行工具输出（约 98% token 压缩）、SQLite 会话持久化、FTS5 知识索引，支持 17+ 平台。"
---

**简介**：AI 编码 Agent 的上下文优化 MCP server——沙箱执行工具输出（约 98% token 压缩）、SQLite 会话持久化、FTS5 知识索引，session 在 compaction 后可恢复；`ctx_execute` 支持 12 种语言代码执行（含 Shell），带项目边界控制；支持 Claude / Codex / Gemini / Cursor 等 17+ 平台，声称无遥测。

**要点**：`ctx_execute` 具备代码 / Shell 执行能力；启动时向 npmjs 查版本（升级提醒）。

**活跃度**：18,650★ / 2026-07-07 更新。作者：个人维护（TypeScript）。

**安全审查（七项客观事实，审查于 2026-07）**：① 无隐藏指令；② 启动时一次性向 npmjs.org 查版本（不含用户数据），`ctx_fetch_and_index` 按用户指令联网取内容，security.ts 经查无遥测；③ 越权风险——`ctx_execute` 支持 Shell 等 12 语言代码执行，若被 prompt injection 利用可在项目边界内执行任意代码（有边界控制但权限较重）；④ npm 安装，全量依赖链未逐一审查；⑤ server.ts 工具列表与 README 描述一致（已验证）；⑥ TypeScript/npm 个人维护，建议 `npm pack` 后人工审包；⑦ 无凭证窃取（security.ts 已验证）。

**风险评级**：🟡 中（`ctx_execute` shell 执行为高权限 + npm 供应链未全审；shell 执行建议限制或不启用）。

> 安全审查基于审查时（2026-07）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/mksglu/context-mode)。
