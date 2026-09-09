---
title: "LLaDA-Image：扩散语言模型驱动的统一图文生成，HuggingFace日榜第一（开源）"
date: 2026-09-06
icat: 研究与论文
source: "HuggingFace Daily Papers"
src: "https://huggingface.co/papers/2409.02392"
tags: [LLaDA, 扩散语言模型, 统一图文生成, 开源, 掩码扩散, 多模态]
summary: "「LLaDA-Image将扩散语言模型扩展至图像生成，通过统一掩码扩散架构同时处理文本和视觉token，权重开源，HuggingFace日榜9月6日第一」"
---

LLaDA-Image将扩散语言模型（LLaDA）框架扩展至图像生成领域：通过统一的掩码扩散（Masked Diffusion）架构同时处理文本和视觉token，实现图文理解与生成的统一建模，无需独立的视觉编码器。这一架构与当前主流的"文本LLM+独立图像Diffusion模型"分离式架构形成对比，将图文处理整合为单一模型框架。权重完全开源，发布当日在HuggingFace日榜排名第一。

> 统一图文扩散模型是生成式AI架构演进的前沿研究方向，LLaDA-Image提供了一个可供研究者参考的开源实现，对探索多模态模型设计原理有直接学术价值。
