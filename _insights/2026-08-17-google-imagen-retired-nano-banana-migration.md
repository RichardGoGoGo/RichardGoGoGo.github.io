---
title: "Google于8月17日关闭全部Imagen 4 API，Figma插件/Make/Zapier工作流静默失效，强制迁移至Nano Banana"
date: 2026-08-17
icat: 模型与工具
source: "Google Firebase官方文档/ud.hk"
src: "https://firebase.google.com/docs/ai-logic/imagen-models-migration"
tags: [Google, Imagen, Nano Banana, API退役, Figma插件, 工具迁移, 生态影响, Gemini]
summary: 「Google于2026-08-17关闭全部Imagen 4系列API，全线切换至Gemini 3.x图像族（Nano Banana），调用Imagen端点的Figma插件/Zapier/Make/n8n及大量第三方工具静默停摆，用户须主动迁移端点+重写SDK调用逻辑」
---
Google 于 2026-08-17 关闭全部 Imagen 4 系列 API（imagen-4.0-generate-001 / ultra / fast），全线切换至 Gemini 3.x 图像族（Nano Banana）；API 调用方式从专用接口改为通用 Gemini content-generation 接口（modality=image）；调用 Imagen 端点的 Figma 插件、Zapier、Make、n8n 及大量小 SaaS 工具无声停摆；受影响用户须主动完成端点迁移并重写 SDK 调用逻辑，官方迁移文档已发布。

> Imagen 4 的静默退役事件是"平台 API 依赖风险"的典型案例，对使用 Figma 插件/自动化工作流生成图像的工作流有直接影响；也是 AI 工具选型时优先考虑开源/本地部署方案以规避依赖断层风险的现实论据。
