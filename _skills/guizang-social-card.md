---
title: "guizang-social-card：小红书图文 + 公众号封面 + Live Photo 出图 skill"
date: 2026-11-03
source: "op7418（归藏）"
src: "https://github.com/op7418/guizang-social-card-skill"
risk: medium
theme: [design-teaching, creative-web]
repo: "op7418/guizang-social-card-skill"
stars: 7929
pushed: 2026-10-30
stats_at: 2026-11-03
stars_7d: 182
tags: [设计视觉, Skill, 配图, 社媒卡片]
summary: "从文章、截图、字幕或视频生成小红书图文组图（1080×1440）、公众号封面对（21:9 + 1:1）与 Live Photo 动态卡片；提供电子杂志 Editorial 与瑞士 Swiss 两套视觉体系，本地 Playwright 渲染成图并配静态校验。"
---

**简介**：归藏（op7418）出品的社交媒体视觉卡片生成 skill，支持从文章、文案、截图、字幕、照片或视频一键规划并生成小红书图文组图（1080×1440）、公众号双尺寸封面（21:9 + 1:1）以及 Live Photo 动态卡片，内置「电子杂志 Editorial」与「瑞士国际主义 Swiss」两套视觉体系，通过 HTML 排版与本地 Playwright 直接渲染输出高清 PNG。

**要点**：2026 年 10 月底完成大版本重构（接入 `guizang-design` 设计 token、字体管理与 WebGL 视觉特效）；强调「先按正文语义规划卡片序列、再进版式排版」；将版式库、主题预设、标题缩写规则、截图处理、地图组件及图片压字可读性规范拆分为独立 reference；配图优先检索真实摄影图库（Unsplash、支持中文关键词的 Pexels、Flickr CC、Wallhaven）并自动写入 `SOURCES.md` 溯源；交付前通过 `validate-social-deck.mjs` 执行静态结构校验与 QA 清单检查。AGPL-3.0 许可（另附商业授权说明）。

**作者可信度**：高（归藏 op7418，知名中文 AI 设计创作者）。

**安全审查（七项客观事实，审查于 2026-11）**：① 隐藏指令——无隐藏指令，SKILL.md 正文中未混入赞助商推广段落；② 外传——无代码或项目数据外发，联网仅用于检索下载图库配图与开源字体；③ 越权——字体脚本 `gz-fonts.mjs` 会从 Google Fonts 及 GitHub 官方字体仓下载字体并缓存至 `~/.cache/guizang-design/fonts`，同时读取 `~/.config/guizang-design/fonts.json` 用户字体配置；④ 远程执行——无混淆或 `curl|bash`，但 Swiss 模板通过 CDN 加载未锁版本的 `unpkg.com/lucide@latest`；⑤ 功能与描述一致；⑥ 供应链——依赖 `playwright` 与 `subset-font`（带 `package-lock.json`）；默认图源中的 Wallhaven 含用户上传内容，商业发布前需留意图片版权核验；⑦ 不读取环境变量凭证或私钥。

**风险评级**：🟡 中（2026-10 更新后新增在线字体缓存写入与未锁版本的 `lucide@latest` CDN 引用；商用需注意 AGPL-3.0 协议与图库版权）。

> 安全审查基于审查时（2026-11）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/op7418/guizang-social-card-skill)。
