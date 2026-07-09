---
title: "eugeniughelbur/obsidian-second-brain：Obsidian AI 知识库"
date: 2026-07-09
source: "eugeniughelbur"
src: "https://github.com/eugeniughelbur/obsidian-second-brain"
tags: [取料, 知识管理, Obsidian, Skill]
summary: "把 Obsidian vault 变成 AI-first 第二大脑，40+ slash 命令覆盖笔记管理、语义搜索、网络研究与内容摄入，跨会话持久化、定时维护，支持多种 CLI。"
---

**简介**：以 Obsidian vault 为核心的 AI 知识库 skill，40+ 命令涵盖笔记自重写、本地 + 混合语义搜索、网络研究、X/YouTube/播客内容摄入、定时 agent 维护等；「活知识库」理念（更新自动全库传播），支持 Claude Code / Codex / Gemini 等多种 CLI。

**要点**：核心 vault 操作全本地（文件 + SQLite）；研究与内容摄入命令可选接入多个第三方 LLM。

**活跃度**：约 2.8–3k★ / 2026-07 更新（MIT）。作者：个人维护。

**安全审查（七项客观事实，审查于 2026-07）**：① 无隐藏指令，SKILL.md 为工作流操作手册；② 数据外泄需注意——研究 / 内容摄入命令会将查询或 vault 内容发往 xAI Grok、Perplexity、Google Gemini、YouTube Data API 等第三方服务（可选命令、文档透明披露），API key 存本地 `~/.config/` 不上传；③ `/obsidian-calendar schedule` 可写入 Google Calendar（高权限、需单独授权），其余为本地文件操作；④ 部分安装脚本走 `curl … | bash`，建议改用手动 git clone；⑤ 描述与行为一致，各外部依赖在 .env.example 列明；⑥ Python（uv / pip）管理，依赖公开；⑦ 无凭证窃取，API key 读自本地 .env。

**风险评级**：🟡 中（研究 / 摄入命令会将内容外传至境外 LLM；建议避开 curl|bash 安装、敏感内容不送外部）。

> 安全审查基于审查时（2026-07）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/eugeniughelbur/obsidian-second-brain)。
