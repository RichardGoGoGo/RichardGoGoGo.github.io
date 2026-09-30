---
title: "ComfyUI v0.38.0：原生支持面向设计版式的 Ming Image 0.1 Design，Seedance 2.5 新增 480p 草稿模式，移除已停服的 Sora 节点"
date: 2026-09-29
icat: 产品
source: "ComfyUI 官方更新日志"
src: "https://github.com/Comfy-Org/ComfyUI/releases/tag/v0.38.0"
tags: [ComfyUI, v0.38, Ming Image, Seedance, Seedream, 工作流]
summary: "ComfyUI v0.38.0（9 月 29 日）原生支持 Ming Image 0.1 Design（6B 文生图，面向文字密集的设计版式，可输出透明图）、MiniMax-H3 多条件 ControlNet、Qwen-Image 2.1 ControlNet 等；合作节点方面，Seedance 2.5 新增 480p 草稿模式、Seedream 节点加入 5.0 Flash，OpenAI 节点接入 GPT-6 Sol 与 Luna，已停服的 Sora 节点移除。"
sources:
  - { name: "ComfyUI GitHub Releases", url: "https://github.com/Comfy-Org/ComfyUI/releases/tag/v0.38.0", tier: official }
  - { name: "ComfyUI 官方更新日志", url: "https://docs.comfy.org/changelog", tier: official }
reason: "面向文字排版的开源生图模型和「先出草稿、再出正片」的视频渲染同时进入节点工作流，版式设计和视频预演都多了低成本的试错方式。"
topics: [ComfyUI, 图像生成, 视频生成]
---

ComfyUI 于 9 月 29 日发布 v0.38.0。开源模型方面，原生支持 Ming Image 0.1 Design（6B 参数文生图模型，面向文字密集的设计版式，可输出带透明通道的图像）、MiniMax-H3 Fun ControlNet Union 2.0（一次生成组合多个控制条件）、基于 Wan 2.1 与 VACE 的身份保持视频转视频 ID-V2V，以及 Qwen-Image 2.1 的 ControlNet 与用于快速预览的轻量 VAE。节点方面，色彩空间转换新增 LogC3 与 ACEScct 两种 HDR 色彩空间。合作节点方面，Seedance 2.5 新增草稿模式，先渲染 480p 快速预览，再用其任务 ID 驱动 1080p 正片渲染；Seedream 节点加入更快、成本更低的 Seedream 5.0 Flash，Pro 版最高分辨率提升到 4.62MP；OpenAI 对话节点加入 GPT-6 Sol 与 Luna；随着 Sora API 停服，Sora 视频节点已移除。

> 文字排版类开源生图模型和「先草稿、后正片」的视频渲染同时进入节点工作流，版式设计和视频预演都多了低成本的试错方式。
