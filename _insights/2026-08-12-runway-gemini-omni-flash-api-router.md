---
title: "Runway接入Gemini Omni Flash并推出API Model Router，实现跨模型自动路由"
date: 2026-08-12
icat: 模型与工具
source: "Runway官方"
src: "https://runwayml.com/"
tags: [Runway, Gemini, API Router, 模型路由, 视频生成]
summary: "「Runway新增Gemini Omni Flash接入并推出API Model Router，根据任务类型自动选择最优底层视频模型」"
---

Runway于8月12日在平台接入Google Gemini Omni Flash视频生成能力，同时推出API Model Router功能：开发者通过Runway API调用视频生成时，Model Router根据任务参数（分辨率、时长、风格描述、成本预算）自动在Runway Gen-4、Gemini Omni Flash等底层模型间进行路由选择，无需手动指定模型版本。这一机制将底层模型差异对开发者透明化，降低了在多模型生态中构建视频生成应用的复杂度。

> API Model Router将视频生成的模型选择从"开发者决策"转移至"平台智能调度"，是AI视频生成基础设施走向统一抽象层的进展。
