---
title: "Google Labs 开源 DESIGN.md：给 AI 编码智能体一份'看得懂'的设计系统说明"
date: 2026-06-29
icat: 模型与工具
source: "Google Labs / GitHub design.md / 腾讯云开发者"
src: "https://github.com/google-labs-code/design.md"
tags: [Google, DESIGN.md, 设计系统, AI编码, 设计token]
summary: "Google Labs 开源 DESIGN.md 格式规范，用 YAML 设计 token 加 Markdown 说明的双层结构，让 Claude Code、Cursor 等 AI 编码智能体持久、结构化地理解并遵循一套设计系统，解决 AI 生成界面视觉一致性差的问题。"
---

Google Labs 开源了一项名为 DESIGN.md 的格式规范（GitHub 仓库 google-labs-code/design.md），用于向 AI 编码智能体描述一套视觉身份（visual identity）。它的目标是给 AI 智能体一份对设计系统"持久、结构化"的理解，使其在生成界面时能自动获取并遵循设计约束，而不必每次都由人重新解释一遍。

## 它是什么、解决什么问题

大模型在前端生成上有个长期短板：很难稳定地抓住一个品牌的视觉精髓，生成的界面在颜色、字体、间距、组件风格上常常前后不一致。DESIGN.md 的思路，是把"抽象的设计语言"转成"AI 能理解并执行的结构化数据"。

其结构为双层：

- **YAML 前置数据（machine-readable）**：机器可读的设计 token，包含间距刻度（如 base/xs/sm/md/lg/xl）、颜色、字体、圆角，以及组件区块（为常见组件定义一组 token 以保证样式一致）。token 给出精确数值。
- **Markdown 正文（human-readable）**：人类可读的设计理据与指引，说明这些数值"为什么这样定、该如何应用"。

配套工具能对 DESIGN.md 做规范校验：检查 token 引用是否断裂、核对 WCAG 对比度、输出结构化 JSON 供智能体直接使用；还提供 export 命令把 token 转成其他格式（如 Tailwind 配置）。其 token 设计参考了 W3C Design Token Format。

## 横向与纵向定位

横向看，DESIGN.md 延续了"为 AI 智能体准备一份约定文件"的思路——正如用 README、AGENTS.md 一类文件给编码智能体提供项目上下文，DESIGN.md 把"设计系统"这一维度也补成了智能体可读的约定。与单纯的设计 token 规范（如 W3C Design Token Format）相比，它的特点是"token + 理据"双层并存：既给机器精确数值，也给智能体（和人）应用这些数值的理由。

纵向看，AI 编码智能体正从"能写出可运行的代码"，向"按既定设计系统一致地写"演进。早期的 AI 生成界面常被诟病"能跑但不像品牌该有的样子"；当设计约束被结构化、可校验、可持久引用，"设计与实现之间的一致性"就从依赖人工反复纠偏，变成可由规范和工具保障的环节。这与设计工具侧"设计⇌代码双向打通"的趋势，从不同方向指向同一目标。

> ⚠️ 待核实：DESIGN.md 的开源时间线与版本沿革（部分报道提及其与 Google Stitch 相关、更早已有雏形），以官方仓库与发布记录为准；与 Claude Code、Cursor 等具体智能体的集成方式，本文据公开资料概述，细节以官方文档为准；规范仍在演进，字段与工具能力可能随版本变化。

> DESIGN.md 把设计系统转为 AI 编码智能体可持久读取、可校验的结构化约定，指向"AI 生成界面的视觉一致性"这一长期痛点的工程化解法；对设计系统、人机协同设计与设计工程化方向的教学与研究，提供了一个开放、可分析的规范样本。

**参考来源**：
- Google Labs / design.md（GitHub 仓库）：https://github.com/google-labs-code/design.md
- DESIGN.md 规范文档（spec.md）：https://github.com/google-labs-code/design.md/blob/main/docs/spec.md
- AIToolly（中文报道）：https://aitoolly.com/zh/ai-news/article/2026-06-28-google-labs-introduces-designmd-a-new-format-specification-for-describing-visual-identities-to-ai-co
- Medium（开源走向行业标准的分析）：https://medium.com/design-bootcamp/google-makes-design-md-open-source-on-its-way-to-become-a-industry-standard-16119f2368dd
