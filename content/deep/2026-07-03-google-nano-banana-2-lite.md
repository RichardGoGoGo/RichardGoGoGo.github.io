---
title: "Google 发布 Nano Banana 2 Lite 与 Gemini Omni Flash：图像生成 4 秒出图、千张 $0.034"
date: 2026-07-03
icat: 模型与工具
source: "Google 官方博客 / TechCrunch / VentureBeat / Google Cloud"
src: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-omni-flash-nano-banana-2-lite/"
tags: [Google, NanoBanana, GeminiOmniFlash, AI图像, 图生视频]
summary: "Google DeepMind 于 6 月 30 日发布速度档图像模型 Nano Banana 2 Lite（4 秒出图、每千张 $0.034）与视频模型 Gemini Omni Flash（图/文/视频转视频），并计划接入 Adobe Firefly，把 AI 图像生成成本压到近乎可忽略。"
---

2026 年 6 月 30 日，Google DeepMind 发布图像模型 Nano Banana 2 Lite（模型 ID gemini-3.1-flash-lite-image）与视频模型 Gemini Omni Flash。前者主打速度与成本——文生图约 4 秒出图、每千张仅 0.034 美元；后者可从文本、图像、视频输入生成并对话式编辑视频。两款均已上线 Google AI Studio 与 Gemini API，并计划接入 Adobe Firefly。

## 已知事实

- **Nano Banana 2 Lite**：定位为 Gemini 图像体系中的速度档（与均衡档 Nano Banana 2、专业档 Nano Banana Pro 并列）；约 4 秒出图、延迟较上代降约 40%；强调提示词遵循、角色一致性与图内文字的可读性。据 VentureBeat 等报道，其文生图 Arena Elo 达 1251，高于上代 NB1 的 1151，甚至略高于更大更贵的 NB Pro（1245）。
- **成本**：每千张图 0.034 美元，意味着单张成本可忽略，适合高吞吐、批量的工作流（批量出素材、测图变体、自动化管道）。
- **渠道与集成**：Google AI Studio、Gemini API、Gemini Enterprise Agent Platform；消费侧接入 AI Mode in Search、Gemini App、NotebookLM、Google Photos、Stitch、Flow、Google Ads 等。
- **Gemini Omni Flash**（gemini-omni-flash-preview）：从文/图/视频生成视频并支持对话式编辑，定价约每秒视频输出 0.10 美元；当前公开预览有明确限制——最长约 10 秒、API 暂不支持音频参考与场景延展、视频参考仅接受约 3 秒且处理不完善、跨场景的角色一致性仍有问题。

## 横向与纵向定位

横向看，Nano Banana 2 Lite 的差异点集中在成本与速度。相比按图计费的主流方案，每千张 0.034 美元把图像生成推入"近乎免费"区间；而它并非以牺牲质量换低价——内部基准显示其质量甚至略高于同体系更贵的专业档。一个方向性的信号是：Google 计划把这两款模型接入 Adobe Firefly，即把自家模型供给一个竞品平台，延续了 Firefly"聚合多家外部模型"的策略。

纵向看，AI 图像生成的竞争重心，正从早期的"画质比拼"转向"速度与单位成本"。当出图成本低到可忽略，竞争焦点转移到吞吐量、集成度与"图像→视频"的接力链路上——Nano Banana 2 Lite 负责快速出图，Gemini Omni Flash 承接把静态图转为带运镜的短视频，两者被设计为一条"先生图再转视频"的流水线。不过从 Omni Flash 当前的时长与参考限制看，视频这一端仍处早期。

> ⚠️ 待核实：Elo 1251 等评分为 Google 内部基准与二手报道所引，具体口径以官方基准为准；Gemini Omni Flash 处公开预览、能力与限制可能快速变化；接入 Adobe Firefly 的时间与范围以官方为准；各集成产品的实际可用性因地区与账号类型而异。

> Nano Banana 2 Lite 把图像生成成本压到近乎可忽略、并保持较高质量，叠加 Gemini Omni Flash 的"图像→视频"接力，标志 AI 图像生成竞争从画质转向速度与成本、并向图生视频延伸；对 AI 图像与视觉传达方向的教学与研究，意味着可以近乎零成本地进行大规模图像实验，但视频端的能力边界仍需以实测为准。

**参考来源**：
- Google 官方博客：https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-omni-flash-nano-banana-2-lite/
- Google Cloud 博客：https://cloud.google.com/blog/products/ai-machine-learning/nano-banana-2-lite-and-gemini-omni-flash-available/
- TechCrunch：https://techcrunch.com/2026/06/30/google-introduces-a-faster-cheaper-image-generator-with-nano-banana-2-lite/
- VentureBeat（Elo/别名 Gemini 3.1 Flash-Lite）：https://venturebeat.com/technology/google-unveils-nano-banana-2-lite-aka-gemini-3-1-flash-lite-for-low-cost-4-second-fast-enterprise-image-generations
- IT之家（中文）：https://news.qq.com/rain/a/20260701A01WVB00
