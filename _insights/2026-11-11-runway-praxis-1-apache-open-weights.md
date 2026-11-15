---
title: "Runway 以 Apache 2.0 协议开源 27B 世界动作模型 Praxis-1 的完整权重、微调与推理代码"
date: 2026-11-11
icat: 模型
source: "Runway Research"
src: "https://runwayml.com/research"
tags: [Runway, Praxis-1, 世界模型, 开源权重, Apache-2.0, 视频生成]
summary: "Runway 11 月 11 日宣布以 Apache 2.0 许可证开放其首款世界动作模型（World Action Model）Praxis-1 的完整模型权重、推理管线与微调代码；该模型采用 270 亿参数混合专家（MoE）扩散 Transformer 架构，可根据文本、图像与动作控制指令预测并生成具有物理一致性的动态世界状态。"
sources:
  - { name: "Runway Research", url: "https://runwayml.com/research", tier: official }
  - { name: "Hugging Face", url: "https://huggingface.co/runwayml", tier: official }
reason: "主流商业视频生成厂商首次以宽松的 Apache 2.0 协议开放 27B 规模世界动作模型的完整权重与微调代码，为学术界与独立团队研究可控交互环境及物理仿真提供了可复现基座。"
topics: [Runway, 3D 与世界模型, 视频生成]
weight: 4
---

Runway 于 2026 年 11 月 11 日正式开源其通用世界动作模型（World Action Model）Praxis-1，以宽松的 Apache 2.0 开源协议发布完整模型权重、推理代码及训练微调脚本。Praxis-1 采用 270 亿参数（27B）的混合专家（MoE）扩散 Transformer 架构，旨在理解三维空间几何、物体交互与相机运动规律，能够结合输入图像、自然语言指令以及离散或连续的动作控制信号，连续预测并渲染下一时刻的世界画面状态。由于采用 Apache 2.0 协议，研究机构、游戏工作室与影视预演团队可在本地或私有云环境中自由部署、微调并商业化衍生模型。

> 主流商业视频生成厂商首次以宽松的 Apache 2.0 协议开放 27B 规模世界动作模型的完整权重与微调代码，为学术界与独立团队研究可控交互环境及物理仿真提供了可复现基座。
