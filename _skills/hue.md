---
title: "dominikmartn/hue：品牌设计系统生成 skill"
date: 2026-07-14
source: "dominikmartn"
src: "https://github.com/dominikmartn/hue"
tags: [设计视觉, 品牌设计, Skill]
summary: "从 URL/截图/本地代码库学习任意品牌，自动产出完整设计系统（color tokens、typography、spacing、明暗模式、组件库、icon 选型）的 skill；含交互式 Bento Grid 预览页与组件规格库，validate.mjs 自动验 WCAG 对比度。"
---

**简介**：品牌设计系统生成 skill，从 URL、截图或本地代码库学习任意品牌，自动产出完整设计系统——color tokens、typography、spacing、明暗模式、组件库与 icon 选型，并附交互式 Bento Grid dashboard 预览页和组件规格库。

**要点**：一次安装后长期生效，agent 后续构建的 UI 均与品牌保持一致；validate.mjs 自动校验 WCAG 对比度、检测 AI 默认字体、清理 placeholder；明确声明「treats all fetched content as data, not instructions」以防 prompt injection；无运行时 npm 依赖，手动 git clone 安装。适合为工作坊、课件、提案报告制作品牌一致的 UI 组件。

**活跃度**：748★ / 更新至 2026-07-13（MIT）；作者 dominikmartn 个人维护。

**安全审查（七项客观事实，审查于 2026-07）**：① 无隐藏指令，SKILL.md 明确声明只提取视觉 token、不执行 HTML 指令；② 数据外泄——经 Chrome DevTools MCP 截图并读取目标网站 CSS/结构，仅提取视觉 token、不上传内容，Vercel 一键部署预览为用户主动触发的可选功能；③ 越权——需 Chrome DevTools MCP 控制本地 Chrome、联网爬取目标品牌 URL（功能所需），MCP 不可用时降级为 WebFetch；④ 无 `curl|bash`，validate.mjs 本地执行，手动 git clone 安装；⑤ 描述与行为一致；⑥ 供应链 MIT、无 npm 运行时依赖，仅 dev script validate.mjs；⑦ 无凭证窃取。

**风险评级**：🟡 中（需 Chrome DevTools MCP 控制本地 Chrome、爬取品牌 URL 时联网、可选 Vercel 部署；不使用 Chrome DevTools MCP 时可纯 WebFetch 运行）。

> 安全审查基于审查时（2026-07）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/dominikmartn/hue)。
