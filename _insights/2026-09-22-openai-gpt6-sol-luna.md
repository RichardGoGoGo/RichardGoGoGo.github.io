---
title: "OpenAI 发布 GPT-6 Sol 与 GPT-6 Luna：API 每百万 token 定价分别为 $2/$10 与 $0.10/$0.50"
date: 2026-09-22
icat: 模型
source: "OpenAI API 更新日志 + 模型目录（官方）"
src: "https://developers.openai.com/api/docs/changelog"
tags: [OpenAI, GPT-6, Sol, Luna, 模型发布, API定价]
summary: "OpenAI 9 月 22 日在 API 上线 GPT-6 Sol 与 GPT-6 Luna 两款推理模型，支持文本和图像输入、文本输出。标准定价（输入 272K token 以内，每百万 token）：Sol 输入 $2、输出 $10；Luna 输入 $0.10、输出 $0.50。官方把 Sol 定位为兼顾能力与成本，Luna 面向成本敏感、调用量大的任务。"
sources:
  - { name: "OpenAI API 更新日志", url: "https://developers.openai.com/api/docs/changelog", tier: official }
  - { name: "OpenAI 模型目录", url: "https://developers.openai.com/api/docs/models", tier: official }
reason: "与 9 月 3 日发布的旗舰 GPT-6 Astra 组成三档；Luna 的输入价格约为 Astra 的百分之一，是估算批量调用成本的直接参照。"
topics: [OpenAI, 大模型]
weight: 3
editor_pick: true
---

OpenAI 于 9 月 22 日在 API 发布 GPT-6 Sol（gpt-6-sol）与 GPT-6 Luna（gpt-6-luna）。两款均为推理模型，接受文本与图像输入、输出文本，可通过 Responses API 与 Chat Completions API 调用。标准定价（输入不超过 272K token，每百万 token）：Sol 输入 $2、缓存输入 $0.20、输出 $10；Luna 输入 $0.10、缓存输入 $0.01、输出 $0.50。按官方模型目录的分工，复杂推理与编程用旗舰 GPT-6 Astra，兼顾能力与成本用 Sol，成本敏感、调用量大的任务用 Luna。9 月 25 日 OpenAI 修复了一个影响这两款模型图像理解的编码问题；9 月 29 日又发布了 GPT-6.1 Sol。

> Luna 的输入价格约为旗舰 Astra 的百分之一，给批量内容处理、分类抽取这类高频调用留出了成本空间。
