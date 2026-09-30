---
title: "Recraft 发布 V4.1 Flash：官方称中位生成时间 1.3 秒，ComfyUI 同日接入"
date: 2026-09-23
icat: 模型
source: "Recraft 官方博客"
src: "https://www.recraft.ai/blog/meet-recraft-v4-1-flash"
tags: [Recraft, V4.1 Flash, 图像生成, 生成速度, ComfyUI, 批量生产]
summary: "Recraft 发布图像模型 V4.1 Flash，官方称从提示词到出图的中位时间为 1.3 秒，并称其为目前最快的图像模型；同日 ComfyUI v0.37.2 把它作为 Recraft V4 文生图节点上更快、成本更低的选项接入。"
sources:
  - { name: "Recraft 官方博客", url: "https://www.recraft.ai/blog/meet-recraft-v4-1-flash", tier: official }
  - { name: "ComfyUI GitHub Releases", url: "https://github.com/Comfy-Org/ComfyUI/releases/tag/v0.37.2", tier: official }
reason: "出图延迟压到秒级，适合原型迭代、概念发散这类要大量试错的环节。"
topics: [图像生成, 设计工具]
---

Recraft 于 9 月 23 日发布 V4.1 Flash。官方博客称它是目前最快的图像模型，从提示词到出图的中位生成时间为 1.3 秒（在更大的提示词集上测得），并给出了与其他图像模型在同一组提示词下的对比。同日 ComfyUI v0.37.2 接入该模型，作为 Recraft V4 文生图节点上更快、成本更低的选项。

> 出图速度接近实时，设计流程里的试错方式会跟着变：原型迭代、概念发散这类高频、低精度的环节受益最明显。
