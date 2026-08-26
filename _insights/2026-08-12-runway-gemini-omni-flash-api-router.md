---
title: "Runway接入Gemini Omni Flash并推出API Model Router，多模型动态路由优化成本与速度"
date: 2026-08-12
icat: 模型与工具
source: "Runway官方 / 科技媒体（多源）"
src: "https://runwayml.com/"
tags: [Runway, Gemini Omni Flash, API Router, 多模型路由, 视频生成, Google]
summary: "「Runway宣布接入Google Gemini Omni Flash模型，并推出API Model Router功能，根据任务复杂度与成本目标自动在多个模型间动态路由请求。」"
---

Runway宣布将Google Gemini Omni Flash集成至其平台模型池，并同步推出API Model Router功能：开发者通过单一API端点提交请求，Router根据任务类型、质量要求与成本预算自动将请求分配至最合适的底层模型（包括Runway自有模型与合作方模型）。该功能定位为降低多模型管理复杂度，同时优化推理成本与速度的平衡。

> 平台层Model Router将多模型选择的决策权从开发者端上移至平台层，对需要同时管控质量与成本的规模化视频生成应用有直接价值，但也带来了一定的模型选择透明度损失。
