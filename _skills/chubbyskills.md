---
title: "chubbyskills：中文多平台内容采集 skill 套件"
date: 2026-06-24
source: "chubbyguan"
src: "https://github.com/chubbyguan/chubbyskills"
tags: [取料, Skill, 知识库]
summary: "把抖音/B站/小红书/公众号/X/播客等中文多平台内容采集进个人知识库的 13 个 skill，含视频转写、字幕优先、知识库 MCP server。"
---

**简介**：把抖音 / B 站 / 小红书 / 公众号 / X / 播客等中文多平台内容采集进个人知识库的 13 个 AI Skill，含视频转写、字幕优先、知识库 MCP server。

**要点**：字幕优先免 GPU；支持 Obsidian；MCP server 可在知识库内查询。

**活跃度**：443★ / 34 commits（MIT）。作者可信度：中（个人维护，无知名背景）。

**安全审查（七项客观事实，审查于 2026-06）**：① 无隐藏指令（SKILL.md 内容与目的一致）；② `content-enrich` 子 skill 使用 `DEEPSEEK_API_KEY`，内容会发往 DeepSeek 服务器（第三方 LLM），`XHS_COOKIE` 仅用于本地 HTTP 请求——敏感内容慎用；③ `setup.sh` 为纯本地 pip install，无 `curl|bash` 远程执行；④ 无混淆 / 远程执行；⑤ 抖音子 skill 绕过水印、无登录下载，已在 SKILL.md 明确披露（标注「仅个人学习研究」），合规责任在用户；⑥ 依赖公开（ffmpeg、yt-dlp、faster-whisper、markitdown），无供应链风险；⑦ 无凭证窃取。

**风险评级**：🟡 中（`content-enrich` 子 skill 送数据到 DeepSeek；内容抓取可能涉及平台 ToS）。

> 安全审查基于审查时（2026-06）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/chubbyguan/chubbyskills)。
