---
title: "AI 创意建站"
date: 2026-07-07
category: knowledge
permalink: /knowledge/creative-web/
tags: [知识库, 创意建站, Web动效]
summary: "从「想法 → 有动效的上线网页」的 AI 辅助建站方法库：动效技法、实现手法与库、vibe coding 工作流、高完成度视觉做法。审美倾向 React Bits 式抽象 + 代码前置。"
---

面向需要品牌 / 产品 / 作品集 / 活动创意站的团队，从「想法 → 有动效的上线网页」的 AI 辅助建站方法库；审美倾向 React Bits 式抽象 + 代码前置。也是我们自己 [VIBE 工具箱](/vibe/) 与落地页手法的方法沉淀。

## 本期综述（时间线，倒序）

{% assign reviews = site.pages | where: "line", "creative-web" | where: "review", true | sort: "date" | reverse -%}
{% if reviews.size > 0 -%}
{% for r in reviews -%}
- [{{ r.title }}]({{ r.url }}) · {{ r.date | date: "%Y-%m-%d" }}
{% endfor -%}
{% else -%}
_首期综述即将发布——每轮扫描当期真有料的新技法 / 新库 / 新工具 / 新范例，附来源与可运行 demo 链接，累积成时间线。_
{%- endif %}

## 覆盖面

综述每期扫描这些子领域（有料才写、无料跳过并注明）：

- Web 动效技法图鉴（入场 / 循环 / 鼠标交互；名词 → 迷你演示，见 [动效图鉴](/vibe/motion-techniques/)）
- 动效实现手法与库（CSS / SVG / JS；React Bits 式抽象组件；代码前置）
- vibe coding 建站工作流（AI 辅助从想法到上线；Lovable / Claude 等）
- 视觉风格与「高完成度」做法（waaark 式线稿 / 等距拟物、配色体系、排版节奏）
- 常用组件 / 交互模式（轮播 / 时间轴 / 内嵌矢量「截图」/ 日夜主题切换 / 计数动画）
- 设计到代码（design-to-code、Figma → 前端、设计模板逆向）
- 性能 / 无障碍 / 响应式（prefers-reduced-motion、移动适配）
- 部署与技术栈（GitHub Pages / Jekyll、Lovable、静态托管）

> 起点素材：VIBE 工具箱的「Web 交互动效图鉴」与现有落地页手法（轮播 / 时间轴 / 矢量截图示意 / 主题切换等）。
