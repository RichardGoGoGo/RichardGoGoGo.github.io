---
title: "Black Forest Labs 发布 FLUX 3 Image Klein 开放权重：5.6B 参数，INT8 版可在 8GB 显存显卡上运行"
date: 2026-10-15
icat: 模型
source: "Black Forest Labs 官方博客"
src: "https://bfl.ai/blog/flux-3-image-klein"
tags: [Black Forest Labs, FLUX 3, 开放权重, 图像编辑, ComfyUI, 本地部署]
summary: "BFL 10 月 15 日发布 FLUX 3 Image 的开放权重版 Klein：生成器 5.6B 参数，支持文生图、图像编辑和最多 10 张参考图，官方称与完整版共享原生 4K、精确编辑和边界框排布等能力；INT8 版可在 8GB 显存的 GeForce RTX 显卡上运行，ComfyUI 与 Diffusers 首日支持；年营收低于 500 万美元可免费商用，API 起价每张 1K 图 0.009 美元。"
sources:
  - { name: "Black Forest Labs 官方博客", url: "https://bfl.ai/blog/flux-3-image-klein", tier: official }
  - { name: "Hugging Face 模型页", url: "https://huggingface.co/black-forest-labs/flux-3-image-klein", tier: official }
  - { name: "ComfyUI 官方博客", url: "https://blog.comfy.org/p/flux-3-image-klein-in-comfyui-56b", tier: official }
  - { name: "ComfyUI 官方文档", url: "https://docs.comfy.org/tutorials/flux/flux-3-klein", tier: official }
  - { name: "VentureBeat", url: "https://venturebeat.com/technology/black-forest-labs-opens-flux-3-image-klein-weights-with-free-commercial-use-limited-to-smaller-businesses", tier: media }
reason: "FLUX 3 Image 的生成、编辑和多参考图能力有了可在 8GB 显存显卡上本地运行的版本，并能直接在 ComfyUI 中使用。"
topics: [Black Forest Labs, 图像生成]
weight: 4
deep: /deep/2026-10-15-bfl-flux3-image-klein/
editor_pick: true
---

Black Forest Labs（BFL）于 10 月 15 日发布 FLUX 3 Image Klein，是 10 月 2 日推出的 FLUX 3 Image 的开放权重版本。生成器为 5.6B 参数（不含文本编码器），支持文生图、图像编辑和最多 10 张参考图，BFL 称它与完整版共享原生 4K 生成、精确编辑和用边界框排布元素等核心能力。权重分基础模型（用于微调）和步数蒸馏模型（用于快速生成）两个检查点，另有 FP8、INT8、NVFP4 量化版，INT8 版可在 8GB 显存起的 GeForce RTX 显卡上运行；ComfyUI 和 Diffusers 首日支持。许可为 FLUX Kommunity License，年营收低于 500 万美元的个人和企业可免费商用，更大的机构需购买自托管许可或使用 API；API 起价为每张 1K 分辨率图 0.009 美元。BFL 称在内部评测中 Klein 领先参评的更大开放模型，目前没有独立测评。

> FLUX 3 Image 的生成、编辑和多参考图能力有了可在 8GB 显存显卡上本地运行的版本，并能直接在 ComfyUI 中使用。
