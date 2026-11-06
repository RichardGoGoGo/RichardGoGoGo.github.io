---
title: "OpenAI 发布 ChatGPT Images 2.6：原生 GIF 生成与逐帧编辑、跨对话角色参考记忆，API 新增 Flare 与 Sunburst 模型"
date: 2026-11-04
icat: 模型
source: "PCMag"
src: "https://www.pcmag.com/news/chatgpt-rolls-out-images-26-model-with-support-for-gif-creation"
tags: [OpenAI, GPT-Image-2.6, GIF生成, SVG, 图像生成]
summary: "OpenAI 11 月 4 日向包含免费版在内的全体 ChatGPT 用户及 API 推出 Images 2.6 更新：支持由文字、照片或草图直接生成可调速、可逐帧修改的动态 GIF，可跨对话保存角色与宠物参考形象，整体出图提速约 50%；API 同步上线极速版 gpt-image-2.6-flare 与高精版 gpt-image-2.6-sunburst，并支持 SVG 矢量导出与局部圈选编辑。"
sources:
  - { name: "PCMag", url: "https://www.pcmag.com/news/chatgpt-rolls-out-images-26-model-with-support-for-gif-creation", tier: media }
  - { name: "Zee Business", url: "https://www.zeebiz.com/technology/news-openai-images-26-arrives-with-gif-creation-faster-image-generation-and-new-editing-tools-405181", tier: media }
  - { name: "OpenAI Release Notes", url: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes", tier: official }
reason: "主流对话式生图工具首次原生打通动态 GIF 逐帧调节、跨会话角色形象复用与 API 端 SVG 矢量输出，并以极速与高精双模型分流草稿与定稿场景。"
topics: [OpenAI, 图像生成, 设计工具]
weight: 4
pinned: true
pin_until: 2026-11-13
editor_pick: true
---

OpenAI 于 2026 年 11 月 4 日面向全部 ChatGPT 套餐（含免费用户）及开发者 API 推出 ChatGPT Images 2.6（底层为 GPT-Image-2.6 系列模型）。主要更新包括：一是原生动态 GIF 生成，用户可通过文字提示或上传照片、手绘草图直接生成循环动图，并在生成后调整 0.5x 至 2x 播放速度、查看图层或单独修改某一帧；二是跨对话参考形象保存，用户可将人物、角色或宠物保存为命名参考图，在后续对话中直接调用以保持角色一致性，无需重复上传；三是整体生成速度较上一代提升约 50%。开发者 API 端拆分为两款模型：`gpt-image-2.6-flare` 侧重低延迟，最快约 6 秒返回图像草稿；`gpt-image-2.6-sunburst` 侧重画面细节与多轮编辑一致性。API 同时新增 `complexity`（低/中/高）版式规划复杂度参数、画面圈选局部修改（Markup-Guided Edits）以及 SVG 矢量格式导出。

> 主流对话式生图工具首次原生打通动态 GIF 逐帧调节、跨会话角色形象复用与 API 端 SVG 矢量输出，并以极速与高精双模型分流草稿与定稿场景。
