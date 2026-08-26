---
title: "LTX-2.5开源：22B参数原生多镜头视频，6.8秒生成10秒720p，ComfyUI首日支持"
date: 2026-08-11
icat: 模型与工具
source: "Lightricks官方/VentureBeat/MarkTechPost/ComfyUI Wiki（多源）"
src: "https://venturebeat.com/technology/ltx-2-5-can-generate-a-10-second-ai-video-from-an-image-in-just-6-8-seconds-on-nvidia-superchips-and-its-open-weights"
tags: [LTX-2.5, Lightricks, 开源视频, 多镜头, ComfyUI, 4K HDR, 商用]
summary: "「Lightricks发布LTX-2.5开源权重，22B参数，原生多镜头生成，双NVIDIA GB200上6.8秒生成10秒720p视频，ComfyUI v0.32.0同日首日支持，年收入$10M以下商业免费。」"
pinned: true
pin_until: 2026-09-02
---

Lightricks于2026年8月11日发布LTX-2.5开源权重（HuggingFace `Lightricks/LTX-Video-2.5`）：22B参数视频扩散Transformer，使用Gemma 4 12B文本编码器处理复杂多角色提示词；核心突破是原生多镜头（multi-shot）生成——单次推理即可输出跨镜头角色、灯光和运动风格前后一致的多段视频序列；新增扩散视频解码器替代VAE，双NVIDIA GB200上仅需6.8秒生成10秒720p视频；支持4K HDR输出；ComfyUI v0.32.0当日提供Day-0原生支持；年收入$10M以下企业商业免版税。

> 开源权重、商业免版税授权与ComfyUI首日集成的组合，使多镜头视频生成能力可直接在本地工作流中使用，6.8秒/10秒的生成速度将AI视频的迭代摩擦降至接近实时演示级别。
