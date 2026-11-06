---
title: "Pika 发布开放权重视频模型 H3 Flex：基于 MiniMax H3 后训练，6 步降噪、同步生成 5 轨音频"
date: 2026-10-29
icat: 模型
source: "Hugging Face"
src: "https://huggingface.co/Pika-Labs/Pika-H3-Flex"
tags: [Pika, H3 Flex, 开放权重, 音视频同步, MiniMax H3]
summary: "Pika 10 月 29 日发布基于 MiniMax H3（33B）后训练与蒸馏的开放权重视频模型 H3 Flex，将降噪步数从 50 步压缩到 6 步，最快约 7 秒生成 15 秒视频，支持最多 12 个多模态参考输入并同步生成可拆分为 5 轨的 32kHz 立体声，权重已上传 Hugging Face。"
sources:
  - { name: "Hugging Face", url: "https://huggingface.co/Pika-Labs/Pika-H3-Flex", tier: official }
  - { name: "Pika", url: "https://pika.art/h3-flex", tier: official }
  - { name: "AlphaSignal", url: "https://alphasignal.ai/news/pika-drops-h3-flex-an-open-video-model-generating-audio-1-8x-faster", tier: media }
reason: "主流视频生成模型多为闭源，H3 Flex 以开放权重形式同时提供 6 步少步数出片、多参考控制与可拆分音轨的同步音频，可在自有算力与 ComfyUI 中直接部署。"
topics: [视频生成, 音频与音乐]
weight: 4
pinned: true
pin_until: 2026-11-11
editor_pick: true
---

Pika 于 10 月 29 日发布开放权重音视频生成模型 H3 Flex。该模型基于 MiniMax H3（33B 参数）架构，通过美学监督微调、步数蒸馏与偏好优化，将标准 50 步扩散降噪压缩至 6 步；Pika 称生成速度较此前提升约 1.8 倍，在原生 480p/768p（24fps）分辨率下最快约 7 秒可生成 15 秒视频，并可通过托管上采样输出 1080p、2K 与 4K。模型支持最多 12 个多模态参考文件（如最多 9 张图像、3 段动作参考视频及音频样本）以锁定角色、物体、风格与镜头调度；内置 32kHz 原生立体声同步生成，云端 API 支持将音频拆分为人声对白、配乐、音效、拟音与环境声 5 条独立分轨。模型权重与 Turbo LoRA 适配器已按 MiniMax H3 Community License Agreement 上传至 Hugging Face，可直接接入 Diffusers 与 ComfyUI。

> 主流视频生成模型多为闭源，H3 Flex 以开放权重形式同时提供 6 步少步数出片、多参考控制与可拆分音轨的同步音频，可在自有算力与 ComfyUI 中直接部署。
