---
title: "Google 发布高吞吐主力模型 Gemini 4 Hydrogen：支持 100 万上下文与四档思考深度，同步上线 Antigravity 多模型编排模式"
date: 2026-11-12
icat: 模型
source: "Google Blog"
src: "https://blog.google/technology/ai/"
tags: [Google, Gemini-4-Hydrogen, 大模型, 智能体, 原型开发]
summary: "Google 11 月 12 日推出高效率多模态模型 Gemini 4 Hydrogen，作为 Gemini 3.8 Flash 的继任者与 Gemini 4 Carbon/Argon 的轻量协同模型；支持 100 万 token 上下文与 low/medium/high/xhigh 四档可调思考深度，API 定价为每百万 token 输入 $1.50、输出 $7.50，并在 Google Antigravity 中引入与重型模型分工协作的 Orchestrator 模式。"
sources:
  - { name: "Google Blog", url: "https://blog.google/technology/ai/", tier: official }
  - { name: "GitHub Blog", url: "https://github.blog/changelog/", tier: official }
reason: "以低延迟、可调推理深度与每百万输入 $1.50 的平坦定价接棒 Flash 系列，并通过「重型模型做架构规划 + 轻量模型跑并行子智能体」的双模型编排模式提升交互原型与前端开发效率。"
topics: [Google, 大模型, 智能体与工作流]
weight: 4
editor_pick: true
---

Google 于 2026 年 11 月 12 日发布新一代高吞吐多模态主力模型 Gemini 4 Hydrogen（API 标识 `gemini-4-hydrogen`），接替此前的 Gemini 3.8 Flash，并与旗舰重型模型 Gemini 4 Carbon、Gemini 4 Argon 共同组成 Gemini 4 模型家族。Hydrogen 面向日常高频编码、快速交互原型构建与并行子智能体任务优化，支持 100 万 token 的输入与输出上下文窗口，并提供 `low`、`medium`、`high` 与 `xhigh` 四档可配置的思考深度参数。该模型即日起同步上线 Google AI Studio、Gemini API、Gemini 应用、GitHub Copilot 及 Google Antigravity 开发环境，API 在全上下文长度内实行统一费率（每百万输入 token 1.50 美元、每百万输出 token 7.50 美元）。在 Google Antigravity 中，官方同步推出全新的「Orchestrator」多模型编排模式，由 Gemini 4 Carbon 负责顶层架构推理与设计决策，再动态派发多个 Gemini 4 Hydrogen 子智能体并行完成代码实现与校验。

> 以低延迟、可调推理深度与每百万输入 \$1.50 的平坦定价接棒 Flash 系列，并通过「重型模型做架构规划 + 轻量模型跑并行子智能体」的双模型编排模式提升交互原型与前端开发效率。
