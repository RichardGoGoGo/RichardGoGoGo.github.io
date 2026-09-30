---
title: "feitangyuan/onetake：一镜到底的产品动效短片 skill"
date: 2026-09-30
source: "feitangyuan"
src: "https://github.com/feitangyuan/onetake"
risk: medium
theme: [creative-web]
repo: "feitangyuan/onetake"
stars: 1011
pushed: 2026-09-29
stats_at: 2026-09-30
tags: [设计视觉, 动效, AI视频, Skill]
summary: "用单个 HTML 合成文件和实测过的动作库制作 10–30 秒的产品发布片与功能演示，画面之间靠元素衔接、不做跳切；本地逐帧渲染并加运动模糊（草稿 1080p30、成片 4K60），自带连贯度自动验收；PolyForm Noncommercial 许可，不允许商用。"
---

**简介**：产品动效短片 skill，用于产品发布片、预告片和功能演示（10–30 秒，带旁白的功能演示可到约 60 秒）。每个画面从上一个画面里延续出来：输入框展开成应用窗口、一条线变成下一段的第一根网格线，全片由一个连续镜头串起来。产品界面按截图用 HTML 重建，不录屏。

**要点**：约 38 个动作（弹簧、入场、衔接、碰撞、物理模拟、镜头、流体光场），每个都是时间的纯函数；逐帧渲染并做快门运动模糊，草稿 1080p30、成片 4K60，同一时间点总能渲染出同一帧。`probe.py` 记录每帧画面并判断每个交接处有没有元素延续，镜头长度过于均匀、没有静止段、音频爆音、快动作没有运动模糊、主体出画的片子判为不合格。`cases/` 收录 10 条成片与拆解文档（不含片子源码）。依赖 python3（playwright + chromium、numpy、scipy、Pillow、matplotlib）、ffmpeg、node；旁白另需 faster-whisper 与 Kokoro TTS（英语、日语）。音效素材和配乐需用户按各自许可自行获取，仓库不附带。`git clone` 到 skills 目录即可使用。

**作者可信度**：低（feitangyuan 个人账号，无公开背景；仓库创建于 2026-09-26，早期版本名为 ohmymotion）。

**来源说明（客观事实）**：许可证为 PolyForm Noncommercial 1.0.0，README 写明个人、学习、研究等非商业用途免费，不允许商用。核查于 2026-09-30。

**安全审查（七项客观事实，审查于 2026-09）**：① 无隐藏指令，SKILL.md 是视频制作流程文档（镜头语言、节奏、合成、验收）；② 渲染、配音、合成都在本地完成（Playwright 渲染本地 HTML、Kokoro 本地模型、FFmpeg），无外部 API 调用；Kokoro 模型首次运行时从公开托管地址下载到本地缓存；③ 越权——无安装脚本，pip 安装常见 Python 依赖，不访问系统敏感路径；④ 无 `curl|bash`、无 base64 混淆、无动态远程执行；⑤ 描述与行为一致；⑥ 供应链——Python 依赖（playwright / numpy / opencv / faster-whisper / kokoro-onnx）均为常见库，许可证为非商业许可；⑦ 无凭证窃取。审查范围为 SKILL.md 与仓库结构。

**风险评级**：🟡 中（非商业许可；Kokoro 模型首次运行需下载；社区验证有限，作者无公开背景）。

> 安全审查基于审查时（2026-09）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/feitangyuan/onetake)。
