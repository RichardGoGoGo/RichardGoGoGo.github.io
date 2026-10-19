---
title: "FLUX 3 Image Klein 开放权重：5.6B 参数，INT8 版可在 8GB 显存的 GeForce RTX 显卡上运行"
date: 2026-10-15
icat: 模型
source: "Black Forest Labs 官方博客 / ComfyUI 官方 / Hugging Face / VentureBeat"
src: "https://bfl.ai/blog/flux-3-image-klein"
tags: [Black Forest Labs, FLUX 3, FLUX 3 Image Klein, 开放权重, 图像生成, 图像编辑, ComfyUI, 本地部署]
summary: "Black Forest Labs 10 月 15 日发布 FLUX 3 Image Klein，是 FLUX 3 Image 的开放权重版本。生成器 5.6B 参数（不含文本编码器），支持文生图、图像编辑和最多 10 张参考图，官方称与完整版共享原生 4K 生成、精确编辑和边界框排布等核心能力。提供基础与步数蒸馏两个检查点，以及 FP8、INT8、NVFP4 量化版，INT8 版可在 8GB 显存的 GeForce RTX 显卡上运行；ComfyUI 与 Diffusers 首日支持。采用 FLUX Kommunity License，年营收低于 500 万美元的个人和企业可免费商用。"
---

2026 年 10 月 15 日，Black Forest Labs（BFL）在官方博客发布 FLUX 3 Image Klein。这是 10 月 2 日发布的 FLUX 3 Image 的开放权重版本，生成器为 5.6B 参数，权重放在 Hugging Face，同时以 `flux-3-image-klein` 的名称进入 BFL API。以下内容按 BFL 官方博客、Hugging Face 模型页和 ComfyUI 官方文档整理，价格明细和许可细节另注明媒体来源。

## 已知事实

### 模型与能力

- **规模**：生成器 5.6B 参数，BFL 注明参数量不含文本编码器。BF16 权重 11.2GB，FP8 版 5.6GB。ComfyUI 官方教程中，两个检查点共用的文本编码器文件为 Qwen3-VL-4B 的 INT8 版本。
- **能力**：支持文生图、图像编辑和多参考图生成，最多 10 张参考图。BFL 称它与完整版 FLUX 3 Image 共享核心能力：原生 4K 生成、精确编辑，以及用边界框指定元素位置或把编辑限定在某个区域。
- **两个检查点**：基础模型用于微调，BFL 的测评中按 50 步运行；步数蒸馏模型用于低延迟生成，测评中按 16 步运行。Hugging Face 上分别为 `flux-3-image-klein-base` 和 `flux-3-image-klein`，下载前需同意许可条款。
- **量化与显存**：提供 FP8、INT8 和 NVFP4 三种量化版本，与 NVIDIA 合作开发。BFL 称 INT8 版可在显存 8GB 起的 GeForce RTX 显卡上运行。ComfyUI 的官方模板默认加载 INT8 版本，文档建议显存超过 24GB 时换用 BF16 版本。
- **速度（BFL 引用 NVIDIA 测得的数据）**：100 万像素、蒸馏模型、INT8、ComfyUI 环境下，RTX 5090 约 4 秒一张，RTX 4070 不到 9 秒；数据中心显卡 GB300 用 NVFP4 不到 0.6 秒。

### 工具与接入

- **首日支持**：ComfyUI 和 Hugging Face Diffusers，此外还有 TensorRT-LLM、SGLang Diffusion 和 vLLM-Omni。ComfyUI 官方博客 10 月 15 日发文介绍，更新到最新版后可从模板面板直接加载。
- **微调**：BFL 称 LoRA 训练可用 Ostris 的 AI Toolkit，NVIDIA NeMo AutoModel 也提供训练方案。
- **API 价格**：BFL 博客写明起价为每张 1K 分辨率图 0.009 美元。据 VentureBeat 报道，各分辨率单价为 768×768 0.008 美元、1K 0.009 美元、1.5K 0.011 美元、2K 0.014 美元、4K 0.036 美元，生成与编辑同价；作为对照，FLUX 3 Image 发布时 1K 单价为 0.048 美元。

### 许可

- **FLUX Kommunity License**：年营收低于 500 万美元的个人和企业可免费商用，研究与非商业用途免费；超过这一门槛的组织需购买自托管许可或使用 API。VentureBeat 指出，BFL 尚未公布标准的自托管商用费用；营收如何计算（例如是否合并关联公司）以 Klein 下载页的许可文本为准。

### BFL 自报的评测结果

- BFL 称在内部评测中，Klein 在文生图、多参考图生成和图像编辑三项上领先参评的更大规模开放模型（对比对象包括 7B 的 Qwen-Image 2.1 和 12.9B 的 Krea 2），评分也高于闭源的 Ideogram V4.5 和 FLUX.2 [pro]；与 FLUX.2 [klein] 9B 相比，文生图 Elo 高 91 分，编辑高 70 分。这些都是厂商提供的数据，目前没有独立测评。
- 安全方面，BFL 称做了数据集过滤、针对性后训练和内部红队测试，并由第三方机构 Cinder 做了外部评估。

## 横向与纵向定位

纵向看，按 BFL 官方博客，FLUX 3 系列今年的发布顺序为：7 月 23 日发布 FLUX 3 多模态模型，8 月 4 日发布 FLUX 3 Video 生成部分，9 月 23 日发布 FLUX 3 Action，10 月 2 日发布 FLUX 3 Image，10 月 15 日发布 Klein。FLUX 3 Image 发布时只通过 API 提供，企业可单独授权商用权重；据 The Decoder 报道，BFL 当时表示开放权重版本会在几周内推出，Klein 即是这一版本。上一代对应产品是 2026 年 1 月 15 日发布的 FLUX.2 [klein]：分 4B 和 9B 两档，4B 采用 Apache 2.0 许可，9B 采用非商用的 FLUX NCL，官方称 4B 约需 13GB 显存。这一次 Klein 只有一个尺寸，许可改为按营收设门槛的 FLUX Kommunity License，显存门槛降到 8GB（INT8 版）。

横向看，BFL 博客列出的同类开放权重模型中，Qwen-Image 2.1 为 7B，Krea 2 为 12.9B，Klein 是其中参数最少的一个。许可方面，据 VentureBeat 报道，Qwen-Image 2.1 的标准许可只覆盖非商业研究和评估，商用需单独授权。对需要在本地显卡上用 ComfyUI 做生成、局部修改和多参考图组合的个人和小团队来说，Klein 的主要变化是能在 8GB 显存上运行，且营收 500 万美元以下可免费商用。

> ⚠️ 待核实：Hugging Face 模型页需同意条款后才能查看完整说明，文本编码器型号目前依据 ComfyUI 官方文档；8GB 显存下能否以原生 4K 分辨率出图，官方未单独说明；BFL 的评测排名和速度数据均为厂商自报；各分辨率的 API 单价来自 VentureBeat，以 BFL 定价页为准。
