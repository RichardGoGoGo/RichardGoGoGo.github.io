---
title: "JarvisHub开源：画布原生多模态Agent，三层架构支持复杂任务编排，arXiv:2607.23588"
date: 2026-08-01
icat: 研究与论文
source: "arXiv / GitHub (LYL1015/JarvisHub)"
src: "https://arxiv.org/abs/2607.23588"
tags: [JarvisHub, 多模态Agent, 画布原生, 三层架构, 开源, arXiv, 任务编排]
summary: "「JarvisHub在arXiv发布并开源，提出画布（Canvas）原生多模态Agent架构，通过感知层/规划层/执行层三层分离支持复杂多步任务编排，代码已公开于GitHub LYL1015/JarvisHub。」"
pinned: true
pin_until: 2026-09-02
---

JarvisHub在arXiv（arXiv:2607.23588）发布技术报告并同步开源代码（GitHub: LYL1015/JarvisHub），提出画布（Canvas）原生多模态Agent框架：感知层处理多模态输入，规划层在画布上构建任务依赖图，执行层并行调度子任务。框架设计目标为支持需要跨工具、跨模态协同的复杂任务，无需为每类任务单独定义工作流脚本。

> 将任务规划显式表示为画布图结构而非隐式提示链，是当前Agent框架在可解释性与调度效率上的一种设计取舍方向，适合需要审计Agent决策过程的应用场景。
