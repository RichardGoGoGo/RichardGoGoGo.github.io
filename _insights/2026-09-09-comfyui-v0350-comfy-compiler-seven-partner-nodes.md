---
title: "ComfyUI v0.35.0：Comfy Compiler 加速与七个前沿模型官方合作节点一键接入"
date: 2026-09-09
icat: 模型与工具
source: "ComfyUI 官方 / ai-tldr.dev"
src: "https://docs.comfy.org/changelog"
tags: [ComfyUI, 工作流, 多模型, 3D生成]
summary: 「ComfyUI v0.35.0 引入 Comfy Compiler 内存加速，并新增 GPT-6、GPT Image 2.5、Claude Fable 5.1、Gemini Omni 1.1 等 7 个官方合作模型节点，同时扩展 3D 管线。」
pinned: true
pin_until: 2026-09-20
---

ComfyUI v0.35.0 于 2026 年 9 月 9 日发布，引入 Comfy Compiler 核心优化，削减 CUDA 内存分配开销、降低 VRAM 浪费，加速高负载工作流。本版新增 7 个官方合作模型节点：OpenAI GPT-6 Astra / GPT Image 2.5、Anthropic Claude Fable 5.1、Google Gemini Omni 1.1、MiniMax H3 Max Turbo、Recraft V4 Styles Pro、Meta Muse Image；3D 管线新增 Pixal3D Multi-View（清华×腾讯）和 SenseNova U1.5 多参考编辑（最多 10 张参考图），以及 VideoTrim / VideoCrop 新增编辑控件。

> 一个版本同时接入七个前沿生成模型，使 ComfyUI 工作流可在单一界面内对多个商业 API 和开源模型进行并排对比与链式调用。
