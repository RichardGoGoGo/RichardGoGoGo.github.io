---
title: "ComfyUI v0.44.0：MiniMax H3 编辑与长视频节点上线，新增 ProRes 视频导出与 VAE 计算精度控制"
date: 2026-11-04
icat: 产品
source: "ComfyUI GitHub"
src: "https://github.com/Comfy-Org/ComfyUI/releases/tag/v0.44.0"
tags: [ComfyUI, v0.44, MiniMax H3, ProRes]
summary: "ComfyUI 11 月 4 日发布 v0.44.0，加入 MiniMax H3 Max 系列视频编辑合作节点与 H3 开源模型配套支持，新增 ProRes 视频保存（可选色度二次采样）和独立的 VAE 计算 dtype 设置。"
sources:
  - { name: "ComfyUI GitHub", url: "https://github.com/Comfy-Org/ComfyUI/releases/tag/v0.44.0", tier: official }
  - { name: "ComfyUI Changelog", url: "https://docs.comfy.org/changelog", tier: official }
reason: "MiniMax H3 视频生成与编辑在开源节点工作流中进一步补齐，ProRes 导出让生成结果可以直接进入专业后期流程。"
topics: [ComfyUI, 视频生成]
weight: 3
---

ComfyUI 于 11 月 4 日发布 v0.44.0。合作节点方面，新增 MiniMax H3 Max 的 Recast、Extend、Reframe、Insert、Lip Sync 与 Camera Control 等视频编辑节点，以及 BFL Flux Video Upscale V2、VEED Dubbing 等视频超分与配音节点；开源模型方面，加入基于 MiniMax H3 的 P-H3-Image 图像模型、H3 潜空间超分模型、Sol-H3-VAE 加载，以及通过重叠上下文窗口生成更长 H3 视频的支持。此外，新增可单独设置的 VAE 计算 dtype 节点，并支持以 ProRes 格式保存视频、可选择色度二次采样方式。

> MiniMax H3 视频生成与编辑在开源节点工作流中进一步补齐，ProRes 导出让生成结果可以直接进入专业后期流程。
