---
title: "腾讯混元发布 HY-World 2.1 Panorama：由单张图像或文本生成可漫游 3D 高斯泼溅（3DGS）空间与高清全景资产"
date: 2026-11-13
icat: 模型
source: "腾讯混元"
src: "https://hunyuan.tencent.com/"
tags: [腾讯混元, HY-World-2.1, 世界模型, 3DGS, 全景生成, 3D生成]
summary: "腾讯混元于 11 月 13 日发布 3D 世界生成模型更新 HY-World 2.1 Panorama，支持通过单张图片或文本描述生成 360 度无缝全景图及可自由漫游的三维空间，可直接导出 3D Gaussian Splatting（3DGS）与网格资产供 Unreal Engine、Unity 及建筑可视化管线调用。"
sources:
  - { name: "腾讯混元官网", url: "https://hunyuan.tencent.com/", tier: official }
  - { name: "Hugging Face Tencent", url: "https://huggingface.co/tencent", tier: official }
reason: "打通从 360 度全景生成到具备真实空间几何与遮挡关系的 3DGS 场景导出，为游戏关卡原型、虚拟制片背景板与建筑室内空间漫游提供轻量化资产管线。"
topics: [腾讯, 3D 与世界模型]
weight: 3
---

腾讯混元团队于 2026 年 11 月 13 日推出三维世界生成模型升级版 HY-World 2.1 Panorama。该模型在混元 3D 世界模型基础上强化了大尺度全景空间的一致性与几何重建能力：用户输入一段文本提示词或单张局部概念图，模型即可先构建无接缝、透视准确的 360 度高清全景环境，并进一步推理出场景深度与被遮挡区域的几何结构，转化为支持六自由度（6DoF）相机漫游的三维空间。导出的场景支持标准 3D Gaussian Splatting（3DGS）及三角网格格式，可直接导入 Unreal Engine、Unity、Blender 或建筑空间可视化工作流中进行二次布光与镜头调度。

> 打通从 360 度全景生成到具备真实空间几何与遮挡关系的 3DGS 场景导出，为游戏关卡原型、虚拟制片背景板与建筑室内空间漫游提供轻量化资产管线。
