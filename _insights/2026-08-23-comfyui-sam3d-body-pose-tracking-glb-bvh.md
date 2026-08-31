---
title: "ComfyUI原生集成Meta SAM 3D Body：从单图恢复全身3D网格，支持视频姿态追踪+GLB/BVH导出"
date: 2026-08-23
icat: 模型与工具
source: "ComfyUI官方"
src: "https://github.com/comfy-org/ComfyUI/releases"
tags: [ComfyUI, SAM 3D Body, Meta, 人体姿态追踪, 3D动画, GLB, BVH, 角色设计]
summary: "Meta SAM 3D Body人体网格恢复功能于2026年8月23日正式并入ComfyUI核心，新增从单张图像恢复带手部细节全身3D人体网格的SAM3DBody节点组，支持视频级逐帧姿态追踪与面部表情驱动，可导出GLB与BVH格式直接对接Blender、Unity、Unreal等动画管线。"
---

Meta SAM 3D Body人体网格恢复功能于2026年8月23日正式并入ComfyUI核心版本：新增SAM3DBody系列节点，可从单张图像恢复带手部细节的全身3D人体网格；支持视频级逐帧姿态序列输出与面部表情驱动；生成结果可以GLB和BVH两种动画格式导出，与Blender、Unity、Unreal Engine等主流动画与游戏引擎管线直接对接。此前使用该能力需要额外安装独立扩展，集成入核心后变为零配置标准工作流。

> SAM 3D Body原生并入ComfyUI，使从参考图驱动3D人体姿态成为本地可视化工作流的标准能力，GLB/BVH接口打通了AI生成与专业动画制作管线之间的最后一段标准接口。
