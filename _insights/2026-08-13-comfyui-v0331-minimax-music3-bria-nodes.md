---
title: "ComfyUI v0.33.1：MiniMax Music 3、BRIA节点与CUDA图加速"
date: 2026-08-13
icat: 模型与工具
source: "Comfy-Org GitHub"
src: "https://github.com/Comfy-Org/ComfyUI/releases/tag/v0.33.1"
tags: [ComfyUI, MiniMax Music 3, BRIA, CUDA, H3, 节点更新]
summary: "ComfyUI v0.33.1发布，集成MiniMax Music 3音乐节点与BRIA编辑节点，CUDA图加速使推理吞吐量提升约20%-30%。"
---
Comfy-Org于2026年8月13日发布ComfyUI v0.33.1，核心更新为原生集成MiniMax Music 3音乐生成节点、BRIA图像编辑节点和CUDA图加速支持。CUDA图（CUDA Graphs）优化使GPU推理吞吐量在兼容工作流上提升约20%-30%；H3上下文感知节点（H3 Context Nodes）同步纳入，支持在多节点工作流中共享上下文状态。

> ComfyUI v0.33.1的CUDA图加速对大批量推理任务有直接性能收益，值得需要规模化本地推理的工作流开发者优先升级。
