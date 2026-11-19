---
title: "Google DeepMind 发布中坚模型 Gemini 4 Neon：衔接 Carbon 与 Hydrogen，支持百万上下文长解码与四档思考强度"
date: 2026-11-18
icat: 模型
source: "Google DeepMind"
src: "https://deepmind.google/"
tags: [Google, DeepMind, Gemini-4-Neon, 编程智能体, 大模型]
summary: "Google DeepMind 11 月 18 日发布 Gemini 4 家族中层主力模型 Gemini 4 Neon，定位介于重型模型 Carbon 与极速模型 Hydrogen 之间；支持 100 万 token 统一多模态上下文（默认 64K 同步输出，后台长解码可扩展至 100 万 token）与 Low/Medium/High/Extra High 四档思考深度，在编程智能体基准测试中位居榜首梯队，API 定价为每百万 token 输入 $3、输出 $15。"
sources:
  - { name: "Google DeepMind", url: "https://deepmind.google/", tier: official }
  - { name: "Google Blog", url: "https://blog.google/technology/ai/", tier: official }
  - { name: "Artificial Analysis", url: "https://artificialanalysis.ai/", tier: media }
reason: "补齐 Gemini 4 家族在重型架构推理与高频快速执行之间的中坚档位，以旗舰级模型约三成的价格与可调思考深度支撑复杂前端交互工程、多模态分析与多智能体纠偏。"
topics: [Google, 大模型, 智能体与工作流]
weight: 4
pinned: true
pin_until: 2026-11-28
editor_pick: true
---

Google DeepMind 于 2026 年 11 月 18 日推出 Gemini 4 模型家族的中层主力模型 Gemini 4 Neon，精准卡位此前发布的重型长程推理模型 Gemini 4 Carbon 与高吞吐轻量模型 Gemini 4 Hydrogen 之间。Gemini 4 Neon 面向复杂软件工程、智能体编码、多模态数据分析与科学计算工作流，拥有 100 万 token 的统一多模态上下文窗口（支持文本、图像、音频与视频混合输入），默认支持 64K token 同步输出，并可通过后台长解码（Background Long Decode）扩展至最高 100 万 token 输出。该模型提供 `Low`、`Medium`、`High`（默认）与 `Extra High（xhigh）` 四档可调节的思考深度；在开启 `xhigh` 模式时，其在 Artificial Analysis 综合智能指数中取得 61 分（位列全球前三），并在 Coding Agent 编程智能体专项榜中名列前茅，尤其在任务中途接受用户修正指令的可控性（Steerability）与低幻觉率方面表现突出。Gemini 4 Neon 即日起上线 Google AI Studio、Vertex AI、Gemini 应用（Pro/Ultra 订阅）以及 Google Antigravity IDE 与 CLI，标准 API 定价为每百万未缓存输入 token 3.00 美元、每百万输出 token 15.00 美元（缓存输入为每百万 token 0.15 美元）。

> 补齐 Gemini 4 家族在重型架构推理与高频快速执行之间的中坚档位，以旗舰级模型约三成的价格与可调思考深度支撑复杂前端交互工程、多模态分析与多智能体纠偏。
