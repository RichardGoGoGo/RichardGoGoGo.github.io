---
title: "baoyu-design：本地版「Claude Design」"
date: 2026-06-22
source: "JimLiu（宝玉）"
src: "https://github.com/JimLiu/baoyu-design"
risk: low
theme: [design-teaching, creative-web]
repo: "JimLiu/baoyu-design"
stars: 4211
pushed: 2026-09-23
stats_at: 2026-09-29
tags: [设计视觉, Skill, 原型]
summary: "本地产 UI mockup / 原型 / 幻灯片 / 线框图，输出全本地、无上传。"
---

**简介**：本地版「Claude Design」，产 UI mockup、原型、幻灯片、线框图。

**要点**：自包含 HTML（localhost 预览）、Figma `.fig` 离线解码、PPTX 走本地 Playwright；输出全本地、无上传。

**作者可信度**：高（宝玉 JimLiu）。

**来源说明（客观事实）**：README 自述本项目把 Anthropic 驱动 claude.ai/design 的设计技能 Claude Design 重新打包到本地 Agent 运行，并声明与 Anthropic 无隶属或背书关系；仓库标注 MIT 许可，但其中来自上游的提示词内容的授权情况，README 未作说明（references/upstream-sync/provenance.json 记录了提取过程）。核查于 2026-09-29。

**安全审查（客观事实）**：无 `curl|bash`、无凭证外传；联网仅必要的 GitHub 读取（`gh api` / sparse-checkout，记录 provenance）与 Google Fonts。

**风险评级**：🟢 低。

> 安全审查基于审查时（2026-06）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/JimLiu/baoyu-design)。
