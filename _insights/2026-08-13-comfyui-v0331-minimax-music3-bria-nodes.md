---
title: "ComfyUI v0.33.1：原生支持MiniMax Music 3（文字→5分钟音乐）+ Bria四项伙伴节点（填充/擦除/扩展/超分）"
date: 2026-08-13
icat: 模型与工具
source: "ComfyUI Wiki"
src: "https://comfyui-wiki.com/en/news/2026-08-13-comfyui-v0-33-1"
tags: [ComfyUI, v0.33.1, MiniMax Music 3, Bria, GenFill, 音乐生成, 图像编辑, 本地工作流]
summary: 「ComfyUI v0.33.1新增MiniMax Music 3原生节点（歌词文本→最长5分钟音乐）和Bria四项伙伴节点（GenFill局部填充/Eraser擦除/Expand画布扩展/Upscale超分），原生CUDA Graphs加速」
---
ComfyUI v0.33.1（2026-08-13）新增两组核心功能：① 原生 MiniMax Music 3 节点——从文字标题+歌词最长生成 5 分钟音乐（text-to-music，含 MiniMax Music3 Text Encode 与 Empty MiniMax Music3 Latent Audio 节点）；② Bria 伙伴节点四项——Generative Fill（生成式局部填充）、Eraser（智能擦除）、Expand Image（画布扩展）、Increase Resolution（超分辨率）；同时新增原生 CUDA Graphs 支持（推理加速+显存优化，与动态 VRAM 管理互通）。

> MiniMax Music 3 节点将"视频配乐"从两步操作变为 ComfyUI 画布内的一步节点调用，Bria 节点补齐图像后期编辑链路，两者合力使 ComfyUI 进一步覆盖 AI 多媒体创作的全链路场景。
