---
title: "anthropics/skills：Anthropic 官方 skill 合集"
date: 2026-06-24
source: "Anthropic（官方）"
url: "https://github.com/anthropics/skills"
tags: [开发, Skill, 官方]
summary: "Anthropic 官方 17 个核心 skill，涵盖 PPTX/DOCX/PDF/XLSX 文档处理、前端设计、算法艺术、MCP Builder、Web App 测试、Claude API 集成等。"
---

**简介**：Anthropic 官方 skill 合集，17 个核心 skill，涵盖 PPTX / DOCX / PDF / XLSX 文档处理、前端设计、算法艺术、MCP Builder、Web App 测试、Claude API 集成等。

**要点**：官方仓库，是 skill 生态的规范来源；`mcp-builder`（构建 MCP server）与 `webapp-testing`（Playwright）对开发工作直接有用；`pptx` 可与提纲编排类 skill 联用。

**活跃度**：154k★ / 41 commits。作者可信度：高（Anthropic 官方）。

**安全审查（七项客观事实，审查于 2026-06）**：① 无隐藏指令；② 全部本地文件操作，`webapp-testing` 仅测本地 localhost；③ 无越权；④ 无混淆 / 远程执行；⑤ 描述与行为一致；⑥ 官方仓库，依赖可信（markitdown、pptxgenjs、LibreOffice、Playwright）；⑦ 无凭证窃取。`pptx` 子 skill 标注 "Proprietary"。

**风险评级**：🟢 低。

> 安全审查基于审查时（2026-06）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/anthropics/skills)。
