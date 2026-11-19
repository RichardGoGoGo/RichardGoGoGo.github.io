---
title: "阿里巴巴发布 2.4 万亿参数旗舰多模态模型 Qwen4-Max：支持 100 万上下文与多档深度思考，API 定价下调约 25%"
date: 2026-11-16
icat: 模型
source: "Alibaba Cloud"
src: "https://www.alibabacloud.com/"
tags: [阿里巴巴, 通义千问, Qwen4-Max, MoE, 多模态模型, 大模型]
summary: "阿里巴巴于 11 月 16 日正式发布 Qwen 4 系列旗舰多模态模型 Qwen4-Max，采用总参数 2.4 万亿、单 token 激活 710 亿参数的混合专家（MoE）架构并配备 3280 亿 N-gram 嵌入参数；支持 100 万 token 上下文与最高 26.2 万 token 输出，原生支持图像与视频理解及可调深度思考，API 定价降至每百万 token 输入 $1.50、输出 $4.50。"
sources:
  - { name: "Alibaba Cloud", url: "https://www.alibabacloud.com/", tier: official }
  - { name: "OpenRouter", url: "https://openrouter.ai/", tier: official }
  - { name: "VentureBeat", url: "https://venturebeat.com/", tier: media }
reason: "以 2.4T 稀疏 MoE 架构结合 100 万上下文与原生音视频多模态理解，将旗舰级长程智能体模型的调用成本压至每百万输入 $1.50。"
topics: [阿里巴巴, 大模型, 智能体与工作流]
weight: 4
editor_pick: true
---

阿里巴巴于 2026 年 11 月 16 日正式发布新一代旗舰多模态模型 Qwen4-Max（此前于 11 月 11 日上线 `qwen4-max-preview` 预览版），领衔全新的 Qwen 4 模型家族。架构方面，Qwen4-Max 基于重新设计的混合专家（MoE）架构，拥有 2.4 万亿（2.4T）主干参数，每次推理每 token 激活 710 亿（71B）参数，并额外结合 3280 亿 N-gram 嵌入参数；模型支持 100 万 token 上下文窗口与最高 262,144 token 的单次推理输出长度。功能上，Qwen4-Max 原生支持文本生成、图像输入与视频内容理解，默认开启内置深度思考（提供 `low`、`high`、`xhigh` 等可调推理强度档位），针对数小时级别的长程自主智能体任务、跨文件代码工程与多模态文档分析进行了专项优化。该模型以闭源商业 API 形式率先上线阿里云百炼（QwenCloud）、Qwen Studio 与 OpenRouter，定价为每百万输入 token 1.50 美元、每百万输出 token 4.50 美元（较上一代 Qwen 3.8-Max 下调约 25%）；官方同时表示 Qwen 4 家族的中小尺寸模型后续将继续开源。

> 以 2.4T 稀疏 MoE 架构结合 100 万上下文与原生音视频多模态理解，将旗舰级长程智能体模型的调用成本压至每百万输入 \$1.50。
