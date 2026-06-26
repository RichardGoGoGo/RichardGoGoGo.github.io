---
title: "Krea 2 技术报告：开源 12B DiT 图像模型，明确不使用 AI 生成图像预训练"
date: 2026-06-23
icat: 模型与工具
source: "Krea AI 官方"
src: "https://www.krea.ai/blog/krea-2-technical-report"
tags: [开源模型, Krea, 图像生成, LoRA]
summary: "Krea 发布 Krea 2 技术报告，推出 Raw（LoRA 微调基座）与 Turbo（8 步推理，约 2 秒生成）两个开放权重变体，明确训练数据中不使用 AI 生成图像，采用商业友好许可，ComfyUI v0.26.0 于发布当日接入。"
---

Krea AI 于 2026 年 6 月 23 日发布 Krea 2 开源图像模型技术报告，提供两个开放权重变体：Krea-2-Raw（未蒸馏基座版，适合训练 LoRA）与 Krea-2-Turbo（8 步蒸馏推理版，可在约 2 秒内生成高分辨率图像）；模型采用单流 Diffusion Transformer 架构，以 Qwen 3 VL 多层特征聚合作为文本编码器、Qwen Image VAE 与 FLUX 2 VAE 为自编码器；官方技术报告明确预训练数据中不包含 AI 生成图像，并自建分类器进行过滤；权重发布于 HuggingFace，代码开源于 GitHub，采用宽松商业许可，ComfyUI v0.26.0 于发布当日完成原生接入。

> 在合成数据被广泛用于训练的当下，Krea 2「不使用 AI 生成图像预训练」的数据立场及「反审美同质化」定位，为讨论开源图像模型训练路线与风格多样性提供了具体参照；开放权重与 ComfyUI 原生支持使其可直接本地部署。
