---
title: "RelightFormer：SIGGRAPH Asia 2026 多视角物体重打光生成式 Transformer，无需逆渲染"
date: 2026-09-10
icat: 研究与论文
source: "arXiv"
src: "https://arxiv.org/abs/2609.07414"
tags: [RelightFormer, 重打光, 生成式AI, SIGGRAPH Asia 2026]
summary: 「香港科技大学 vLAR 团队提出 RelightFormer，前馈生成式 Transformer 无需逆渲染，输入目标光照条件和多视角图像即可输出光照一致的多视角重打光结果，已被 SIGGRAPH Asia 2026 接收，权重开源。」
---

香港科技大学 vLAR 团队于 2026 年 9 月 10 日在 arXiv 发布 RelightFormer（2609.07414），一种前馈生成式 Transformer：输入目标光照条件与多视角图像，无需传统逆渲染流程，即可输出高质量、光照一致的多视角重打光结果；该论文已被 SIGGRAPH Asia 2026（2026 年 12 月，吉隆坡）接收，模型权重与代码在 HuggingFace（vLAR/RelightFormer）公开。

> 前馈架构无需对每个场景单独优化，使多视角一致的重打光从研究级工具向实际创作工作流迁移成为可能。
