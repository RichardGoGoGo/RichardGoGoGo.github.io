---
title: "ComfyUI v0.32.0+v0.33.1：内置SageAttention级注意力+LTX 2.5原生+MiniMax Music 3生歌（5分钟）+CUDA Graph"
date: 2026-08-11
icat: 模型与工具
source: "ComfyUI官方GitHub / ComfyUI Wiki / blog.comfy.org / freedom.tech"
src: "https://github.com/comfy-org/ComfyUI/releases"
tags: [ComfyUI, v0.32.0, v0.33.1, LTX 2.5, MiniMax Music 3, CUDA Graph, SageAttention, 推理加速, AI音乐, 本地创作]
summary: "ComfyUI v0.32.0新增内置comfy-kitchen attention后端（推理达SageAttention级别无需额外安装）+LTX 2.5原生支持；v0.33.1新增MiniMax Music 3本地生成最长5分钟完整歌曲+CUDA Graph原生支持。"
---

ComfyUI v0.32.0（8/11）新增内置comfy-kitchen attention后端，推理速度达SageAttention级别且无需额外安装配置；原生支持LTX 2.5（含STG和双CFG调度）、MiniMax H3 VAE与显存修复、Qwen Image 3.0及Grok Imagine 2.0合作节点更新。v0.33.1（8/13）新增MiniMax Music 3原生节点支持，可本地生成最长5分钟含结构性段落（前奏/主歌/副歌/桥段/尾奏）的完整歌曲，同时引入原生CUDA Graph支持（与动态显存机制互操作）。

> 两次更新合计：推理提速（SageAttention级无需手动安装）+最新视频模型支持（LTX 2.5）+本地AI音乐生成（MiniMax Music 3，完整歌曲结构），三合一升级使ComfyUI本地工作流覆盖视觉→视频→音乐的创作全链路。
