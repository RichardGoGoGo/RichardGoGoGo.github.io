---
title: "HuggingFace：别只用 LoRA——公平基准下 OFT 等技术更优"
date: 2026-06-18
icat: 研究与论文
source: "HuggingFace Blog"
src: "https://huggingface.co/blog"
tags: [PEFT, LoRA, 微调, 模型训练]
summary: "HuggingFace：公平基准下 OFT 等技术在部分任务上优于 LoRA。"
---

HuggingFace PEFT 团队指出 LoRA 占据 95%+ 的微调份额，但「他法超越 LoRA」的论文多有调参偏向；其统一 PEFT 库已支持 40+ 种技术并开始做公平基准，部分任务上 OFT 表现更好且切换只需改一行配置。

> 做模型微调 / 风格训练时不必默认只用 LoRA，这是模型训练课程与科研选型的实打实参考（但数据集有限，结论需谨慎）。
