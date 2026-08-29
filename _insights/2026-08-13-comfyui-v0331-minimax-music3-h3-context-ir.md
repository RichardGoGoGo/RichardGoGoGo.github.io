---
title: "ComfyUI v0.33.1：MiniMax Music 3原生支持（5分钟文生乐）+ H3 Context IR节点 + Bria四项节点"
date: 2026-08-13
icat: 模型与工具
source: "ComfyUI官方GitHub"
src: "https://github.com/Comfy-Org/ComfyUI/releases/tag/v0.33.1"
tags: [ComfyUI, v0.33.1, MiniMax Music 3, 音乐生成, H3, Bria, CUDA Graph, 本地工作流]
summary: 「ComfyUI v0.33.1新增MiniMax Music 3原生节点（歌词+描述→5分钟完整歌曲）、MiniMax H3 Context IR上下文重生成节点、Bria GenFill/Eraser/Expand/Upscale四项伙伴节点，原生CUDA Graph支持」
---
ComfyUI v0.33.1 于 8 月 13 日发布，新增 MiniMax Music 3 原生支持（从歌词+描述文字生成最长 5 分钟完整歌曲，含 Text Encode 与 Empty Latent Audio 节点）；更新 MiniMax H3 Context IR & Regenerate 伙伴节点（支持上下文感知视频片段重生成）；新增 Bria GenFill/Eraser/Expand/Upscale 四个伙伴节点；同时引入原生 CUDA Graph 计算图缓存支持，与动态 VRAM 机制互操作，进一步降低推理显存占用。

> v0.33.1 将音乐生成（Music 3）与视频生成（H3）在同一 ComfyUI 画布打通，使视频+配乐的本地全链路创作正式可行，是多媒体内容生产工作流的重要节点。
