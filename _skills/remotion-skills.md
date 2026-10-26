---
title: "remotion-dev/skills：Remotion 官方 agent skill 集（用 React 写程序化视频）"
date: 2026-10-06
source: "Remotion"
src: "https://github.com/remotion-dev/skills"
risk: low
theme: [creative-web]
repo: "remotion-dev/skills"
stars: 5732
pushed: 2026-10-26
stats_at: 2026-10-26
tags: [动效, AI视频, React, Skill]
summary: "Remotion 官方的 agent skill 集，教 agent 用 React + Remotion 编写、预览、渲染程序化视频：总路由 skill 下设 create、markup、maps、captions（本地 Whisper 字幕）、studio、render 等子 skill。仓库未附许可证文件，主仓的 Remotion License 规定员工超过 3 人的营利公司商用须购买公司许可。"
---

**简介**：Remotion 官方的 agent skill 集（主仓 packages/skills 的镜像），教 agent 用 React + Remotion 编写、预览、渲染程序化视频。

**要点**：一个总路由 skill，下设 create、markup、maps、captions（本地 Whisper 生成字幕）、studio、render、saas、upgrade 等子 skill。规则写得很硬：禁用 CSS 动画，一律用 useCurrentFrame 加 interpolate；默认打开预览，不默认渲染；第一条规则是保护用户已做的修改；地图等技术选型写成「只选一种、只读那一份文档」。

**作者可信度**：高（Remotion 官方）。

**许可说明（客观事实）**：仓库没有附 LICENSE 文件，按主仓的 Remotion License 理解：源码公开，但不是 OSI 认可的开源许可；员工超过 3 人的营利主体商用须购买 Company License，个人与非营利用途可使用免费许可。

**安全审查（七项客观事实，审查于 2026-10）**：① 无推广、署名或引流内容；② 渲染在本地完成；文档检索用 Algolia 的公开只读 key，外部 API（ElevenLabs、地图）均由用户自配 key；③ 明确规定不删 .env、.git，不让用户把密钥贴进对话；④ 无远程执行；⑤ 与描述一致；⑥ 供应链——npx create-video@latest 等命令版本不固定，渲染时会下载 Chrome Headless Shell；⑦ 无凭证窃取。

**风险评级**：🟢 低（注意命令版本不固定；商用须确认 Remotion 许可）。

> 安全审查基于审查时（2026-10）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/remotion-dev/skills)。
