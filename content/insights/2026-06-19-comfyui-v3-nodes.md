---
title: "ComfyUI 核心节点迁移 V3 架构，修复 FP8 scaled LoRA 问题"
date: 2026-06-19
icat: 模型与工具
source: "ComfyUI 更新日志"
url: "https://docs.comfy.org/zh/changelog"
tags: [ComfyUI, LoRA, 工作流]
summary: "ComfyUI 核心节点迁移 V3 架构，修复 FP8 scaled LoRA 问题。"
---

**发生了什么**

ComfyUI 把模型缩放、LoRA 提取/合成、潜空间操作等核心节点迁移到 V3 架构，并修复了 FP8 scaled LoRA 的问题，工作流的稳定性与扩展性提升。

**为什么值得关注**

与 LoRA 训练、自定义出图工作流直接相关；升级前建议先查看改动，避免旧工作流踩坑。
