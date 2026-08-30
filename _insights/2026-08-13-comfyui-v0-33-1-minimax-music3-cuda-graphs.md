---
title: "ComfyUI v0.33.1：原生支持MiniMax Music 3（文字→5分钟音乐）+Bria四项节点+CUDA Graphs加速"
date: 2026-08-13
icat: 模型与工具
source: "ComfyUI Wiki（单源）"
src: "https://comfyui-wiki.com/en/news/2026-08-13-comfyui-v0-33-1"
tags: [ComfyUI, v0.33.1, MiniMax Music 3, Bria, CUDA Graphs, 音乐生成]
summary: 「ComfyUI v0.33.1新增MiniMax Music 3原生节点（文字→最长5分钟完整歌曲）、Bria四项图像编辑伙伴节点，并引入原生CUDA Graphs计算加速」
---

ComfyUI v0.33.1于2026年8月13日发布，新增三类更新：原生MiniMax Music 3节点，支持从文字标题与歌词生成最长5分钟音乐（text-to-music），输出32kHz立体声；Bria伙伴节点四项，分别覆盖生成式局部填充（Generative Fill）、智能擦除（Eraser）、画布扩展（Expand Image）和分辨率提升（Increase Resolution）；以及原生CUDA Graphs支持，与动态VRAM管理互操作，进一步降低推理显存占用并提升吞吐。

> v0.33.1将音频创作能力直接并入ComfyUI本地工作流，使"图像→视频→配乐"的全链路创作在单一界面内成为可能。
