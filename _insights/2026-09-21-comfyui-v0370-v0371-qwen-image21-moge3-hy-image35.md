---
title: "ComfyUI v0.37.0/v0.37.1：Qwen-Image 2.1原生三模板+MoGe 3几何估计+HY Image 3.5预览（5参考图·2K输出）"
date: 2026-09-21
icat: 模型与工具
source: "docs.comfy.org（官方）+ GitHub releases（多源 HOT）"
src: "https://github.com/Comfy-Org/ComfyUI/releases/tag/v0.37.0"
tags: [ComfyUI, v0.37, Qwen-Image, 背景移除, MoGe3, 几何估计, HY Image, 参考图, 2K输出, 工作流]
summary: "ComfyUI v0.37.0 原生集成 Qwen-Image 2.1 三模板（文生图/图编辑/背景移除）并引入 MoGe 3 几何估计节点；v0.37.1 新增 HY Image 3.5 Preview 支持五张参考图及原生 2K 输出。"
pinned: true
pin_until: 2026-10-02
---

ComfyUI v0.37.0（2026年9月21日）原生集成 Qwen-Image 2.1，提供文生图、图像编辑、背景移除三个即用模板，支持 alpha 通道输出与多图参考；同步引入微软研究院 MoGe 3 节点，提供精细单目几何估计（ViT-L/ViT-G + 稀疏体素精修）；新增 NVMe 快速磁盘加载（自动启用 `--fast-disk`），降低本地部署的模型切换摩擦。v0.37.1（9月22日）通过合作节点新增 HY Image 3.5 Preview，最多支持 5 张参考图输入，原生 2K 分辨率输出。

> Qwen-Image 2.1 的背景移除节点与多图参考能力，以及 HY Image 3.5 的五图参考原生 2K 输出，使 ComfyUI 的开箱即用创作一致性控制达到新水位，工作坊部署当天即可演示，课程实训直接可用。
