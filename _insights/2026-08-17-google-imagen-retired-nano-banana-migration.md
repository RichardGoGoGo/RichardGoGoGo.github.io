---
title: "Google于8月17日关闭全部Imagen 4 API，Figma插件/Make/Zapier工作流静默失效，强制迁移至Nano Banana"
date: 2026-08-17
icat: 模型与工具
source: "Google Firebase官方文档 / ud.hk / clauding.de"
src: "https://firebase.google.com/docs/ai-logic/imagen-models-migration"
tags: [Google, Imagen, Nano Banana, API退役, Figma插件, 工具迁移, 生态影响]
summary: "Google于2026-08-17关闭全部Imagen 4系列API，全线切换至Gemini 3.x图像族（Nano Banana），调用旧端点的Figma插件/Zapier/Make等工具无声停摆，需主动迁移端点并重写SDK调用逻辑。"
---

Google于2026年8月17日关闭全部Imagen 4系列API（imagen-4.0-generate-001/ultra/fast），全线切换至Gemini 3.x图像族（Nano Banana）；API调用方式从专用接口改为通用Gemini content-generation接口（modality=image）；调用Imagen端点的Figma插件/Zapier/Make/n8n及大量小SaaS工具无声停摆；受影响用户须主动迁移端点并重写SDK调用逻辑。

> 这次API退役事件说明依赖闭源云端接口的工具链存在被动失效风险，对工具链可持续性的选型评估——尤其是开源/本地部署与云端API之间的权衡——有直接的参考价值。
