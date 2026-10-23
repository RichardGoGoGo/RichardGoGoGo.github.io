---
title: "plugin87/ux-ui-agent-skills：UI/UX 设计系统套件，用浏览器实测把关的质量门"
date: 2026-10-20
source: "Thientan Soparat"
src: "https://github.com/plugin87/ux-ui-agent-skills"
risk: medium
theme: [creative-web, design-teaching]
repo: "plugin87/ux-ui-agent-skills"
stars: 2855
pushed: 2026-10-20
stats_at: 2026-10-23
tags: [UI 设计, 设计系统, 无障碍, Skill]
summary: "面向 Claude Code / Codex 的 UI/UX 设计系统套件：三层设计 token、52 个组件规范、WCAG 2.2 AA 到 AAA 的无障碍要求，以及 52 个用浏览器实测（不靠模型自述）的质量门；附「去 AI 味」检查脚本和 138 个以品牌命名的设计风格库。"
---

**简介**：面向 Claude Code 和 Codex 的 UI/UX 设计系统套件，包括 DTCG 三层设计 token、52 个组件规范、WCAG 2.2 AA 到 AAA 的无障碍要求，以及 52 个用浏览器实测的质量门；另附 138 个以设计系统命名的风格库。

**要点**：核心原则是「没测过的数字不准报」——门禁脚本用 Playwright 实测对比度、8 种交互状态、axe 无障碍检查、触控尺寸、溢出和从右到左排版。针对「AI 味」有三件套：动手做界面前必须先写一段需求推断（领域、受众与语气、情绪、动效程度、版式族、参考对象，每一行都要是决定而非形容词）、一份「禁用的默认做法」清单，以及根据渲染后的计算样式量化生成感的脚本（例如圆角单一、阴影千篇一律、紫蓝渐变、灰阶近似重复）；对抗式设计评审默认作品平庸，须先在两种宽度和亮暗模式下截图、点过控件再下结论。MIT。

**作者可信度**：中（Thientan Soparat 个人开发者，145 次提交几乎全由本人完成，更新日志透明，无知名背书）。

**来源说明（客观事实）**：design-systems/library/ 下的 138 个风格文件以真实品牌命名（如 apple、stripe、xiaohongshu），未注明来源。

**安全审查（七项客观事实，审查于 2026-10）**：① 无隐藏指令或推广；每个 SKILL.md 开头会检查套件是否完整，缺失时引导运行自家的 npx 安装命令；CLAUDE.md 用「资深设计架构师」人设覆盖全局设定并强制不用 emoji；② 运行时无外发代码，hooks 只写本地记录；③ 越权——注册 SessionStart、编辑后与 Stop 三个钩子，每次编辑都调用 python3 跑检查，改过 HTML 却没有实测记录时 Stop 钩子会阻止结束（有防死循环）；.claude/settings.json 预先放行 npm run 与 node hooks 命令，模板里的 settings 还会被复制进用户项目；④ 无 base64、eval、curl|bash；⑤ 行为与描述一致，品牌风格文件出处不明（见上）；⑥ 供应链——开发依赖用 ^ 范围但有锁文件，无 postinstall；MCP 模板中的 npx 命令未锁版本；⑦ 无凭证读取，MCP 配置用环境变量引用 API key。

**风险评级**：🟡 中（钩子会阻断会话结束；预授权 npm 脚本并复制进用户项目；品牌风格文件来源不明）。

> 安全审查基于审查时（2026-10）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/plugin87/ux-ui-agent-skills)。
