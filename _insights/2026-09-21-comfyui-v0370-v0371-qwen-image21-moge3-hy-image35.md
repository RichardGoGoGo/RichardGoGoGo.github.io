---
title: "ComfyUI v0.37.0/v0.37.1：原生支持 Qwen-Image 2.1 与 MoGe 3，新增腾讯 HY Image 3.5 Preview 合作节点"
date: 2026-09-21
icat: 产品
firsthand: true
source: "ComfyUI 官方"
src: "https://github.com/Comfy-Org/ComfyUI/releases/tag/v0.37.0"
tags: [ComfyUI, v0.37, Qwen-Image, MoGe3, HY-Image, 背景移除, 几何估计, 工作流]
topics: ["阿里巴巴", "ComfyUI", "图像生成"]
summary: "ComfyUI v0.37.0（9 月 21 日）原生支持 Qwen-Image 2.1（文生图、编辑、背景移除三个模板，可输出透明图）和 MoGe 3 单图几何估计；v0.37.1（9 月 22 日）新增腾讯 HY Image 3.5 Preview 文生图与编辑合作节点，编辑节点最多接 5 张参考图、原生 2K 输出。"
pinned: true
pin_until: 2026-10-05
editor_pick: true
deep: /deep/2026-09-21-comfyui-v037-qwen-image-moge3/
---

ComfyUI 于 9 月 21 日发布 v0.37.0，原生支持阿里 Qwen 团队 9 月 20 日发布的 Qwen-Image 2.1：同一模型完成文生图与编辑，可输出带透明通道的图像，官方提供文生图、图像编辑和背景移除三个模板；该模型采用 Qwen Research License，仅限非商业用途。同版本加入微软 MoGe 3 单图几何估计（ViT-L、ViT-g 两个检查点，可输出深度图与法线），并在检测到足够快的磁盘时自动启用快速加载。9 月 22 日的 v0.37.1 新增腾讯 HY Image 3.5 Preview 文生图与编辑合作节点：编辑节点可接 1–5 张参考图，原生最高 2K（选 4K 时由模型放大），在腾讯服务器上通过 API 运行。

> 透明图输出和背景移除进入节点工作流，抠图、叠加可以在同一条流程里完成；用 Qwen-Image 2.1 做商业项目前需要先确认许可。
