---
title: "OpenAI 发布 GPT-6.1 Sol：官方称表现接近 Astra、成本更低，每百万 token 输入 $2、输出 $10，多智能体功能进入测试"
date: 2026-09-29
icat: 模型
source: "OpenAI API 更新日志 + GPT-6 模型指南（官方）"
src: "https://developers.openai.com/api/docs/changelog"
tags: [OpenAI, GPT-6.1, Sol, 模型发布, 多智能体]
summary: "OpenAI 9 月 29 日开发者日当天在 API 发布 GPT-6.1 Sol，面向复杂编程与专业工作，官方称表现接近 GPT-6 Astra、成本更低；标准定价（输入 272K token 以内，每百万 token）输入 $2、输出 $10，为 Astra 的五分之一，并以测试形式支持多智能体，可在一次 Responses API 请求中把任务分派给子智能体。"
sources:
  - { name: "OpenAI API 更新日志", url: "https://developers.openai.com/api/docs/changelog", tier: official }
  - { name: "OpenAI GPT-6 模型指南", url: "https://developers.openai.com/api/docs/guides/latest-model", tier: official }
  - { name: "TechCrunch", url: "https://techcrunch.com/2026/09/29/openai-launches-gpt-6-1-sol-says-it-nearly-matches-gpt-6-astra-and-costs-less/", tier: media }
reason: "Sol 档位一周内从 6 升到 6.1、输入输出价格不变，多智能体分派进入 API，拆分长流程任务的门槛随之降低。"
topics: [OpenAI, 大模型]
editor_pick: true
---

OpenAI 于 9 月 29 日开发者日当天在 API 发布 GPT-6.1 Sol（gpt-6.1-sol），面向复杂编程与专业工作，官方称其表现接近 GPT-6 Astra、成本更低。标准定价（输入不超过 272K token，每百万 token）：输入 $2、缓存输入 $0.10、缓存写入 $2.50、输出 $10，输入与输出价格与 9 月 22 日发布的 GPT-6 Sol 相同，是 GPT-6 Astra（输入 $10、输出 $50）的五分之一。GPT-6.1 Sol 以测试形式支持多智能体：在一次 Responses API 请求中，模型可以把工作分派给子智能体。按官方模型指南，GPT-6 家族现分三档：Astra 能力最强，GPT-6.1 Sol 兼顾速度、成本与能力，Luna 最快、成本最低；已在用 gpt-6-sol 的开发者需先查看迁移说明再切换。据 TechCrunch 报道，GPT-6.1 Sol 当天起向 ChatGPT Work 与 Codex 的 Plus、Pro、Business、Enterprise、Edu 用户开放，暂未进入普通对话；原先外界预期的 GPT-6.1 Astra 没有发布，OpenAI 前一天已因安全测试不达标取消了它的上线。

> 同价位的模型一周内迭代一版，并把多智能体分派放进 API，拆分长流程任务的门槛随之降低。
