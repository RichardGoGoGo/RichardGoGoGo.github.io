---
title: "Ideogram 发布首个矢量模型 Ideogram Vector：文生矢量与图转矢量输出可编辑 SVG"
date: 2026-10-22
icat: 模型
source: "Ideogram 模型页"
src: "https://ideogram.ai/models/vector/"
tags: [Ideogram, Ideogram Vector, SVG, 矢量图生成, 图转矢量]
summary: "Ideogram 10 月 22 日发布首个矢量模型 Ideogram Vector（API 模型 ID ideogram-vector-1），可从文字提示生成可编辑 SVG，也可把位图转成 SVG，已在 Ideogram 应用和 API 上线。API 按每个 SVG 计价：文生矢量 0.13–0.20 美元（高档带参考图 0.32 美元），图转矢量 0.10 美元/张；图转矢量的图层分组功能尚不可用。"
sources:
  - { name: "Ideogram 模型页", url: "https://ideogram.ai/models/vector/", tier: official }
  - { name: "Ideogram 官方 X", url: "https://x.com/ideogram_ai/status/2113300317584720259", tier: official }
  - { name: "Ideogram API 文档", url: "https://developer.ideogram.ai/v2/api-reference/vectors/generate-svg", tier: official }
reason: "主流 AI 生图工具输出的多是位图，Ideogram Vector 直接给出可在矢量编辑器中单独修改形状和换色的 SVG，适合标志、图标、贴纸和印刷周边。"
topics: [图像生成, 设计工具]
weight: 4
deep: /deep/2026-10-22-ideogram-vector-1-svg/
pinned: true
pin_until: 2026-10-30
editor_pick: true
---

Ideogram 于 10 月 22 日发布其首个矢量模型 Ideogram Vector，API 模型 ID 为 `ideogram-vector-1`（媒体多称 Vector 1.0）。模型有两条路径：文生矢量用文字描述生成 SVG，可附参考图；图转矢量把 JPEG、PNG、WEBP 图像直接转成 SVG，分简单和细节两种模式。官方称输出带平滑渐变和清晰文字排版，可在矢量编辑器中单独选中、修改形状和整体换色。模型已在 Ideogram 应用和 API 上线。API 按每个 SVG 计价：文生矢量低、中、高三档为 0.13、0.16、0.20 美元，高档带参考图为 0.32 美元；图转矢量 0.10 美元/张。API 文档注明图转矢量的图层分组功能尚不可用，也没有对已生成 SVG 做局部修改的端点；目前没有独立测评。

> 主流 AI 生图工具输出的多是位图，Ideogram Vector 直接给出可在矢量编辑器中单独修改形状和换色的 SVG，适合标志、图标、贴纸和印刷周边。
