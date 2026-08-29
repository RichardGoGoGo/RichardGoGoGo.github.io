---
title: "ComfyUI v0.32.0+v0.33.1：内置SageAttention级注意力零安装+LTX-2.5原生+MiniMax Music 3生歌（5分钟）+CUDA Graph"
date: 2026-08-11
icat: 模型与工具
source: "ComfyUI官方GitHub/ComfyUI Wiki/blog.comfy.org"
src: "https://github.com/comfy-org/ComfyUI/releases"
tags: [ComfyUI, v0.32.0, v0.33.1, LTX-2.5, MiniMax Music 3, CUDA Graph, SageAttention, 推理加速, AI音乐]
pinned: true
pin_until: 2026-09-05
summary: 「ComfyUI v0.32.0（8/11）内置comfy-kitchen attention后端达SageAttention级速度无需额外安装+LTX-2.5原生支持；v0.33.1（8/13）新增MiniMax Music 3节点（文生5分钟含结构完整歌曲）+CUDA Graph计算图缓存加速」
---
ComfyUI v0.32.0（8/11）新增内置 comfy-kitchen attention 后端，推理速度达 SageAttention 级别且无需额外安装配置，同时原生支持 LTX-2.5（含 STG 和双 CFG 调度）、MiniMax H3 VAE 修复、Qwen Image 3.0 及 Grok Imagine 2.0 合作节点更新。v0.33.1（8/13）新增 MiniMax Music 3 原生节点支持，可本地生成最长 5 分钟含完整段落结构（前奏/主歌/副歌/桥段/尾奏）的歌曲，同时引入原生 CUDA Graph 支持（与动态显存机制互操作）。

> 两次更新合计：推理提速（SageAttention 级无需手动安装）+最新视频模型支持（LTX-2.5）+本地 AI 音乐生成（MiniMax Music 3，完整歌曲结构，可为 AI 视频/动画自动配乐）；三合一升级意味着 ComfyUI 本地工作流已覆盖视觉→视频→音乐的创作全链路。
