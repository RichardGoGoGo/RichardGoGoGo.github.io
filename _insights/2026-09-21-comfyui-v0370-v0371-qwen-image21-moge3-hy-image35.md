---
title: "ComfyUI v0.37.0/v0.37.1：Qwen-Image 2.1原生三模板+MoGe 3几何估计+HY Image 3.5预览（5参考图·2K输出）"
date: 2026-09-21
icat: 模型与工具
source: "docs.comfy.org"
src: "https://github.com/Comfy-Org/ComfyUI/releases/tag/v0.37.0"
tags: [ComfyUI, Qwen-Image, MoGe3, HY-Image]
summary: 「ComfyUI v0.37.0 原生集成 Qwen-Image 2.1 文生图/编辑/背景移除三模板，v0.37.1 新增 HY Image 3.5 Preview 五参考图·2K 输出与 MoGe 3 几何估计节点。」
pinned: true
pin_until: 2026-10-03
---

ComfyUI v0.37.0（2026-09-21）原生集成 Qwen-Image 2.1，提供文生图、图像编辑、背景移除三个即用模板，支持 alpha 通道输出与多图参考；MoGe 3（微软研究院）节点接入精细单目几何估计（ViT-L/ViT-G + 稀疏体素精修）；Qwen3.5/3.8 文本编码器引入推测解码+DeltaNet 内核加速；新增 NVMe 快速磁盘加载（Comfy-aimdo 0.5.5）。v0.37.1（2026-09-22）合作节点新增 HY Image 3.5 Preview：最多 5 张参考图输入、原生 2K 输出。

> Qwen-Image 2.1 三种生成模式开箱即用接入工作流，MoGe 3 几何估计与 HY Image 3.5 多参考图能力分别服务于 AI 辅助三维分析与风格一致性迁移场景；NVMe 快速加载降低本地部署的模型切换摩擦，是 ComfyUI 进入实训环境的实质性改进。
