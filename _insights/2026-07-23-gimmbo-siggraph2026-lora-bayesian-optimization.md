---
title: "SIGGRAPH 2026 最佳论文 GimmBO：偏好贝叶斯优化替代手动 LoRA 权重滑块，自动探索多风格混合空间"
date: 2026-07-23
icat: 研究与论文
source: "ACM SIGGRAPH Blog / GitHub(squidrice21/gimmbo) / arXiv"
src: "https://gimmbo-project.github.io/"
tags: [SIGGRAPH 2026, LoRA, 贝叶斯优化, 风格混合]
summary: "「多伦多大学与 Vector Institute 提出的 GimmBO 荣获 SIGGRAPH 2026 最佳论文奖，用偏好贝叶斯优化替代手动 LoRA 权重滑块调节，代码已开源。」"
---

多伦多大学与 Vector Institute 提出的 GimmBO 框架荣获 SIGGRAPH 2026 最佳论文奖（大会于 7 月 19—23 日在洛杉矶举行）。该方法以偏好贝叶斯优化（PBO）替代手动调节 LoRA 适配器权重滑块：用户仅需对 A/B 两图做主观偏好选择，系统即自动在多个自定义生成风格与内容的混合权重空间中寻优。框架可扩展至大规模 LoRA 集合浏览与内容组合，代码已在 GitHub（squidrice21/gimmbo）开源，论文同步挂于 arXiv（2601.18585）。

> 将 LoRA 风格调参从拖动滑块变为选择 A 或 B，为无工程背景的设计师参与生成模型风格定制提供了可行路径。
