---
title: "Google于8月17日关闭全部Imagen 4 API，Figma插件/Make/Zapier工作流静默失效，强制迁移至Nano Banana"
date: 2026-08-17
icat: 模型与工具
source: "Google Firebase官方文档"
src: "https://firebase.google.com/docs/ai-logic/imagen-models-migration"
tags: [Google, Imagen, Nano Banana, API退役]
summary: "「Google于8月17日关闭全部Imagen 4 API，调用Imagen端点的Figma插件和自动化工作流静默失效，全线切换至Gemini 3.x图像族」"
---

Google于2026-08-17关闭全部Imagen 4系列API（imagen-4.0-generate-001/ultra/fast），全线切换至Gemini 3.x图像族（Nano Banana）；API调用方式从专用接口改为通用Gemini content-generation接口（modality=image）；调用Imagen端点的Figma插件/Zapier/Make/n8n等工作流静默失效，需手动迁移。

> 专用图像API向统一多模态API的整合，反映了Google将图像生成能力内嵌进Gemini生态的平台战略，同时对依赖Imagen API的第三方工作流造成直接影响。
