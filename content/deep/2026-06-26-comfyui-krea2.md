---
title: "ComfyUI v0.26.0 一次接入 Krea 2 等三大开源模型：开源生图工作流的'超市'再扩容"
date: 2026-06-26
icat: 模型与工具
source: "ComfyUI 官方 / Krea AI 技术报告 / GitHub Release"
src: "https://blog.comfy.org/p/krea-2-open-source-models-are-now"
tags: [ComfyUI, Krea2, 开源模型, AI生图, 工作流]
summary: "ComfyUI v0.26.0 在单次版本更新中接入 Krea 2、Boogu-Image、Qwen3-VL 三大开源模型，并新增 3D 与视频节点；其中 Krea 2 为开放权重图像模型、明确不使用 AI 生成图预训练，进一步降低优质开源模型的使用门槛。"
---

2026 年 6 月 23 至 24 日，AI 生图工作流引擎 ComfyUI 发布 v0.26.0 版本，在一次更新中同时接入三个最新开源模型：Krea 2、Boogu-Image 与 Qwen3-VL，并新增 3D 与视频相关节点。对数以百万计的 ComfyUI 用户而言，这意味着无需额外下载部署，升级版本即可获得三个新模型的使用能力。Krea 2 在 HuggingFace 发布后数小时内即被集成进 ComfyUI。

## v0.26.0 的更新内容

- **Krea 2**：Krea 的开源图像模型，提供开放权重的 Raw 与 Turbo 两个变体——Raw 为未蒸馏基座、适合训练 LoRA，Turbo 为蒸馏版、支持 8 步推理。
- **Boogu-Image**：文生图模型，采用 Qwen3-VL-8B 作为文本编码器；配套 TextEncodeBooguEdit 节点支持图像编辑（含负向提示与可选参考图）。
- **Qwen3-VL**：提供 4B 与 8B 两档，支持文本生成与图像理解。
- **新增节点**：Load3DAdvanced（仅网格的 3D 加载器）、LTX2 Context Windows（面向 LTX-2 多模态视频+音频模型的上下文窗口采样）；工作流模板升级至 0.9.26。

## Krea 2 的技术与理念要点

据 Krea AI 官方技术报告，Krea 2 采用单流 Diffusion Transformer（DiT）架构，文本编码器为 Qwen 3 VL（多层特征聚合），自编码器使用 Qwen Image VAE 与 FLUX 2 VAE，并采用分组查询注意力（GQA）、sigmoid 门控注意力等设计。

两点值得留意：

其一，**训练数据的"干净"**。官方报告明确表示预训练数据中"没有使用 AI 生成图像"，并自建分类器过滤此类图像——理由是即便少量 AI 生成内容也会给模型输出分布引入偏差。在合成数据被广泛用于提效的当下，这是一个明确的反向选择。

其二，**反对"默认审美同质化"的设计理念**。官方称 Krea 2 面向"创作性探索"而非"一组狭窄的默认审美"，主张模型既要足够有表现力以覆盖多种风格，又要足够可控以便创作者在其中导航。这一理念本身可作为讨论"生成式审美趋同"问题的材料。

权重已发布于 HuggingFace、推理代码在 GitHub，采用宽松许可（permissive license）。官方称其在 Artificial Analysis 榜单上位列前十、并为独立实验室模型中的第二名。

## 横向与纵向定位

横向看，Krea 2 的差异点不在单一指标，而在"开放权重 + 数据来源干净 + 反同质化定位"的组合。在开源图像模型梯队（Stable Diffusion、FLUX 系、Qwen Image 等）中，"不使用 AI 生成图预训练"是一个相对少见的明确承诺；而以 ComfyUI 为枢纽的"更新即获取"，让这类优质开源模型的可及性进一步提高，与依赖订阅的闭源平台形成对照。

纵向看，ComfyUI 持续扮演开源生成模型的"聚合枢纽"角色：新模型在外部发布后，往往在很短时间内被接入其节点体系，使分散的开源进展能在同一工作流内被调用与对比。v0.26.0 一次性纳入三个模型，是这一模式的又一次集中体现。

> ⚠️ 待核实：Krea 2 的参数量，加更简报与部分二手报道称约 12B／12.9B，但 Krea 官方技术报告未明确标注具体参数量；Turbo 变体"2K 分辨率、约 2 秒生成"的指标来源于简报与第三方实测，官方报告仅确认其为 8 步蒸馏推理；排名口径，本文核到的是"Artificial Analysis 榜前十、独立实验室第二"，简报所述"DesignArena 第二"未独立核到，以各榜单官方为准。

> ComfyUI 以单次版本更新接入三个最新开源模型，体现了开源生成生态"枢纽化、低门槛"的趋势；其中 Krea 2"不使用 AI 生成图预训练"的数据选择与"反审美同质化"的定位，对 AI 图像生成的教学演示与方法讨论具有可用的观察价值。

**参考来源**：
- ComfyUI 官方博客（Krea 2 接入）：https://blog.comfy.org/p/krea-2-open-source-models-are-now
- ComfyUI 官方 Changelog：https://docs.comfy.org/changelog
- GitHub ComfyUI Releases：https://github.com/comfy-org/ComfyUI/releases
- Krea AI 官方技术报告：https://www.krea.ai/blog/krea-2-technical-report
- HuggingFace Krea-2-Turbo：https://huggingface.co/krea/Krea-2-Turbo
