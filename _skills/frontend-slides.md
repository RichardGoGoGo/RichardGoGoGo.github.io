---
title: "zarazhangrui/frontend-slides：零依赖 HTML Slides 生成"
date: 2026-07-09
source: "zarazhangrui"
src: "https://github.com/zarazhangrui/frontend-slides"
tags: [设计视觉, Slides, HTML, Skill]
summary: "零依赖 HTML 幻灯片生成 skill——固定 1920×1080 舞台、单文件 HTML 内联 CSS/JS，含 34 套设计模板，可选 Vercel 发布或 PDF 导出。"
---

**简介**：生成单文件 HTML 幻灯片 deck，固定 1920×1080 舞台、内联 CSS/JS，无 npm / 构建工具；提供 34 套设计模板，可选发布到 Vercel 或导出 PDF；仅 PPT 转换时需本地 python-pptx。常与 humanize-ppt 配合（后者出 Brief，本 skill 渲染 HTML deck）。

**要点**：零运行时依赖；核心生成全本地（单 HTML 文件）；Vercel 部署为用户主动触发的可选分享功能。

**活跃度**：23.9k★ / 2026-06-30 更新（MIT）。作者：个人维护，社区使用量大。

**安全审查（七项客观事实，审查于 2026-07）**：① 无隐藏指令；② 核心生成全本地，`deploy.sh` 上传 Vercel 为可选、非默认；③ 安装走 marketplace 或 git clone，Python python-pptx 为本地可选依赖，字体取自 Google Fonts / Fontshare CDN；④ 无 curl|bash 远程执行、无 base64 混淆；⑤ 描述与行为一致，Vercel 部署已在 README 标为可选；⑥ 无 npm 运行时依赖，供应链干净；⑦ 无凭证窃取。

**风险评级**：🟢 低。

> 安全审查基于审查时（2026-07）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/zarazhangrui/frontend-slides)。
