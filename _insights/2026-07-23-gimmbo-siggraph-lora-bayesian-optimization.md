---
title: "SIGGRAPH 2026最佳论文GimmBO：贝叶斯优化替代LoRA手动调参，多伦多大学"
date: 2026-07-23
icat: 研究与论文
source: "SIGGRAPH 2026 官方 / ACM"
src: "https://s2026.siggraph.org/"
tags: [SIGGRAPH 2026, GimmBO, 最佳论文, 贝叶斯优化, LoRA, 超参数, 多伦多大学]
summary: "「多伦多大学GimmBO论文获SIGGRAPH 2026最佳论文奖，提出用贝叶斯优化方法替代LoRA手动超参数调节，实现扩散模型微调的自动化参数搜索。」"
---

多伦多大学团队提出的GimmBO方法获得SIGGRAPH 2026最佳论文奖（Best Paper Award）。GimmBO将贝叶斯优化框架引入扩散模型LoRA微调流程，自动搜索学习率、秩（rank）、权重等关键超参数的最优配置，替代此前依赖经验积累的手动调参过程，在多个微调任务上以更少迭代次数达到同等或更优的生成质量。

> 用自动化优化方法系统解决LoRA调参经验依赖问题，对缺乏大量微调经验的研究者和从业者有直接实用价值，也为扩散模型微调管线的标准化提供了方法论基础。
