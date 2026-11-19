---
title: "腾讯混元开源高效率多模态模型 Hy4 Flash：224B 总参数仅激活 12B，支持 100 万上下文、视觉理解与 GUI 桌面操控"
date: 2026-11-16
icat: 模型
source: "腾讯混元"
src: "https://hunyuan.tencent.com/"
tags: [腾讯混元, Hy4-Flash, 开源模型, 多模态模型, Computer-Use, 大模型]
summary: "继 11 月初发布 770B 旗舰模型 Hy4 后，腾讯混元于 11 月 16 日推出并全面开源高效率多模态模型 Hy4 Flash（含 Base 与 FP8 权重）：总参数 2240 亿（含 640 亿 Engram 记忆参数）、推理仅激活 120 亿参数，支持 100 万上下文、细粒度图表/图像视觉理解及图形界面（GUI）与终端操控，API 输入定价低至每百万 token 约 0.07 元。"
sources:
  - { name: "腾讯混元官网", url: "https://hunyuan.tencent.com/", tier: official }
  - { name: "Hugging Face Tencent", url: "https://huggingface.co/tencent", tier: official }
  - { name: "TechNode", url: "https://technode.com/", tier: media }
reason: "将原生视觉图表解析与 GUI 计算机操控能力下放至仅 12B 激活参数的开源权重模型中，为本地部署的演示文稿修改、设计资产批处理与跨软件自动化提供了极低成本底座。"
topics: [腾讯, 大模型, 智能体与工作流]
weight: 4
---

腾讯混元团队于 2026 年 11 月 16 日正式发布并在 GitHub、Hugging Face、魔搭（ModelScope）等平台全面开源新一代高效率多模态模型 Hunyuan Hy4 Flash（包含 `Hy4 Flash`、`Hy4 Flash-FP8` 与 `Hy4 Flash Base` 权重）。作为 11 月 4 日发布的 7700 亿参数旗舰模型 Hy4 的轻量化同源版本，Hy4 Flash 采用混合专家（MoE）架构，总参数量为 2240 亿（其中包含 640 亿 Engram 记忆模块参数），而在实际推理时仅激活 120 亿（12B）参数，并同样配备 100 万 token 上下文窗口。能力方面，Hy4 Flash 继承了 Hy4 原生集成的视觉理解与计算机操控（Computer-Use）特性，可直接解析复杂设计排版、数据图表与几何图形，并驱动图形用户界面（GUI）与命令行终端执行高频文档排版、幻灯片编辑和表格修复等工作流。其线上 API 输入定价低至每百万 token 约 0.07 元人民币（约 0.01 美元），上线首日即在 OpenRouter 日榜登顶并处理超 50 万亿 token。

> 将原生视觉图表解析与 GUI 计算机操控能力下放至仅 12B 激活参数的开源权重模型中，为本地部署的演示文稿修改、设计资产批处理与跨软件自动化提供了极低成本底座。
