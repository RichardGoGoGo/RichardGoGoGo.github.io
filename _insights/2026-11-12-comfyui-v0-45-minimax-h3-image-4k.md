---
title: "ComfyUI 发布 v0.45 并原生支持 MiniMax H3 Image：单图流统一文生图与多参考图编辑，6 步采样直出 4096×4096"
date: 2026-11-12
icat: 产品
source: "ComfyUI Blog"
src: "https://blog.comfy.org/"
tags: [ComfyUI, MiniMax-H3-Image, 图像生成, 图像编辑, 4K]
summary: "ComfyUI 于 11 月中旬更新至 v0.45 并上线原生 MiniMax H3 Image 节点支持：在单一模型权重与同一套工作流图中同时打通文生图与多参考图局部编辑，基于 CFG 蒸馏实现 6 步快速采样，原生支持最高 4096×4096（1600 万像素）分辨率输出，并与 H3 Video 共享 Qwen3-VL 文本编码器以节省显存。"
sources:
  - { name: "ComfyUI Blog", url: "https://blog.comfy.org/", tier: official }
  - { name: "ComfyUI GitHub Releases", url: "https://github.com/comfyanonymous/ComfyUI/releases", tier: official }
reason: "在节点式工作流中用单一模型同时解决原生 4K（16MP）生成与多参考图编辑，且与视频模型共用视觉语言编码器，显著降低了高分辨率图片转视频流水线的显存切换开销。"
topics: [ComfyUI, 大模型, 图像生成]
weight: 3
---

ComfyUI 于 2026 年 11 月中旬发布 v0.45 版本并原生集成 MiniMax H3 Image 图像生成与编辑模型节点。此次集成的核心特性在于「单模型双模态统一」：用户无需切换不同的检查点或搭建两套独立节点图，即可在同一个工作流中根据是否接入参考图像，无缝切换纯文本生图（Text-to-Image）与多参考图引导的局部重绘及主体编辑（Image Editing）。技术规格上，MiniMax H3 Image 采用 CFG 蒸馏技术，仅需 6 步采样即可完成高质量出图，并支持任意宽高比下最高 4096×4096（1600 万像素）的原生分辨率直出；此外，该模型与上周接入的 MiniMax H3 Video 共享同一个 Qwen3-VL 文本编码器，在本地或云端运行「4K 分镜生图 → 视频生成」串联工作流时无需重复加载编码器权重。

> 在节点式工作流中用单一模型同时解决原生 4K（16MP）生成与多参考图编辑，且与视频模型共用视觉语言编码器，显著降低了高分辨率图片转视频流水线的显存切换开销。
