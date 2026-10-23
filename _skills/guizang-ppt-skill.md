---
title: "op7418/guizang-ppt-skill：歸藏的单文件网页 PPT skill（电子杂志风 / 瑞士风）"
date: 2026-10-20
source: "歸藏（op7418）"
src: "https://github.com/op7418/guizang-ppt-skill"
risk: medium
theme: [design-teaching, creative-web]
repo: "op7418/guizang-ppt-skill"
stars: 28496
pushed: 2026-08-07
stats_at: 2026-10-23
tags: [幻灯片, 演示, 设计视觉, Skill]
summary: "生成单文件 HTML 横向翻页的网页 PPT：「电子杂志 × 电子墨水」与「瑞士国际主义」两种风格，带 WebGL 背景、演讲者视图、观众屏同步和讲稿备注；先用 7 个问题澄清需求，再按叙事弧排页，交付前用脚本校验版式。AGPL-3.0。"
---

**简介**：歸藏出品的网页 PPT skill，生成单文件 HTML、横向翻页的演示文稿，有「电子杂志 × 电子墨水」和「瑞士国际主义」两种风格，带 WebGL 背景、演讲者视图、观众屏同步和讲稿备注。

**要点**：先用 7 个问题澄清风格、受众、时长、素材、截图、主题色和硬性约束，再按「钩子 → 定调 → 主体 → 转折 → 收束」的叙事弧安排页数和每页的明暗节奏；主题色只能从预设中选；瑞士风为锁定模式，正文只用登记过的 S01–S22 版式并规定最少版式种数；图片先判断用途（证据、照片、文字压图、多图组）再定比例与裁切；讲稿按页写目的、讲述和过渡，计划时长不超过实际时长的 90%；交付前用 validate-swiss-deck.mjs 静态校验，装有 Playwright 时再做渲染检查。AGPL-3.0（改作后对外提供网络服务须开源改动）。

**作者可信度**：高（歸藏 op7418，中文 AI 设计创作者；34 次提交，另有 2 位外部贡献者，有 CI、Issue 模板与贡献指南）。

**来源说明（客观事实）**：SKILL.md 正文和 HTML 注释里写有四家赞助方信息，每次加载都会进入上下文；同时要求不要写进生成的 PPT。

**安全审查（七项客观事实，审查于 2026-10）**：① 赞助内容混在 skill 指令中（见上），非隐藏指令，无 star、遥测或反馈指令；② 无外发代码，模板 JS 只用 localStorage 保存讲稿与偏好，观众屏同步用本机同源的 BroadcastChannel；③ 每次启动会在 skill 目录执行 git fetch 检查上游更新，经用户确认后才 git pull——不自动更新，但是一条远程更新通道；校验脚本在本地有 Playwright 时用 Chromium 打开本地 HTML，属正常用途；④ motion.min.js 为锁定版本 motion@11.11.17 的官方构建，无 fetch、eval，无 base64、curl|bash；⑤ 描述与行为一致，演讲者模式、同步、计时、激光笔均为纯前端实现；⑥ 供应链——生成的演示文稿运行时从 CDN 加载 Google Fonts、lucide@latest（版本未锁）和兜底的 motion，地图组件请求 OSM 瓦片，国内访问可能不稳定；⑦ 不读取环境变量、凭证或 ~/.ssh。

**风险评级**：🟡 中（偏低；2026-07 审查时为 🟢，之后新增了启动时的更新检查、赞助段落和未锁版本的 lucide）。

> 安全审查基于审查时（2026-10）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/op7418/guizang-ppt-skill)。
