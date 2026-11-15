---
title: "jakubkrehel/skills：设计工程师 Jakub Krehel 的界面六维审计与证据化打磨 skill 合集"
date: 2026-11-03
source: "Jakub Krehel (interfaces.dev)"
src: "https://github.com/jakubkrehel/skills"
risk: low
theme: [creative-web, design-teaching]
repo: "jakubkrehel/skills"
stars: 10373
pushed: 2026-11-01
stats_at: 2026-11-03
stars_7d: 1707
tags: [设计视觉, 前端设计, UI评审, 可访问性, 字体排版, Skill]
summary: "由 interfaces.dev 作者 Jakub Krehel 编写的 14 个界面工程 skill 合集：按「可访问性→版面→界面文案→字体排印→色彩→UI 打磨」顺序编排跨领域审查，坚持「证据而非主观品味」，每条问题必须绑定文件行号与当前实现。"
---

**简介**：设计工程师 Jakub Krehel（`jakub.kr` 与 `interfaces.dev` 作者）开源的前端界面设计与工程审查 skill 合集，包含可访问性、版面、界面文案、字体排印、色彩、UI 打磨六个核心领域 skill，以及跨领域总控评审、增量改动评审、组件全状态渲染与技术拆解图（teardown）等共 14 个子 skill。

**要点**：总控入口 `better-interface` 严格按照「可访问性 → 版面 → 文案 → 字体 → 色彩 → 打磨」的优先级顺序调度各领域子 skill，确保基础可用性缺陷不会被表面的视觉打磨掩盖；核心原则是「证据而非品味（Evidence over Taste）」——每条审查发现必须附带具体的 `文件:行号` 与当前代码实现，仅凭主观好恶的不算有效问题，无法在当前环境验证的检查项必须诚实标记为「未验证」而非猜测；审查前先读取项目自身的 `CONTRIBUTING` 或设计系统文档，并将「无障碍名称缺失、焦点样式缺失」等列为直接升级高优的硬性触发项。MIT 许可。

**作者可信度**：高（Jakub Krehel，知名设计工程师与 Interfaces 设计工程刊物作者）。

**安全审查（七项客观事实，审查于 2026-11）**：① 隐藏指令——无隐藏指令，`interface-review` 标记为仅限用户显式手动调用；② 外传——无任何数据外发，技术拆解图的导出脚本仅请求本地资源生成 PDF；③ 越权——`teardown` 模块使用临时配置启动本机无头 Chrome 进行渲染核对，无浏览器时 `explain-interface` 仅对用户显式提供的 URL 执行 `curl`；④ 远程执行——无编码载荷或远程脚本拉取；⑤ 功能与描述完全一致；⑥ 供应链——核心领域审查 skill 均为纯 Markdown；仅 `teardown` 模块需用户自行安装 `jspdf`、`svg2pdf.js` 与 `@fontsource-variable/inter`（文档未锁定版本号，安装时宜手动固定版本）；⑦ 不读取环境变量或任何凭证。

**风险评级**：🟢 低（核心 6 大领域审查与总控编排均为纯 Markdown 文档，无联网或越权行为）。

> 安全审查基于审查时（2026-11）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/jakubkrehel/skills)。
