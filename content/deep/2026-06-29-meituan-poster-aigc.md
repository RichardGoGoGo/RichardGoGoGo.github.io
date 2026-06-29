---
title: "美团开源 AIGC 海报体系 PosterCraft/PosterOmni/PosterReward：构建'生成—编辑—评判'闭环"
date: 2026-06-29
icat: 模型与工具
source: "美团技术团队 / 机器之心 / AIToolly / MeiGen-AI"
src: "https://tech.meituan.com/2026/06/18/AIGC-poster.html"
tags: [美团, AIGC海报, 开源, 平面设计, PosterCraft]
summary: "美团开源覆盖生成、编辑、评判全链路的 AIGC 海报技术体系，含 PosterCraft、PosterOmni、PosterReward 三项工作（分别入选 ICLR/CVPR 2026），并已在真实业务中落地，为平面设计方向的 AI 研究与教学提供了可复现的开源样本。"
---

2026 年 6 月，美团智能创作团队开源了一套覆盖"生成—编辑—评判"全链路的 AIGC 海报生成技术体系，包含 PosterCraft、PosterOmni、PosterReward 三项工作，均已发布于 MeiGen-AI 的开源仓库（GitHub 与 HuggingFace）。三者分别被 ICLR 2026 与 CVPR 2026 接收，并已在美团外卖套餐图生成、品牌 IP（袋鼠团团）、点评信息流治理等真实业务场景中落地。

## 三个组件与闭环

- **PosterCraft（生成，ICLR 2026）**：摒弃模块化流水线，采用端到端方式统一优化文字、视觉与版式。据报道，其文字渲染准确率接近顶级闭源商业系统——文字渲染长期是图像生成模型的薄弱环节，海报这类强依赖文字与排版的场景尤为受其制约。
- **PosterOmni（编辑，CVPR 2026）**：以单一模型覆盖扩图、补全、比例调整、风格迁移等六类设计任务，定位更接近"基于参考稿工作的智能设计助手"。配套发布 PosterOmni-200K 数据集，含 20 万以上配对样本，覆盖局部编辑（缩放、填充、扩展、身份驱动）与全局创作（布局驱动、风格驱动）六类任务、跨六个海报主题。
- **PosterReward（评判，CVPR 2026）**：首个专门面向海报质量评估的奖励模型，据报道在专项评测基准上达到约 86% 的准确率，明显高于现有基线。

三者合起来，构成"生成初稿—精细编辑—质量评判"的闭环。其中"评判"环节由一个专用奖励模型承担，是多数生成方案缺失的一环。

## 横向与纵向定位

横向看，与通用文生图模型（如 Krea 2、FLUX、Qwen Image 等）相比，这套体系是"专用而非通用"：它针对海报这一强排版、强文字、强商业可用性的具体场景做优化，并补上了通用模型普遍没有的"质量评判"模块。一个能自动评估海报好坏的奖励模型，意味着生成结果可以被量化打分、进而用于筛选与迭代，而不必每一步都依赖人工判断。

纵向看，AIGC 在设计领域的演进，正从"生成一张图"走向"覆盖完整工作流的闭环"。早期关注点是单次生成的质量；此后是可控编辑；而"评判/奖励模型"的出现，把"什么是一张好海报"这一审美与质量问题，纳入了可计算、可优化的范畴。三项工作均以学术论文（ICLR/CVPR 2026）形式公开并开源权重与数据，使这一链条对研究与复现是开放的。

> ⚠️ 待核实：开源协议与可商用范围以 MeiGen-AI 各仓库的 License 为准；"文字渲染准确率接近顶级闭源系统""PosterReward 约 86% 准确率"等表述为报道与论文摘要所引，具体口径、评测基准与对照对象以原论文为准；部分二手报道未逐一列明三组件名称，组件归属以美团技术团队原文与开源仓库为准。

> 美团开源覆盖"生成—编辑—评判"全链路的海报 AIGC 体系，并以三篇顶会论文公开方法、数据与权重，是平面设计方向 AI 从"单次生成"走向"完整工作流闭环"的一个代表性节点；其开放与可复现，为视觉传达、平面设计相关的教学演示与方法研究提供了具学术背书的样本，"海报质量奖励模型"亦为"设计审美如何量化评估"提供了可分析的对象。

**参考来源**：
- 美团技术团队（原文）：https://tech.meituan.com/2026/06/18/AIGC-poster.html
- MeiGen-AI / PosterOmni（GitHub）：https://github.com/MeiGen-AI/PosterOmni
- MeiGen-AI / PosterReward_v1（HuggingFace）：https://huggingface.co/MeiGen-AI/PosterReward_v1
- AIToolly（开源报道）：https://aitoolly.com/zh/ai-news/article/2026-06-28-meituan-open-sources-innovative-aigc-poster-generation-system-featuring-a-technical-closed-loop
- chinaz（技术闭环解读）：https://www.chinaz.com/ainews/29062.shtml
