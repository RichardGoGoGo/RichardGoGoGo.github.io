---
title: "Google于8月17日关闭全部Imagen 4 API，Figma插件/Make/Zapier工作流静默失效，强制迁移至Nano Banana"
date: 2026-08-17
icat: 模型与工具
source: "Google Firebase官方文档/ud.hk/clauding.de（官方+多媒体报道）"
src: "https://firebase.google.com/docs/ai-logic/imagen-models-migration"
tags: [Google, Imagen, Nano Banana, API退役, Figma插件, 工具迁移]
summary: 「Google于2026-08-17全线关闭Imagen 4系列API，切换至Gemini 3.x图像族Nano Banana，依赖Imagen端点的Figma插件及自动化工具工作流静默中断」
---

Google于2026年8月17日关闭全部Imagen 4系列API（含imagen-4.0-generate-001、ultra与fast版本），全线切换至Gemini 3.x图像族（Nano Banana）；API调用方式从专用接口改为通用Gemini content-generation接口（modality=image）。调用Imagen端点的Figma插件、Zapier、Make、n8n及大量第三方SaaS工具随之无声停摆，受影响用户需主动迁移端点并重写SDK调用逻辑。

> Imagen 4 API的静默下线说明，对单一闭源云端API的工作流依赖会带来不可预期的中断风险，评估工具链的可迁移性已成为AI创作工作流选型中的重要考量。
