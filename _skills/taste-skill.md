---
title: "Leonxlnx/taste-skill：前端「反 AI 味」设计规范 skill"
date: 2026-09-21
source: "Leonxlnx"
src: "https://github.com/Leonxlnx/taste-skill"
tags: [设计视觉, 前端, Skill]
summary: "全生态星标最高的民间设计 skill：13 个 skill 组合，通过 DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY 三参数调音台指导 AI 生成有品味的落地页、作品集与 redesign 原型，用 100+ 预检清单 + 9 大「AI 味」反模式清单规避默认模板感；纯 Markdown 规范、无运行时代码。"
---

**简介**：前端 anti-slop（反 AI 套路）设计框架，由 13 个 skill 组合而成（含 v1 legacy 与 v2 实验性重写）。通过三参数调音台（DESIGN_VARIANCE 设计变化度 / MOTION_INTENSITY 动效强度 / VISUAL_DENSITY 视觉密度）指导 AI 生成有品味的落地页、作品集与 redesign 原型，避免 AI 默认的模板感。

**要点**：主 SKILL.md 为纯 Markdown 设计规范（无可执行代码）+ 100+ 预检清单 + 9 大「AI 味」反模式清单；含 imagegen-frontend-web / mobile / brandkit 三个图像生成提示词变体；skill.sh 仅为本地注册表映射脚本、无网络调用；支持 Claude Code / Codex / Cursor / ChatGPT，`npx skills add` 安装。适合为工作坊课件、提案原型、官网组件生成更有设计感的前端 UI。文档明确 scope 边界（不适用于 dashboard / 数据表格等）。

**活跃度**：85,500★（全生态第一民间设计 skill）/ 更新至 2026-09-09（140+ commits，MIT）；作者 Leonxlnx 个人维护，85k★ 为超强社区验证。

**安全审查（七项客观事实，审查于 2026-09）**：① 无隐藏指令，SKILL.md 是设计规范文档、明确列出 scope 边界；② 数据外泄——SKILL.md + skill.sh 全本地，imagegen 子 skill 为纯提示词文档、未指定固定外部 API 端点；③ 越权——skill.sh 仅映射本地文件路径、无系统命令执行；④ 无 `curl|bash`、无网络调用、无 base64 混淆；⑤ 描述与行为一致，anti-slop 承诺由 100+ 预检 + 9 大反模式清单落实；⑥ 供应链为 `npx skills add`（标准 npm），npm 包内容建议引入前 `npm pack` 核查；⑦ 无凭证窃取。

**风险评级**：🟢 低（核心 SKILL.md 全为文档、无运行时风险；npm 包建议引入前验查）。

> 安全审查基于审查时（2026-09）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/Leonxlnx/taste-skill)。
