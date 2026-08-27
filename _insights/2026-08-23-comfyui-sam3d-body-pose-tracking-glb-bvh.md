---
title: "ComfyUI 集成 Meta SAM 3D Body：单图生成全身网格，支持 GLB 与 BVH 动作捕捉格式导出"
date: 2026-08-23
icat: 模型与工具
source: "ComfyUI Wiki"
src: "https://comfyui-wiki.com/en/news"
tags: [ComfyUI, SAM 3D, Meta, 身体重建, GLB, BVH, 动作捕捉]
summary: 「ComfyUI 新增 Meta SAM 3D Body 节点，支持从单张图像生成全身三维网格，并导出为 GLB 三维模型与 BVH 动作捕捉格式。」
---

ComfyUI 在 2026 年 8 月更新中集成 Meta SAM 3D Body 节点，允许用户上传单张人物图像，模型自动估计全身三维姿态与体型参数，生成包含骨骼绑定的全身三维网格；输出格式支持 GLB（可直接导入 Blender、Unity、Unreal Engine）与 BVH（标准动作捕捉文件格式），使生成结果可直接接入三维动画制作与游戏引擎工作流。该功能无需专用多目相机设备，从单张普通图像即可完成重建。

> 从单图到 GLB/BVH 全链路输出的能力，使低成本的三维角色资产与动作数据采集在 ComfyUI 工作流内成为可能，对独立游戏开发者与小型动画制作团队具有直接降本价值。
