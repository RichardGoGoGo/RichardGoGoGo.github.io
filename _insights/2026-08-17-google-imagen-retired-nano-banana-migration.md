---
title: "Google 正式关闭全部 Imagen 4 API：强制迁移至 Nano Banana（Gemini 3.x）图像生成接口"
date: 2026-08-17
icat: 模型与工具
source: "Firebase 官方文档"
src: "https://firebase.google.com/docs/ai-logic/imagen-models-migration"
tags: [Google, Imagen 4, Nano Banana, API迁移, Gemini, 产品退役]
summary: 「Google 于 2026 年 8 月 17 日关闭所有 Imagen 4 系列 API，开发者须迁移至基于 Gemini 3.x 架构的 Nano Banana 图像生成接口，官方迁移指南已发布。」
---

Google 于 2026 年 8 月 17 日正式停用全部 Imagen 4 系列 API（包括 Imagen 4、Imagen 4 Fast 与 Imagen 4 Ultra），所有依赖上述接口的应用须迁移至 Nano Banana 图像生成 API；Nano Banana 基于 Gemini 3.x 多模态架构，提供与 Imagen 4 功能上对等的文本到图像生成能力，同时新增多轮编辑与多模态参考输入支持。Google Firebase AI Logic 文档已更新迁移指南，包含 API 端点替换路径、参数映射表与常见兼容性问题说明。

> Imagen 4 API 的强制退役终结了 Google 在图像生成 API 层面的独立产品线，标志着其图像生成能力完全并入 Gemini 多模态生态统一入口，第三方开发者的适配工作量因此显著增加。
