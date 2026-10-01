---
title: "humanize-ppt：AST 化 PPT 提纲编排 skill"
date: 2026-06-24
source: "LearnPrompt"
src: "https://github.com/LearnPrompt/humanize-ppt"
risk: medium
theme: [design-teaching]
repo: "LearnPrompt/humanize-ppt"
stars: 963
pushed: 2026-07-31
stats_at: 2026-10-01
tags: [设计视觉, Skill, PPT]
summary: "把 70 多篇 TED 演讲的叙事方式提炼成「观众状态转移」（AST）提纲的 PPT 编排 skill，仅产渲染 Brief、不直接出 HTML，依赖下游出图 skill。"
---

**简介**：PPT 提纲编排 skill。作者用 70 多篇 TED 演讲提炼出「观众状态转移」（AST，Audience-State-Transfer）的叙事方法，每页都要推动观众理解一个概念，仅产出渲染 Brief、不直接生成 HTML，依赖下游 PPT / 出图 skill 渲染；v1.0.0 于 2026-06-19 发布。

**要点**：「Brief-only」设计清晰分离职责；本体声明「Zero APIs, zero Keys」（不调外部 API）。

**作者可信度**：中（有 AI 教育背景）。

**安全审查（七项客观事实，审查于 2026-06）**：① 无隐藏指令；② 本体声明「zero APIs, zero Keys」，仅写本地 Brief 文件——下游 image-gen / ppt-skill 等需另行审查；③ 无系统命令执行；④ 安装走 `npx skills add LearnPrompt/humanize-ppt`（npm 远程包），需审 npm 依赖链；⑤ 描述与行为一致；⑥ 下游依赖（ppt-skill、image-gen、frontend-slides）未在本次审查范围；⑦ 无凭证窃取。

**风险评级**：🟡 中（本体干净；下游依赖链未全审，npx 安装拉远程代码）。

> 安全审查基于审查时（2026-06）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/LearnPrompt/humanize-ppt)。
