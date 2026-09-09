---
title: "ComfyUI v0.33.2+v0.33.3：FLUX Video超分节点、Fish Audio本地配音、Seedance 1080p支持"
date: 2026-08-20
icat: 模型与工具
source: "ComfyUI官方GitHub/ComfyUI Wiki"
src: "https://github.com/Comfy-Org/ComfyUI/releases"
tags: [ComfyUI, v0.33.2, v0.33.3, FLUX Video, 视频超分, Fish Audio, Seedance, 1080p]
summary: "「ComfyUI v0.33.2新增FLUX Video超分辨率节点（1.5x–3x），v0.33.3新增Fish Audio本地配音节点及Seedance 1080p原生分辨率支持」"
---

ComfyUI连续发布两个版本：v0.33.2（8月17日）新增FLUX Video超分辨率节点，支持对工作流中已生成的视频进行1.5x至3x超分处理，无需外部插件；v0.33.3（8月20日）新增Fish Audio本地音频处理节点（支持语音克隆和配音合成，本地运行不依赖API），以及Seedance 1080p原生分辨率支持（此前最高720p），同步修复了视频输出管线的兼容性问题。两次更新合计完成了"视频生成→视频超分→本地音频合成"三段管线的本地闭环。

> Fish Audio本地化运行打通了网络受限环境下AI视频配音的可能性，与视频超分结合，使ComfyUI工作流可在不依赖云端API的条件下完成视频生成到可交付成品的完整处理链。
