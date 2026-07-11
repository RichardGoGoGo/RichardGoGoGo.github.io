---
title: "JimLiu/baoyu-skills：宝玉 skill 合集（内容生成 + 发布）"
date: 2026-07-11
source: "JimLiu（宝玉）"
src: "https://github.com/JimLiu/baoyu-skills"
tags: [设计视觉, 内容发布, Skill]
summary: "宝玉出品的 skill 合集：内容生成类（小红书卡片/信息图/SVG 图/封面/幻灯片/漫画）+ 发布类（公众号/微博/X，支持 API 与 Chrome CDP 浏览器自动化）；建议按子 skill 单装，风险按类区分。"
---

**简介**：宝玉（JimLiu）的 skill 合集，分两类——**内容生成类**（xhs-images 小红书卡片 / infographic 信息图 / diagram SVG 图 / cover 封面 / slide 幻灯片 / comic 漫画），能力强、风格多；**发布类**（post-to-wechat / weibo / x），发布到公众号、微博、X，支持 API 模式与 Chrome CDP 浏览器自动化。TypeScript 工具链。

**要点**：视觉生成子 skill 多为本地文件操作；发布子 skill 涉及凭证与浏览器自动化，权限较重。**建议按子 skill 单装、按需取用，不整包引入。**

**活跃度**：作者可信度高（宝玉，业内知名）。

**安全审查（七项客观事实，审查于 2026-07）**：① 无隐藏指令；② 数据外泄 / 凭证——视觉生成子 skill 多为本地文件 I/O（低风险），发布子 skill 读取 `.env` 凭证（如 WECHAT_APP_SECRET 等）、第三方 cookie 存本地 Chrome Profile；③ 越权——发布子 skill 使用 Chrome CDP 自动化登录，`post-to-wechat --remote` 走 SSH SOCKS5 隧道，属功能需要但攻击面大；④ 无动态代码执行 / 混淆；⑤ 描述与行为一致；⑥ 供应链为 TypeScript / npm；⑦ 凭证存本地。

**风险评级**：🟡 中（视觉生成子 skill 偏低、可单独使用；发布子 skill 为高权限操作，需隔离环境并严管凭证）。

> 安全审查基于审查时（2026-07）的源码与文档，使用前请再核一次；发布类子 skill 建议只在隔离环境使用。来源：[GitHub](https://github.com/JimLiu/baoyu-skills)。
