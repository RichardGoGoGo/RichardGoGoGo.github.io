---
title: "ComfyUI原生集成Meta SAM 3D Body：单张图像恢复全身3D网格，导出GLB/BVH"
date: 2026-08-23
icat: 模型与工具
source: "ComfyUI官方GitHub"
src: "https://github.com/Comfy-Org/ComfyUI/releases"
tags: [ComfyUI, SAM 3D, Meta, 3D体型重建, GLB, BVH, 姿态估计]
summary: "「ComfyUI原生集成Meta SAM 3D Body，支持从单张图像重建全身3D网格并导出GLB/BVH格式，直接对接3D创作软件」"
---

ComfyUI新增Meta SAM 3D Body原生集成节点：输入单张包含人物的图像，模型输出完整全身三维网格（包含体型和关节姿态），可导出为GLB（3D场景格式，兼容Blender/Unity/Unreal）和BVH（骨骼动画格式，兼容主流动画软件）两种格式。这使得从单张参考图像提取3D人体模型、进入动画或3D创作流程成为可在ComfyUI工作流内完成的操作，无需独立的3D重建软件作为中间步骤。

> 从单图到可动画3D人体网格的ComfyUI原生化，将AI辅助3D角色创作的起点从"专业3D软件"降至"一张参考照片"，对数字媒体和游戏设计方向的教学工作流有直接影响。
