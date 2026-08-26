---
title: "Anthropic：移除80%系统提示词后Claude Code性能提升，大上下文并非越多越好"
date: 2026-07-25
icat: 观点与技巧
source: "Anthropic官方/The Decoder/VentureBeat（多源）"
src: "https://www.anthropic.com/"
tags: [Anthropic, Claude Code, 系统提示词, 上下文, 提示词工程, 性能优化]
summary: "「Anthropic工程团队发现将Claude Code系统提示词缩减80%后模型性能反而提升，揭示了大型提示词对模型注意力的干扰机制及精简上下文的优化方向。」"
---

Anthropic工程团队在Claude Code开发中发现：将系统提示词体积缩减约80%后，模型在代码生成和任务执行上的表现反而优于原有大提示词版本。实验揭示了过长提示词可能分散模型注意力、引入不必要干扰的现象；团队据此将提示词精简化作为性能优化的重要路径，并就"大上下文=更好性能"的直觉假设提出反驳证据。

> 提示词越长越好的直觉假设在实践中受到挑战，精简、聚焦的上下文设计对大模型性能的正向影响，对AI工具设计和提示词工程实践具有直接参考价值。
