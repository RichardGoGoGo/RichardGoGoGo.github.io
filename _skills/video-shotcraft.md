---
title: "Vincentwei1021/video-shotcraft：Remotion 产品宣传片 skill（镜头配方卡 + 成片模板）"
date: 2026-09-30
source: "Vincentwei1021"
src: "https://github.com/Vincentwei1021/video-shotcraft"
risk: medium
theme: [creative-web]
repo: "Vincentwei1021/video-shotcraft"
stars: 9968
pushed: 2026-09-28
stats_at: 2026-09-30
tags: [设计视觉, 动效, AI视频, Skill]
summary: "把前端项目或网页做成电影感产品宣传片的 skill：157 张镜头配方卡与 214 条动态样片、可直接渲染的 Remotion 成片模板，真实页面截图 + 2.5D 运镜 + 节奏卡点 + 音效，本地渲染 MP4，可导出剪映工程。"
---

**简介**：产品视频 skill，让 Claude Code / Codex 用 Remotion（React）完成分镜、动画和声音设计，产出宣传片、发布视频或功能演示。素材是真实页面截图，配合 2.5D 运镜、节奏卡点和音效。三种工作模式：现成模板（Ink Press）、自主创作、共同创作，开工前由 agent 检查产品并说明各模式是否适合。

**要点**：157 张镜头配方卡、214 条动态样片（在线 Gallery 可检索），附可直接渲染的完整 Remotion 模板，主题可在纸质、暗黑、复古牛皮纸等 9 种之间切换。渲染全部在本地；交付后自动在本机启动浏览器工作台（`localhost:5198`），按镜头 / 转场 / 字幕 / 音效分轨，可改文案、颜色、字号后重新导出；也可导出剪映工程草稿（需 `pyJianYingDraft`）。Apache-2.0。

**作者可信度**：中（Vincentwei1021 个人维护，同时维护 anything2explainer、video-talkcraft）。

**来源说明（客观事实）**：SKILL.md 的「交付收尾」要求 agent 依次告诉用户三件事：① 发布到社交平台时可在简介 @ 作者的 X / 抖音 / 小红书账号（写明非强制），并要求贴出可点击的链接；② 邀请把成片提交到作者的作品展示页（GitHub issue 表单），并要求 agent 用日常语言表述、不出现 issue 等技术词；③ 成片可导出剪映工程。渲染引擎 Remotion 有独立许可，个人与小团队免费，公司可能需要付费。核查于 2026-09-30。

**安全审查（七项客观事实，审查于 2026-09）**：① 无关任务——SKILL.md 要求 agent 在交付后主动发送作者社交账号和作品展示页邀请，虽标注自愿，但与视频制作功能无关；② 视频渲染全在本地（Remotion），`gallery/fetch-media.sh` 只用 gh CLI 下载 GitHub Releases 上的公开样片，无用户内容外传；③ 越权——需 Node.js、npm、Python 与 librosa，headless 浏览器只截取本地 dev server 页面，不读系统敏感路径；④ 无 `curl|bash`，npm 标准安装，无 base64 混淆；⑤ 视频制作流程与描述一致，交付后的推广步骤写在 SKILL.md 中但位置不显眼；⑥ 供应链——Remotion（商业许可需自行确认）、pyJianYingDraft（非官方剪映接口，MIT）、librosa；npm 依赖链未全审；⑦ 无凭证窃取。

**风险评级**：🟡 中（SKILL.md 含与功能无关的推广步骤；Remotion 商业许可需自行确认；npm 依赖链未全审；作者无公开机构背景）。

> 安全审查基于审查时（2026-09）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/Vincentwei1021/video-shotcraft)。
