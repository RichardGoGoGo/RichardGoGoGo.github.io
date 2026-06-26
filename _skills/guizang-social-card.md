---
title: "guizang-social-card：小红书图文 + 公众号封面出图 skill"
date: 2026-06-22
source: "op7418（归藏）"
src: "https://github.com/op7418/guizang-social-card-skill"
tags: [设计视觉, Skill, 配图]
summary: "小红书图文(1080×1440)+公众号封面对，Editorial/Swiss 两套视觉，HTML→PNG 直接出图。"
---

**简介**：小红书图文（1080×1440）+ 公众号封面对（21:9 + 1:1），Editorial / Swiss 两套视觉，28 版式 / 10 主题，HTML 渲染为 PNG。

**要点**：本地直接出图（Playwright 渲染 `node render.mjs`），免去「只给提示词、再手动去 MJ」的步骤。

**作者可信度**：高（归藏 op7418，知名 AI 设计博主）。

**安全审查（客观事实）**：无 `curl|bash`、无动态远程执行、无凭证读取、无隐藏指令；联网仅向 Unsplash / Pexels / Flickr / Wallhaven / Mapbox / OSM 取图，且自动记录 `SOURCES.md`，来源透明。

**风险评级**：🟢 低。

> 安全审查基于审查时（2026-06）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/op7418/guizang-social-card-skill)。
