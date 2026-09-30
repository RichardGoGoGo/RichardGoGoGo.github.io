---
title: "Alisa0808/vox-director：Vox 风纸拼贴讲解视频全流程 skill"
date: 2026-09-30
source: "Alisa0808（Alisa Qian）"
src: "https://github.com/Alisa0808/vox-director"
risk: medium
theme: [design-teaching, digital-team]
repo: "Alisa0808/vox-director"
stars: 2090
pushed: 2026-08-11
stats_at: 2026-09-30
tags: [内容发布, AI视频, 拼贴, Skill]
summary: "输入一个选题，自动完成分镜脚本、拼贴海报关键帧、图生视频动效、旁白、配乐与字幕，本地 ffmpeg 合成 MP4；图像、视频、语音、音乐都经 Atlas Cloud API 生成，流程中有确认分镜与挑选风格两个人工节点。"
---

**简介**：Vox 讲解片风格的纸拼贴视频生成 skill（手撕纸、毛边、胶带、半调网点、剪纸标题）。输入一个选题，依次生成 `beats.json` 分镜、每拍一张拼贴海报关键帧、图生视频动效、旁白与配乐，最后用本地 ffmpeg 拼接、让配乐在旁白下自动避让并烧录字幕。流程中有两个人工确认点：确认分镜脚本，以及从 3–4 种主题试片里挑风格。

**要点**：9 套主题预设（含 chinese-ink 水墨）和 14 种叙事弧线；三种输入形态：B-roll（只给选题，画面全部生成）、A-roll（上传口播视频，逐段转成拼贴风格，保留人脸与口型）、C-roll（上传照片，主体抠成贴纸，旁白可克隆本人声音）。另有本地关键帧引擎，把海报拆成零件逐帧驱动。依赖 Atlas Cloud API key、ffmpeg / ffprobe、Python 3 + Pillow；`git clone` 安装。MIT。

**作者可信度**：中低（Alisa0808 / Alisa Qian 个人维护，无公开机构背景）。

**来源说明（客观事实）**：README 说明全流程基于 Atlas Cloud 构建，用到的模型包括 Google nano-banana-2、gemini-omni-flash、快手 Kling、xAI TTS、字节 seed-audio（声音克隆）、MiniMax music 等，均通过 Atlas Cloud 调用；A-roll / C-roll 模式会把用户提供的口播视频、照片或声音样本上传到 Atlas Cloud 处理。README 中的 Atlas Cloud 链接带 utm 推广参数；SKILL.md 的 beats.json 示例中水印字段为「Made with Atlas Cloud」，合成步骤会把水印烧进成片。核查于 2026-09-30。

**安全审查（七项客观事实，审查于 2026-08）**：① 无隐藏指令，SKILL.md 是视频创作工作流文档；② 数据外泄——所有场景提示词（标题、叙事、风格参数）上传至 Atlas Cloud API 云端生成，Atlas Cloud 为小型第三方服务，未见公开的详细隐私政策；③ 越权——需 `ATLASCLOUD_API_KEY` 环境变量，运行时向 `api.atlascloud.ai` 查询模型列表（功能所需）；④ 无 `curl|bash`，ffmpeg 为本地标准工具，无 base64 混淆，package.json 无 postinstall 钩子；⑤ 描述与行为一致，对 Atlas Cloud 的依赖已明确声明；⑥ 供应链——Python + ffmpeg，MIT，package.json 仅含元数据；服务可用性取决于 Atlas Cloud 持续运营；⑦ 无凭证窃取，skill 只读取用户自配的 `ATLASCLOUD_API_KEY`。

**风险评级**：🟡 中（生成内容上传第三方 Atlas Cloud；作者知名度低；社区验证有限）。

> 安全审查基于审查时（2026-08）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/Alisa0808/vox-director)。
