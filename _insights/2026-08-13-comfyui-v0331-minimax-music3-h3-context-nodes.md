---
title: "ComfyUI v0.33.1：原生MiniMax Music 3文生乐（5分钟）+H3上下文重生成+Bria填充/扩图节点"
date: 2026-08-13
icat: 模型与工具
source: "ComfyUI官方GitHub/ComfyUI Wiki"
src: "https://comfyui-wiki.com/en/news/2026-08-13-comfyui-v0-33-1"
tags: [ComfyUI, v0.33.1, MiniMax Music 3, H3, Bria, 音乐生成, CUDA Graph, 本地工作流]
summary: 「ComfyUI v0.33.1加入MiniMax Music 3原生支持（最长5分钟含结构完整歌曲）、MiniMax H3 Context IR视频重生成节点、Bria GenFill/Eraser/Expand/Upscale四节点，原生CUDA Graph显著降低显存占用」
---
ComfyUI v0.33.1（2026-08-13）加入原生 MiniMax Music 3 支持：从歌词+描述文字生成最长 5 分钟结构完整歌曲（32kHz 立体声，含 MiniMax Music3 Text Encode 与 Empty Latent Audio 节点）；同步更新 MiniMax H3 Context IR & Regenerate 节点（视频片段上下文重生成）；新增 Bria GenFill（生成式局部填充）、Eraser（智能擦除）、Expand（画布扩展）、Upscale（超分）四项伙伴节点；引入原生 CUDA Graph 支持，显著降低推理显存占用。

> v0.33.1 将"视频生成+配乐"集成至同一 ComfyUI 工作流，文字→画面→视频→音乐的多媒体创作链路首次在本地画布上全线打通，是多媒体创作教学的关键工具节点。
