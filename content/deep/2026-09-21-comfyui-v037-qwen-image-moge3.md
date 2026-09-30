---
title: "ComfyUI v0.37.0/v0.37.1：原生支持 Qwen-Image 2.1 与 MoGe 3，新增腾讯 HY Image 3.5 Preview 合作节点"
date: 2026-09-21
icat: 产品
source: "ComfyUI / Qwen / Microsoft"
src: "https://github.com/Comfy-Org/ComfyUI/releases/tag/v0.37.0"
tags: [ComfyUI, Qwen-Image 2.1, MoGe 3, HY Image 3.5, RGBA, 几何估计]
summary: "ComfyUI 9 月 21 日发布 v0.37.0，原生支持 Qwen-Image 2.1（生成与编辑同一模型，可输出带 alpha 通道的图像，原生 2K）和 MoGe 3 单图几何估计（ViT-L、ViT-g 两个检查点），GPT Image 2 节点加入透明背景选项；9 月 22 日的 v0.37.1 新增腾讯 HY Image 3.5 Preview 文生图与编辑合作节点，编辑节点最多接 5 张参考图，原生 2K 输出。"
---

2026 年 9 月 21 日，ComfyUI 发布 v0.37.0，9 月 22 日发布 v0.37.1。v0.37.0 新增两项公开权重模型的原生支持：阿里 Qwen 团队 9 月 20 日发布的图像生成与编辑模型 Qwen-Image 2.1，以及微软 MoGe 项目 8 月发布的单图几何估计模型 MoGe 3；同时加入快速磁盘自动检测、Qwen 文本模型解码加速等底层改动。v0.37.1 的改动是新增腾讯 HY Image 3.5 Preview 的文生图与编辑合作节点（另更新了工作流模板），该模型通过 API 在腾讯服务器上运行。

## 已知事实

- **Qwen-Image 2.1 是什么**：据 Qwen 官方模型卡，Qwen-Image 2.1 用同一套权重完成文生图和图像编辑，视觉生成部分为 7B 参数（32 层单流 DiT）。它可以从文本生成普通或透明（RGBA）图像、编辑透明图层、从照片中抠出主体；编辑时最多支持 10 张参考图，可用圈选、涂画标注或单独的蒙版指定局部修改，并保持人物与产品的身份特征。模型卡给出的 1:1 输出尺寸为 2048×2048，另有 4:3、3:2、16:9 及对应竖版比例。
- **ComfyUI 中的实现**：据 PR #16400，ComfyUI 版本使用 Qwen3-VL-8B 作为文本编码器，VAE 为 RGBA VAE（复用 Wan 2.2 的 VAE 模块）；文本和参考图的 KV 缓存在一次运行中复用，编辑任务约提速 1.7 倍。官方模板有三个：文生图、图像编辑（示例接两张参考图）和背景移除（用编辑指令去背景，输出透明 PNG）。模板默认加载 int8 量化权重以降低内存占用，另提供 bf16 版本；文生图与编辑模板还带一个可选的提示词增强步骤，由基于 Qwen3.5 9B 的专用文本编码器改写提示词。
- **Qwen-Image 2.1 的许可**：模型采用 Qwen Research License，只允许非商业用途（研究或评估），商业使用需另行向 Qwen 申请许可。
- **MoGe 3**：v0.37.0 加入 MoGe 3 支持（PR #16381），提供 ViT-L（约 3.7 亿参数）和 ViT-g（约 12.5 亿参数）两个检查点。按 ComfyUI 文档，MoGe 3 沿用 MoGe-2 架构，增加一个自引导稀疏体素精修阶段，可输出公制尺度的点图、深度图和法线；MoGe 3 专属的 refine_steps 参数控制精修次数（0–8，默认 3），次数越多细节和边缘越清晰，耗时大致线性增加。ComfyUI 的 MoGe 3 模板输入 1 张图，输出 1 张深度图和 1 张法线图。MoGe 3 论文于 7 月 20 日提交 arXiv，微软 MoGe 代码仓库 8 月 18 日发布模型，Hugging Face 上的权重标注为 MIT 许可。作者在项目页称，MoGe 3 在 9 个零样本基准上取得最好的全局与局部精度，细节类严格指标提升最大。
- **HY Image 3.5 Preview（v0.37.1）**：新增「Tencent HY Image: Text to Image」和「Tencent HY Image: Edit」两个合作节点（PR #16462）。按 ComfyUI 文档，编辑节点可接 1–5 张参考图，在提示词中以 @Image1、@Image2 指代；分辨率可选 1K、2K（默认）、4K 或自定义，原生最高渲染 2K，选 4K 时由模型在 2K 结果上放大；文生图会先由模型改写、扩写提示词。两个节点都在腾讯服务器上通过 Comfy API 运行，无需下载模型或本地 GPU，需要登录并在允许的网络环境中使用。
- **其他节点更新（v0.37.0）**：OpenAI 合作节点的 GPT Image 2 新增透明背景选项；Meshy 3D 节点加入 Meshy 7.1；YuE2 音乐生成节点新增 CFG 控制；Empty Latent Image 的默认宽高改为 1024。
- **性能与底层（v0.37.0）**：检测到足够快的磁盘时自动启用 `--fast-disk`（PR #16333 以 PCIe 4.0 NVMe 或更快为参考，按模型逐个判断，权重直接从磁盘读取、跳过内存缓冲，此前需手动开启），并新增 `--disable-fast-disk` 便于排查；为 Qwen3、Qwen3.5、Qwen3.8 文本模型加入 CUDA graphs 和 W4A8 GEMV，PR #15623 说明这是解码速度优化，其中包括用模型自带的多 token 预测头一次起草 2–5 个 token 再批量验证；开启动态显存时文本编码器常驻 GPU；使用 comfy-kitchen 注意力时降低 Wan 模型的峰值显存。

