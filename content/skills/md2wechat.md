---
title: "md2wechat：Markdown 转公众号 HTML skill"
date: 2026-06-22
source: "geekjourneyx"
url: "https://github.com/geekjourneyx/md2wechat-skill"
tags: [内容发布, Skill, 公众号]
summary: "Markdown→公众号 HTML（43 排版模块）+ 推草稿箱 + AI 配图。"
---

**简介**：Markdown 转公众号 HTML（43 个排版模块）+ 推送草稿箱 + AI 配图。

**要点**：发布端排版能力强；需微信 AppID / Secret（本地配置文件）。

**作者可信度**：中。

**安全审查（客观事实）**：注意——其 OpenClaw 安装方式走 `curl|bash`，建议改用手动 / npx 安装（核心功能本身无远程执行）；凭证以本地明文存放，建议设权限保护；npm 安装会拉取远程代码，建议审查依赖链；未见动态代码执行。带凭证 / 发布类能力的 skill 建议放隔离环境运行。

**风险评级**：🟡 中（避开 curl 安装方式 + 隔离环境 + 护好凭证）。

> 安全审查基于审查时（2026-06）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/geekjourneyx/md2wechat-skill)。
