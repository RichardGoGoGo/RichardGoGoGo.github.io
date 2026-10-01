---
title: "AgriciDaniel/claude-blog：英文博客写作与 SEO 全流程 skill 套件"
date: 2026-09-30
source: "AgriciDaniel"
src: "https://github.com/AgriciDaniel/claude-blog"
risk: medium
theme: [digital-team]
repo: "AgriciDaniel/claude-blog"
stars: 2295
pushed: 2026-09-25
stats_at: 2026-10-01
tags: [写作, 博客, SEO, Skill]
summary: "面向博客的 Claude Code skill 套件（1 个编排器 + 31 个子 skill、5 个 agent），覆盖选题策略、大纲、写作、改写、SEO 与 Schema、多语言发布、配图和音频；每篇稿件交付前要过 5 道检查关卡，百分制审稿低于 90 分不交付。"
---

**简介**：博客内容全流程 skill 套件，覆盖选题策略、brief、大纲、写作、改写、分析、Schema、AI 引用准备度、站点审计、主题集群、多语言发布、音频旁白和内容衰减检测。当前 2.2.0 版（2026-08-26）为 1 个编排器 + 31 个子 skill、30 个 `/blog` 命令、5 个专用 agent，主要面向英文博客平台（Next.js、Hugo、WordPress 等）。

**要点**：稿件交给用户前依次通过 5 道关卡：能力发现、格式完整、视觉核验、内容审稿（`blog-reviewer` 按百分制审稿，低于 90 分或存在 P0 问题不交付，最多迭代 3 轮）、素材与链接完整性。每篇稿件输出 Markdown 源文件、HTML、PDF、题图、三种视口截图和审稿报告。品牌与语气文件（BRAND.md / VOICE.md）等不可信上下文用随机 nonce 分隔隔离，防提示注入。配图可走 Gemini 图像生成或图库 API，音频旁白用 Gemini TTS（均为可选功能）。MIT。

**作者可信度**：中（AgriciDaniel 个人维护，同时维护 claude-seo、claude-obsidian、banana-claude 等多个 skill）。

**来源说明（客观事实）**：README 提供三种安装方式：克隆仓库并切到发布标签后运行 `install.sh`；`curl … | bash` 一行命令（可固定版本）；先下载 `install.sh`，按 README 给出的 SHA-256 校验后再运行。核查于 2026-09-30。

**安全审查（七项客观事实，审查于 2026-07）**：① 无隐藏指令，用 CSPRNG 生成的 128 位 nonce 隔离不可信上下文文件；② 数据外泄——核心生成在本地，`data/google-updates.json` 本地读取；多语言模式是否调用外部翻译 API 未能确认；③ 越权——install.sh 写入 `~/.claude/`，权限范围与功能相符；④ install.sh 提供 `curl|bash` 安装方式；FLOW 框架引用上游 AgriciDaniel/flow（CC BY 4.0），该外部依赖未核实；⑤ 子 skill 覆盖博客全流程，质量关卡与描述一致；⑥ 供应链——31 个子 skill 与 requirements.txt 未全部审读；⑦ 无凭证窃取。审查范围为 SKILL.md 安全摘要与仓库结构。

**风险评级**：🟡 中（安装方式含 `curl|bash`；子 skill 供应链未全审；多语言模式是否外传内容未确认；以英文博客平台为主）。

> 安全审查基于审查时（2026-07）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/AgriciDaniel/claude-blog)。
