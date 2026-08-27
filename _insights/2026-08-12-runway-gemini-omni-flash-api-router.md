---
title: "Runway 更新 API 路由：引入 Gemini Omni 与 Flash 多模态模型，智能选择最优生成后端"
date: 2026-08-12
icat: 模型与工具
source: "Runway Changelog"
src: "https://runwayml.com/changelog"
tags: [Runway, Gemini, API路由, 多模态, 视频生成, 平台更新]
summary: 「Runway 在 API 更新中引入 Gemini Omni 与 Flash 模型作为多模态输入处理后端，并启用智能路由机制根据任务类型自动选择最优生成引擎。」
---

Runway 在 2026 年 8 月更新中对其 API 架构进行升级：引入 Gemini Omni 与 Gemini Flash 作为多模态输入理解层，负责解析用户上传的图像、视频参考与复杂文本描述，再将结构化指令路由至 Runway 自研视频生成模型完成最终输出；智能路由机制根据任务类型（文本到视频、图像到视频、风格迁移等）及分辨率要求自动选择计算成本最优的生成后端，在保持质量的前提下降低平均 API 调用成本。

> Runway 将 Gemini 系列模型纳入 API 路由层的做法，展示了平台型视频生成服务通过外部大模型增强输入理解能力的混合架构路径，而非在全栈自研与全栈外包之间非此即彼。
