---
title: "阿里开源 Qwen-Image-2.1：7B 统一图像生成+编辑模型，原生 RGBA 透明通道，支持 10 图参考，首日同步 ComfyUI/Diffusers/vLLM"
date: 2026-09-20
icat: 模型与工具
source: "Qwen 官方博客 + GitHub + TechNode + Hugging Face（多源）"
src: "https://qwenlm.github.io/blog/qwen-image-2.1/"
tags: [Qwen, 阿里巴巴, 图像生成, 图像编辑, 开源, RGBA透明, 参考图像, ComfyUI, vLLM]
summary: "阿里开源 Qwen-Image-2.1，7B 参数统一图像生成与编辑模型，首次原生支持 RGBA 透明通道，最多 10 张参考图输入，发布首日可通过 ComfyUI、Diffusers、vLLM 调用。"
---

阿里巴巴于2026年9月20日开源 Qwen-Image-2.1，一个7B参数的统一图像生成与编辑模型。核心能力包括原生 RGBA 透明通道支持，可直接产出带透明度的 PNG 设计素材；最多10张参考图像同时输入，提升主题与风格一致性；发布首日同步支持 ComfyUI 节点、Diffusers 和 vLLM 推理框架；统一架构覆盖文生图、图像编辑、图像理解三类任务。模型权重、代码与数据全部开源，支持商用。

> 开源7B图像生成模型首次原生支持 RGBA 透明通道，使排版、品牌素材与 UI 元素生成可直接输出可合成的 PNG；10图参考的一致性控制为 IP 和角色设计课题提供工程层面的精确控制手段，高校服务器可直接部署。
