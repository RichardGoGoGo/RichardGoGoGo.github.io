---
title: "SIGGRAPH 2026 最佳论文 GimmBO：贝叶斯优化替代手动 LoRA 滑块，A/B 偏好点击自动探索风格混合空间"
date: 2026-07-23
icat: 研究与论文
source: "ACM SIGGRAPH Blog / arXiv"
src: "https://gimmbo-project.github.io/"
tags: [SIGGRAPH 2026, 最佳论文, LoRA, 贝叶斯优化, 风格混合, 生成模型, 开源]
summary: 「SIGGRAPH 2026 最佳论文 GimmBO 以偏好贝叶斯优化替代手动 LoRA 权重调节，用户 A/B 点击即可自动探索风格混合最优权重。」
---

多伦多大学 / Vector Institute / CMU 的 GimmBO（Generative Imagination Model by Bayesian Optimization）荣获 SIGGRAPH 2026 最佳论文奖，代码已开源（squidrice21/gimmbo）。方法核心：将多个生成图像模型的 LoRA 适配器权重空间作为搜索域，以用户对 A/B 两图的主观偏好点击作为采样信号，通过偏好贝叶斯优化（PBO）在稀疏人类反馈下高效探索最优权重组合，无需理解技术参数即可自动发现符合审美的风格混合点。

> GimmBO 把「LoRA 滑块调节」这一技术门槛最高的风格定制操作降级为「选哪张图更好看」，对希望在 AI 视觉创作课程中让非工程背景学生参与风格定制实验的教师有重要工具意义。
