---
title: "Anthropic研究：移除80%系统提示词后Claude Code性能基本不变，上下文长度才是关键"
date: 2026-07-25
icat: 研究与论文
source: "Anthropic官方/机器之心（多源）"
src: "https://www.anthropic.com/research"
tags: [Claude Code, Anthropic, 提示词工程, 上下文, 研究]
summary: 「Anthropic实验发现删除80%系统提示词对Claude Code性能影响有限，有效上下文长度对表现更为关键」
---

Anthropic研究团队发布实验结果：在保留20%核心系统提示词的情况下，Claude Code的代码生成与任务完成能力与完整提示词版本差异有限；研究进一步发现，模型能有效处理的上下文长度（即真正"读懂"并利用的信息量）对性能的影响显著高于系统提示词的繁简程度，过长的提示词反而可能分散注意力。

> 这一发现对使用大型语言模型开发AI应用的工程师具有实践指导价值：精简提示词、优化有效上下文管理可能比堆砌指令更有效。
