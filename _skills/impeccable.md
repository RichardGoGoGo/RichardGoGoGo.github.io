---
title: "pbakaus/impeccable：给编程 agent 用的前端设计规范与审稿 skill"
date: 2026-10-06
source: "Paul Bakaus"
src: "https://github.com/pbakaus/impeccable"
risk: medium
theme: [creative-web, design-teaching]
repo: "pbakaus/impeccable"
stars: 77143
pushed: 2026-10-06
stats_at: 2026-10-06
tags: [设计视觉, 前端设计, 设计系统, Skill]
summary: "让编程 agent 做网页时遵循一套设计规范并自查：1 个入口 skill、24 个子命令（shape、critique、audit、polish、typeset、layout 等），配确定性检测引擎和浏览器内实时改稿；产品事实与视觉方向分别写在 PRODUCT.md 和 DESIGN.md。"
---

**简介**：前端设计 skill，让 Claude Code 等编程 agent 做网页时遵循一套设计规范，并能自己审稿。1 个入口 skill 下有 24 个子命令，涵盖构思（shape）、评审（critique）、审计（audit）、打磨（polish）、排字（typeset）、版式（layout）等，配有确定性的检测引擎和在浏览器里实时改稿的工具。项目由 Anthropic 的 frontend-design skill 演化而来。

**要点**：产品事实写在 PRODUCT.md、视觉方向写在 DESIGN.md，两份分开维护；按页面上「访客怎样算成功」分为说服、操作、阅读、体验四种模式；把质量线分成「可验证项」和「一律拒绝项」；验证轮数有上限，最多两轮截图后停手；critique 按尼尔森 10 条可用性原则逐项打 0–4 分。Apache-2.0。

**作者可信度**：高（Paul Bakaus，前 Google 开发者布道师、jQuery UI 作者）。

**安全审查（七项客观事实，审查于 2026-10）**：① 隐藏指令——检测引擎的输出会注入两条覆盖宿主设定的指令：在「用户不在场」的系统提示下仍坚持先提问，并把调用 skill 视为已授权派生子 agent；② 外传——选设计方向时会请求 impeccable.style 的接口并上报所选卡片类别，默认开启，可用 DO_NOT_TRACK 或 IMPECCABLE_NO_TELEMETRY 关闭；这一点只写在 CLI 文档里，README 没写；未见上传项目文件；③ 越权——注册 SessionStart、编辑后（PostToolUse）与 Stop 三个钩子，每次编辑都会运行二进制；④ 远程执行——本地没有二进制时从 GitHub Releases 下载，按同源 .sha256 校验后执行；⑤ 功能与描述一致，但遥测对普通用户披露不足；⑥ 供应链——默认使用预编译二进制，源码在 crates/ 目录，可自行编译；⑦ 无凭证窃取，生图功能读取 OPENAI_API_KEY 直连 OpenAI，属预期用途。

**风险评级**：🟡 中（会注入覆盖宿主设定的指令；默认开启的遥测在 README 中未说明；编辑钩子会运行预编译二进制）。

> 安全审查基于审查时（2026-10）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/pbakaus/impeccable)。
