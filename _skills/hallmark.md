---
title: "nutlope/hallmark：Together AI 出品的反同质化前端设计底线与主题发牌 skill"
date: 2026-11-03
source: "Together AI / Hassan El Mghari"
src: "https://github.com/nutlope/hallmark"
risk: medium
theme: [creative-web, design-teaching]
repo: "nutlope/hallmark"
stars: 46015
pushed: 2026-10-29
stats_at: 2026-11-03
stars_7d: 10517
tags: [设计视觉, 前端设计, 反AI味, 网页原型, Skill]
summary: "Together AI 推出的前端设计 skill（v2.0）：设 16 条可机检硬性底线、50 套主题发牌去重机制与「一屏一个想法」约束，通过 Floor / Reflex / Finish 三级质量门与 sloplint 渲染检查消除 AI 生成页面的模板趋同。"
---

**简介**：Together AI 推出的「反 AI 味」前端设计 skill（v2.0），通过不可豁免的机检底线、50 套主题发牌去重以及先做首屏再做全页的分步流程，避免连续生成的网页落入相同的紫蓝渐变与卡片堆砌套路。

**要点**：设定 16 条可由脚本检测的硬性底线（颜色与字体必须走 `:root` token、禁用 `transition: all`、禁用紫蓝渐变/卡片套卡片/emoji 充当图标、禁止编造业务指标与客户 logo、1280×800 首屏须完整容纳主标题与主按钮、单屏约 80 字等）；将质量门分为 Floor（必过）、Reflex（模型惯性默认，可附理由豁免并记录）与 Finish（提醒项）三级；开工前通过「发牌」脚本结合提示词与历史日志从 50 个主题中去重抽取方向，一次性列出全部设计决定（Picks 块）供确认，并通过「镜像测试」确保相近提示词不会产出雷同页面，最后用 `sloplint --render` 清零违规项。MIT 许可。

**作者可信度**：高（Together AI 官方开源项目，由开发者生态负责人 Hassan El Mghari / nutlope 发起）。

**安全审查（七项客观事实，审查于 2026-11）**：① 隐藏指令——无恶意隐藏指令，但底线第 15 条要求在生成的 CSS 首行写入 Hallmark 标记，且文档带有「Powered by Together AI」品牌标识；② 外传——在配置了 `TOGETHER_API_KEY` 环境变量时，`imagegen.mjs` 会将生图提示词发送至 `api.together.xyz`（可选功能）；`theme.mjs` 取图仅限 `upload.wikimedia.org` 白名单；未见上传项目源码；③ 越权——手动运行 `install-hook.mjs` 时会向项目或全局 `~/.claude/settings.json` 写入 `PostToolUse` 钩子，在每次编辑带 Hallmark 标记的文件后运行本地 `sloplint`（支持 `--remove` 卸载）；④ 远程执行——无混淆或远程代码执行；⑤ 功能与描述一致；⑥ 供应链——`package.json` 零外部依赖，截图脚本复用本机自备的 Puppeteer 与 Chrome；⑦ 仅按需读取 `TOGETHER_API_KEY` 与本机浏览器路径变量。

**风险评级**：🟡 中（可选钩子会改写 `.claude/settings.json`；配置 API Key 后会调用 Together AI 接口生图；默认要求在产出 CSS 中保留品牌注释）。

> 安全审查基于审查时（2026-11）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/nutlope/hallmark)。