## 横向与纵向定位

纵向看，ComfyUI 9 月的版本节奏很密：v0.35.0（9 月 9 日）引入 Comfy Compiler，并新增一批合作节点，其中包括 OpenAI 前一天发布的 GPT Image 2.5 Flare 与 Sunburst；v0.36.0（9 月 15 日）加入 FastVideo FastH3（8 步蒸馏的 MiniMax H3 视频模型）、Marigold V2（单图估计深度、表面法线和反照率）和 YuE2 音乐生成；v0.37.0（9 月 21 日）与 v0.37.1（9 月 22 日）即本文内容；v0.37.2（9 月 23 日）新增 Recraft V4.1 Flash、Claude Opus 5.5 等合作节点；v0.38.0（9 月 29 日）补充了 Qwen-Image 2.1 的 ControlNet 与轻量 VAE，并把快速磁盘检测扩展到所有模型加载器。其间还有若干补丁版本。几何估计方面，ComfyUI 自 2026 年 5 月起已提供 MoGe 第一、二代的深度估计与生成网格模板，9 月先后加入 Marigold V2 和 MoGe 3，单图几何估计可选的模型增多。

透明通道是这几个版本中的一条连续线索。v0.35.0 修正了一批图像节点对 alpha 通道的处理，涉及 RGB/YUV 转换、Canny 边缘检测、色彩调整、量化、文字叠加、图像混合、反相和 Porter-Duff 混合模式；v0.36.0 的 Add Noise 不再向 alpha 通道加噪；v0.37.0 接入可原生输出 RGBA 的 Qwen-Image 2.1，并为 GPT Image 2 打开透明背景选项（OpenAI 于 8 月 20 日在 API 中以预览形式为 gpt-image-2 提供透明背景）；v0.38.0 新增同样输出 RGBA 的 Ming Image 0.1 Design（6B 文生图模型，面向文字密集的设计版式），并修正了 ImageUpscaleWithModel 处理 RGBA 图像时崩溃、放大后丢失透明度的问题，以及 Qwen VL 预处理遇到四通道参考图时崩溃的问题。

横向看，同一时期多款图像模型把多参考图编辑作为重点，上限各不相同：Qwen-Image 2.1 模型卡写的是最多 10 张；ComfyUI 中的 HY Image 3.5 编辑节点最多 5 张；Midjourney 8 月 27 日开始公开测试的 V8.2 编辑模型最多 4 张；ComfyUI v0.35.0 接入的 SenseNova U1.5 最多 10 张。本次三项新增的使用条件也有差别：MoGe 3 权重为 MIT 许可，可本地运行；Qwen-Image 2.1 权重公开，但仅限非商业用途；HY Image 3.5 Preview 在 ComfyUI 中只能通过合作节点调用腾讯的 API，节点带按次计费标注。

> ⚠️ 待核实：v0.37.1 在 GitHub 上只有版本标签，没有单独的 Release 说明，其内容以官方 Changelog 和 PR #16462 为准；HY Image 3.5 Preview 的参考图上限和分辨率是 ComfyUI 节点文档中的规格，模型本身的规格以腾讯官方说明为准；MoGe 3 的精度数据来自作者项目页的零样本基准，具体场景需实测；Qwen-Image 2.1 商业授权的条件需向 Qwen 确认；`--fast-disk` 自动启用在不同硬件和系统上的实际效果需实测。

**参考来源**：
- ComfyUI v0.37.0 GitHub Release：https://github.com/Comfy-Org/ComfyUI/releases/tag/v0.37.0
- ComfyUI 官方 Changelog（v0.35.0–v0.38.0）：https://docs.comfy.org/changelog
- ComfyUI PR #16400（Qwen-Image 2.1）：https://github.com/Comfy-Org/ComfyUI/pull/16400
- ComfyUI PR #16381（MoGe 3）：https://github.com/Comfy-Org/ComfyUI/pull/16381
- ComfyUI PR #16462（HY Image 3.5 节点，v0.37.1）：https://github.com/Comfy-Org/ComfyUI/pull/16462
- ComfyUI PR #16333（快速磁盘自动检测）：https://github.com/Comfy-Org/ComfyUI/pull/16333
- ComfyUI PR #15623（Qwen 文本模型解码优化）：https://github.com/Comfy-Org/ComfyUI/pull/15623
- ComfyUI 文档（Qwen-Image 2.1 工作流）：https://docs.comfy.org/tutorials/image/qwen/qwen-image-2-1
- ComfyUI 文档（MoGe）：https://docs.comfy.org/tutorials/utility/moge
- ComfyUI 文档（HY Image 3.5 Preview）：https://docs.comfy.org/tutorials/partner-nodes/tencent/hy-image-3-5
- ComfyUI v0.35.0 GitHub Release（alpha 通道修正、GPT Image 2.5 节点）：https://github.com/Comfy-Org/ComfyUI/releases/tag/v0.35.0
- Qwen-Image 2.1 模型卡（Hugging Face）：https://huggingface.co/Qwen/Qwen-Image-2.1
- Qwen-Image 2.1 许可协议：https://huggingface.co/Qwen/Qwen-Image-2.1/blob/main/LICENSE
- 微软 MoGe 代码仓库：https://github.com/microsoft/MoGe
- MoGe-3 论文（arXiv 2607.17967）：https://arxiv.org/abs/2607.17967
- MoGe-3 项目页：https://qft-333.github.io/moge3page/
- Midjourney 官方更新（Edit Model for V8）：https://updates.midjourney.com/edit-model-for-v8/
