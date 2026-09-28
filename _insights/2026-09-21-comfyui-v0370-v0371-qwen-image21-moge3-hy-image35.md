---
title: "ComfyUI v0.37.0/v0.37.1：Qwen-Image 2.1 原生三模板 + MoGe 3 几何估计 + HY Image 3.5 Preview（5 参考图·2K 输出）"
date: 2026-09-21
icat: 模型与工具
source: "ComfyUI 官方"
src: "https://github.com/Comfy-Org/ComfyUI/releases/tag/v0.37.0"
tags: [ComfyUI, v0.37, Qwen-Image, MoGe3, HY-Image, 背景移除, 几何估计, 工作流]
summary: "「ComfyUI v0.37.0/v0.37.1 原生集成 Qwen-Image 2.1 三种生成模式节点，并接入 MoGe 3 单目几何估计与 HY Image 3.5 Preview 五参考图 2K 输出。」"
pinned: true
pin_until: 2026-10-05
---

ComfyUI v0.37.0 于 9 月 21 日发布，原生集成阿里 Qwen-Image 2.1，提供三个即用模板：文生图、图像编辑和背景移除，其中背景移除节点支持 alpha 通道输出；同日接入微软研究院 MoGe 3，在 ViT-L/ViT-G 骨干基础上增加稀疏体素精修，实现更精确的单目几何估计；Qwen3.5/3.8 文本编码器引入推测解码与 DeltaNet 内核加速；NVMe 快速磁盘加载降低本地多模型切换开销。次日发布 v0.37.1，合作节点新增 HunyuanVideo Image 3.5 Preview，支持最多 5 张参考图输入与原生 2K 输出。

> ComfyUI v0.37 将 Qwen-Image 2.1 的图像编辑与背景移除能力直接引入节点工作流，对教学中的设计稿处理与品牌一致性演示具有直接适用价值；MoGe 3 几何估计节点对建筑与三维课程的 AI 辅助深度分析有实质性补充。
