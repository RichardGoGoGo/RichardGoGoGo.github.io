---
title: "Google 于 8 月 17 日关闭全部 Imagen 4 API，Figma 插件/Zapier 工作流静默失效，强制迁移至 Nano Banana"
date: 2026-08-17
icat: 模型与工具
source: "Google Firebase 官方文档"
src: "https://firebase.google.com/docs/ai-logic/imagen-models-migration"
tags: [Google, Imagen, Nano Banana, API退役, Figma插件, 工具迁移]
summary: "Google 于 2026-08-17 关闭全部 Imagen 4 系列 API，调用旧端点的 Figma 插件/Zapier/Make 工作流无声停摆，需主动迁移至 Gemini 3.x 图像族（Nano Banana）。"
---

Google 于 2026 年 8 月 17 日全面关闭 Imagen 4 系列 API（imagen-4.0-generate-001 / ultra / fast），切换至 Gemini 3.x 图像族（Nano Banana）；API 调用方式从专用接口改为通用 Gemini content-generation 接口（modality=image）；调用旧 Imagen 端点的 Figma 插件、Zapier、Make、n8n 及小型 SaaS 工具无声停摆，受影响用户须主动重写 SDK 调用逻辑并迁移端点。

> API 迁移事件提示集成第三方 AI 服务的工作流需持续关注服务端的版本策略，选择开源/本地部署方案可降低此类不可控风险。
