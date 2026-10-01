---
title: "Vincentwei1021/anything2explainer：主题转科普讲解视频 skill"
date: 2026-09-30
source: "Vincentwei1021"
src: "https://github.com/Vincentwei1021/anything2explainer"
risk: medium
theme: [digital-team]
repo: "Vincentwei1021/anything2explainer"
stars: 2205
pushed: 2026-09-18
stats_at: 2026-10-01
tags: [内容发布, AI视频, 科普视频, Skill]
summary: "给一个主题或一篇文章，产出 2–8 分钟、带配音、字幕和章节进度条的黑底动态图形讲解视频（1280×720，中文或英文），画面全部由 Remotion 代码绘制；9 个阶段、4 个人工确认点，调研文档每条附来源链接；PolyForm Noncommercial 许可。"
---

**简介**：讲解视频生成 skill。输入一个主题（或一篇文章 / 文档），选定时长与语言，输出 1280×720 的 H.264 MP4：黑底配星点或点阵背景、白色线稿加紫色强调，带同步配音、逐词对齐字幕、章节卡、顶部 HUD 和底部章节进度条。每一帧由 Remotion（React + TypeScript）代码绘制，不用素材库画面，也不用生成式视频模型。

**要点**：流程分 9 个阶段（建项目、调研、旁白与时间轴、分镜、覆盖层与图元、试做、并行搭建、渲染与定量质检、交付），在时长 / 语言、旁白定稿、配音、30 秒试片四处征求用户确认；按时长派 4–14 个并行 agent 逐镜头写组件，耗时约 1–3 小时、占用 2–3 GB 磁盘。调研文档每条事实附 URL，SKILL.md 规定抓取网页中的指令性文字一律不执行。配音默认中文用 edge-tts（云希）、英文用本地 kokoro-82m，也可换成用户自己的 TTS 或成品音频。片尾默认有一行「built by Anything2Explainer skill」，可在配置中去掉；可选 B-roll 只能用免版权素材并登记清单。

**作者可信度**：低（Vincentwei1021 个人维护，无公开机构背景；同一作者维护 video-shotcraft）。

**来源说明（客观事实）**：许可证为 PolyForm Noncommercial，README 写明非商业用途免费，商用需事先获得作者授权，用它做出的视频归用户所有。核查于 2026-09-30。

**安全审查（七项客观事实，审查于 2026-09）**：① 无隐藏指令，SKILL.md 是 9 阶段视频生产流程文档；② 数据外泄——中文旁白文本发往 Microsoft edge-tts 云端 TTS 端点（无需 API key），英文配音 kokoro-82m 在本地运行；调研阶段会联网搜索（功能所需）；③ 越权——FFmpeg 与 headless Chromium 在本地运行，不访问系统敏感路径，pip 标准安装；④ 无 `curl|bash`，edge-tts 锁定 7.2.8 版本，Remotion 为 npm 标准安装，无 base64 混淆；⑤ SKILL.md 写明 edge-tts 走 Microsoft 云端、kokoro-82m 为本地模型，描述与行为一致；⑥ 供应链——非商业许可；edge-tts 跟随 Microsoft 端点变化，升级后可能失效；Remotion 为常见 React 视频库；⑦ 无凭证窃取。审查范围为 SKILL.md 全文与脚本清单，`tts_build.py`、`render_storyboard.py` 等脚本未逐行审读。

**风险评级**：🟡 中（中文旁白发往 Microsoft 云端 TTS；非商业许可；edge-tts 依赖外部端点；作者知名度低）。

> 安全审查基于审查时（2026-09）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/Vincentwei1021/anything2explainer)。
