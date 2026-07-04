---
title: "Google 发布 Nano Banana 2 Lite 与 Gemini Omni Flash：4 秒出图、速度档质量反超更贵的专业档"
date: 2026-07-03
icat: 模型与工具
source: "Google 官方博客 / Gemini API 定价文档 / TechCrunch / VentureBeat"
src: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-omni-flash-nano-banana-2-lite/"
tags: [Google, NanoBanana, GeminiOmniFlash, AI图像, 图生视频]
summary: "Google DeepMind 于 6 月 30 日发布速度档图像模型 Nano Banana 2 Lite（约 4 秒出图，每张 1K 分辨率图约 $0.034，质量略超更贵的专业档）与视频模型 Gemini Omni Flash（图/文/视频转视频），并计划接入 Adobe Firefly。"
---

2026 年 6 月 30 日，Google DeepMind 发布图像模型 Nano Banana 2 Lite（模型 ID gemini-3.1-flash-lite-image）与视频模型 Gemini Omni Flash。前者定位速度档，约 4 秒出图；后者可从文本、图像、视频输入生成并对话式编辑视频。两款均已上线 Google AI Studio 与 Gemini API，并计划接入 Adobe Firefly。

## 价格口径先澄清

Nano Banana 2 Lite 的官方定价，是图像输出每百万 token 30 美元，折合**每张 1K 分辨率图约 0.0336 美元**（约合人民币两毛多）。需要特别厘清：官方与部分报道中的"$0.034 per 1K image"，其中 **"1K" 指的是 1K 分辨率（约 1024 像素）的单张图，而非 1000 张图**。此前包括多家自媒体在内曾将其误读为"每千张 0.034 美元"，从而得出"近乎免费"的结论——这一说法并不成立。按每张约 0.034 美元计，它与 Midjourney 等主流方案（约每张 0.01–0.05 美元）大致处于同一价格区间，属价格有竞争力，而非"成本断崖式下降"。

## 已知事实

- **定位与速度**：Gemini 图像体系分三档——专业档 Nano Banana Pro、均衡档 Nano Banana 2、速度档 Nano Banana 2 Lite；Lite 约 4 秒出图、延迟较上代降约 40%，强调提示词遵循、角色一致性与图内文字可读性。
- **质量**：据 VentureBeat 等报道，其文生图 Arena Elo 达 1251，高于上代 NB1 的 1151，甚至略高于更大、更贵的专业档 NB Pro（1245）——即以更低价格达到不输专业档的质量。
- **价格**：每张 1K 分辨率图约 0.034 美元（官方口径见上），主打高吞吐、批量工作流（批量出素材、测图变体、自动化管道）时的性价比。
- **渠道与集成**：Google AI Studio、Gemini API、Gemini Enterprise Agent Platform；消费侧接入 AI Mode in Search、Gemini App、NotebookLM、Google Photos、Stitch、Flow、Google Ads 等；并计划接入 Adobe Firefly。
- **Gemini Omni Flash**（gemini-omni-flash-preview）：从文/图/视频生成视频并对话式编辑，按输出计费、约合每秒 720p 视频 0.10 美元；当前公开预览有明确限制——最长约 10 秒、API 暂不支持音频参考与场景延展、视频参考仅接受约 3 秒且处理不完善、跨场景角色一致性仍有问题。

## 横向与纵向定位

横向看，Nano Banana 2 Lite 的真正差异不在"价格碾压"，而在"速度 + 单位价格内的质量"。它的每张价格与 Midjourney 等处于同一区间，谈不上便宜一个数量级；但它以速度档的定价，做到了质量略超自家更贵的专业档，并把出图时间压到约 4 秒——性价比和吞吐能力才是卖点。一个方向性的信号是：Google 计划把这两款模型接入 Adobe Firefly，即把自家模型供给一个竞品平台，延续了 Firefly"聚合多家外部模型"的策略，说明模型正越来越像可被各平台随取随用的底层组件。

纵向看，AI 图像生成的竞争重心，正从早期的"画质比拼"转向"速度、吞吐与集成"，并向"图像→视频"接力延伸——Nano Banana 2 Lite 负责快速出图，Gemini Omni Flash 承接把静态图转为带运镜的短视频，两者被设计为一条流水线。不过从 Omni Flash 当前的时长与参考限制看，视频这一端仍处早期。

> ⚠️ 事实更正与待核实：本条曾误将"$0.034 per 1K image"理解为"每千张 0.034 美元"，实际为**每张 1K 分辨率图约 0.034 美元**（官方口径：图像输出每百万 token 30 美元），此处已更正，"近乎免费"的表述不成立。Elo 1251 等评分为 Google 内部基准与二手报道所引，具体以官方基准为准；Gemini Omni Flash 处公开预览，能力与限制可能快速变化；接入 Adobe Firefly 的时间与范围、各集成产品的实际可用性因地区与账号类型而异，以官方为准。

> Nano Banana 2 Lite 以速度档定价实现约 4 秒出图、质量略超更贵的专业档，叠加 Gemini Omni Flash 的"图像→视频"接力，标志 AI 图像生成竞争从画质转向速度、吞吐与集成；对 AI 图像与视觉传达方向的教学与研究，它提供了快速、成本可控（并非零成本）的批量图像工具，而视频端的能力边界仍需以实测为准。

**参考来源**：
- Google 官方博客：https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-omni-flash-nano-banana-2-lite/
- Gemini API 官方定价文档：https://ai.google.dev/gemini-api/docs/pricing
- TechCrunch：https://techcrunch.com/2026/06/30/google-introduces-a-faster-cheaper-image-generator-with-nano-banana-2-lite/
- VentureBeat（Elo/别名 Gemini 3.1 Flash-Lite）：https://venturebeat.com/technology/google-unveils-nano-banana-2-lite-aka-gemini-3-1-flash-lite-for-low-cost-4-second-fast-enterprise-image-generations
- Google Cloud 博客：https://cloud.google.com/blog/products/ai-machine-learning/nano-banana-2-lite-and-gemini-omni-flash-available/
