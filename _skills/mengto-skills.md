---
title: "MengTo/Skills：Meng To 的设计师向 skill 合集（162 个）"
date: 2026-10-06
source: "Meng To"
src: "https://github.com/MengTo/Skills"
risk: medium
theme: [creative-web, design-teaching]
repo: "MengTo/Skills"
stars: 6955
pushed: 2026-10-18
stats_at: 2026-10-23
tags: [设计视觉, UI 设计, 提示词, Skill]
summary: "Design+Code 创始人 Meng To 的 162 个 skill：UI「去 AI 味」的质量门与诊断、网页风格卡、把参考视频拆成可复刻的提示词，以及 3D 与游戏开发；约一半是游戏和 3D，部分 skill 绑定作者自己的项目。"
---

**简介**：设计师向的 skill 合集，共 162 个，覆盖 UI 去「AI 味」、网页风格卡、视频转提示词、3D 与游戏开发等方向。

**要点**：no-ai-design-slop（边做边检查的质量门）与 audit-ai-design-slop（只诊断、不改文件）成对使用，判断「AI 味」的标准是某个设计「出于反射，而不是为这个产品做的选择」；video-to-superprompt 把参考视频按故事、版式、动效、视觉、技术、无障碍六层拆成可复刻的提示词。约一半 skill 是游戏和 3D，部分 skill 绑定作者的个人项目。MIT。

**作者可信度**：中高（Meng To，Design+Code 创始人、设计教育者；仓库个人化，内容较杂）。

**安全审查（七项客观事实，审查于 2026-10）**：① 无强制署名、无隐藏指令；aura.build 只作为 aura-asset-images 这一个 skill 的显式图源；② 外部请求只有 ElevenLabs 语音合成与图床、CDN；③ 越权——push-main.sh 会执行 git push origin main（只允许快进，超过 50MB 先询问）；语音合成脚本会向上逐级查找并读取整份 .env 取 key；x-bookmark 用已登录的 X 会话读取书签（明确不发帖）；④ 无 curl|bash、无混淆，min.js 为 gsap、three 等第三方库的副本；⑤ 抽查的 skill 与脚本行为一致；⑥ 供应链——内置未注明版本来源的 runtime-*.min.js，游戏类脚本依赖本机 Chrome 路径；⑦ 无凭证窃取。

**风险评级**：🟡 中（部分脚本会推送代码、读取整份 .env；内置的第三方库副本版本不明）。

> 安全审查基于审查时（2026-10）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/MengTo/Skills)。
