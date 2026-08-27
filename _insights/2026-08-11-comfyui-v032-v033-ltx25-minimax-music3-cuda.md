---
title: "ComfyUI v0.32 / v0.33 发布：LTX 2.5、MiniMax Music 3 节点集成，CUDA 调度优化"
date: 2026-08-11
icat: 模型与工具
source: "GitHub"
src: "https://github.com/Comfy-Org/ComfyUI/releases"
tags: [ComfyUI, LTX 2.5, MiniMax Music 3, CUDA, 版本更新, 开源]
summary: 「ComfyUI v0.32/v0.33 连续发布，集成 LTX 2.5 视频生成与 MiniMax Music 3 音乐生成节点，并优化 CUDA 显存调度效率。」
---

ComfyUI 在 2026 年 8 月 11 日连续发布 v0.32 与 v0.33 两个版本，主要更新包括：新增 LTX 2.5 开源视频生成模型原生节点，支持 720p 高速生成与多镜头连续编排；集成 MiniMax Music 3 音乐生成节点，允许在视频生成工作流中直接调用音乐生成能力完成音视频联合输出；CUDA 内存调度逻辑重构，改善多模型并发场景下的显存碎片问题，在 16GB VRAM 环境下的稳定性有所提升。

> 音乐生成节点的引入使 ComfyUI 工作流首次覆盖音视频联合生成全链路，对需要在本地环境中完成完整多媒体内容生产的用户具有重要的工具整合价值。
