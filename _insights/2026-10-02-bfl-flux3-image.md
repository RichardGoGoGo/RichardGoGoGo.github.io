---
title: "Black Forest Labs 发布 FLUX 3 Image：用边界框排布画面，官方称多轮编辑不改动其他像素，最高 4K 输出"
date: 2026-10-02
icat: 模型
source: "Black Forest Labs 官方"
src: "https://bfl.ai/models/flux-3-image"
tags: [Black Forest Labs, FLUX 3, 图像生成, 图像编辑, 边界框]
summary: "Black Forest Labs 10 月 2 日发布 FLUX 3 Image，是 FLUX 3 系列的图像部分：可以在 0–1000 的坐标网格上为每个元素画边界框、逐框描述后整体生成，官方称多轮编辑不会改动其他像素；最多接 10 张参考图，输出最高 4K，支持文生图、图生图与文字渲染。API 到 10 月 8 日半价，企业可以授权商用权重，开放权重版本预计在未来几周推出。"
sources:
  - { name: "Black Forest Labs 官方", url: "https://bfl.ai/models/flux-3-image", tier: official }
  - { name: "Black Forest Labs 文档", url: "https://docs.bfl.ai/flux_3/flux3_image_overview", tier: official }
  - { name: "The Decoder", url: "https://the-decoder.com/black-forest-labs-launches-flux-3-image-with-multi-step-editing-that-leaves-the-rest-of-your-picture-alone/", tier: media }
  - { name: "TechTimes", url: "https://www.techtimes.com/articles/328502/20261002/black-forest-labs-launches-flux-3-image-json-bounding-boxes-lock-unchanged-pixels-numerically.htm", tier: media }
reason: "按区域排布、只改指定部分，适合版式、海报这类需要精确控制元素位置的设计工作。"
topics: [Black Forest Labs, 图像生成]
weight: 4
editor_pick: true
---

Black Forest Labs（BFL）于 10 月 2 日发布 FLUX 3 Image，是其多模态模型 FLUX 3 的图像部分。用法是先选画幅（画布按 0–1000 的坐标网格计），为画面里每个重要元素拖一个边界框并描述框内内容，再用一句话概括整个场景，模型按框生成；BFL 称之后的多轮编辑不会改动其他像素。模型支持文生图、图生图和文字渲染，最多可接 10 张参考图，输出分辨率从 768 到 4K，生成前还可以先做网页与图片搜索。据 The Decoder 报道，API 到 10 月 8 日半价，企业可以授权商用权重，在自己的设施上运行和微调，开放权重版本预计在未来几周推出。

> 按区域排布、只改指定部分，适合版式、海报这类需要精确控制元素位置的设计工作。
