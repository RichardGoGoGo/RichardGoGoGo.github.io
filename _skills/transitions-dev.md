---
title: "Jakubantalik/transitions.dev：UI 过渡动效配方库与动效 token 规范"
date: 2026-10-20
source: "Jakub Antalik"
src: "https://github.com/Jakubantalik/transitions.dev"
risk: medium
theme: [creative-web, design-teaching]
repo: "Jakubantalik/transitions.dev"
stars: 5535
pushed: 2026-10-23
stats_at: 2026-10-23
tags: [动效, 交互设计, CSS, Skill]
summary: "35 个 CSS / React 界面过渡动效配方和一套动效 token 规范，免费 skill 按「可见的界面元素 + 动作」选动效并统一时长、位移、缩放、模糊、缓动；同仓另有付费的 Motion Agent，修复时会把源文件发到作者的云端服务。配方免费可商用但禁止再分发。"
---

**简介**：界面过渡动效配方库（CSS 与 React，共 35 个配方）和动效 token 规范，同仓还有一个商业版 Motion Agent（命令行工具和 GitHub Action），给代码库里的动效打分并通过云端修复。

**要点**：免费的 transitions-dev skill 先看「可见的界面元素」、再看动作来选动效，两种都合适时取开销更低的，所有配方都考虑了用户「减少动效」的系统设置；transitions-polish 把时长、位移、缩放、模糊、缓动五个维度收敛成 token，按用途匹配而不是按数值就近取，打开与关闭、悬停进入与离开采用不对称的动效。

**作者可信度**：中（Jakub Antalik 单人维护，549 次提交；产品在真实运营，有官网和付费方案，但隐私政策地址仍是占位符）。

**许可说明（客观事实）**：采用作者自定的双许可：transitions/ 与 skills/ 目录免费可商用，但禁止再分发配方库本身或包装成同类产品；agent/、cli/ 等目录为 MIT；公司使用 Agent 需购买 Business 版。

**安全审查（七项客观事实，审查于 2026-10）**：① 两个免费 skill 只是配方，无隐藏指令；付费 agent 的 SKILL.md 商业引导明显，要求 agent 不要自己改动效、只给两个选项、申请提升网络权限，并写有「始终使用此 skill」；② 外传——fix 命令会把有问题的源文件全文发到作者的云端接口（README 有说明），服务端记录邮箱、套餐、文件数和分数等信息；只扫描不联网；③ 越权——号称只读的扫描会静默写入 ~/.claude/skills/ 下的 skill 文件，并向 ~/.codex/AGENTS.md 追加内容；生成的 CI 配置申请仓库写入和 PR 写入权限，并执行 gh secret set；④ 无混淆，但每次用 npx …@latest 拉最新版，CI 模板引用上游 main 分支，上游一改就会在用户的 CI 里执行；⑤ 免费与付费边界写得清楚，不符之处同③；⑥ 供应链——agent 包零 npm 依赖，发布未见来源证明，@latest 与 @main 均未锁版本；⑦ 只处理自家的许可证 key，不打印，GitHub token 只用于评论和开修复 PR。

**风险评级**：🟡 中（免费配方部分风险低；付费 agent 会上传源文件、改写主目录下的 agent 配置，并在 CI 中执行未锁版本的上游代码）。

> 安全审查基于审查时（2026-10）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/Jakubantalik/transitions.dev)。
