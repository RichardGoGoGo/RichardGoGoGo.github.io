---
title: "Google于8月17日关闭全部Imagen 4 API，强制迁移至Nano Banana，Figma插件等工作流静默失效"
date: 2026-08-17
icat: 模型与工具
source: "Google Firebase官方文档/ud.hk"
src: "https://firebase.google.com/docs/ai-logic/imagen-models-migration"
tags: [Google, Imagen, Nano Banana, API退役, Figma插件, 工具迁移, 生态影响]
summary: 「Google于2026年8月17日关闭全部Imagen 4系列API，全线切换至Gemini 3.x图像族（Nano Banana），调用Imagen端点的Figma插件/Zapier/Make等工具无声停摆，须主动迁移。」
---
Google于2026年8月17日关闭全部Imagen 4系列API（imagen-4.0-generate-001/ultra/fast），全线切换至Gemini 3.x图像族（Nano Banana）；API调用方式从专用接口改为通用Gemini content-generation接口（modality=image）；调用Imagen端点的Figma插件/Zapier/Make/n8n及大量小SaaS工具无声停摆；受影响用户须主动迁移端点并重写SDK调用逻辑。

> Imagen 4退役是「平台方强制迁移」的典型案例，对依赖API的工作流（Figma插件/自动化工具链）产生无声中断，揭示了依赖闭源商业API的工具链维护风险，以及开源/本地部署路线在长期可持续性上的优势。
