---
title: "oh-my-mermaid/oh-my-mermaid：代码库架构可视化 skill"
date: 2026-09-21
source: "oh-my-mermaid"
src: "https://github.com/oh-my-mermaid/oh-my-mermaid"
tags: [开发, 架构可视化, Skill]
summary: "AI 分析代码库生成多维架构视图（Mermaid 图表 + 文档说明），复杂组件递归嵌套，本地生成 .omm/ 目录；本地模式完全离线，`/omm-push` 为可选云端分享。"
---

**简介**：代码库架构可视化 skill——AI 分析代码库生成「perspectives」（多维架构视图，含 Mermaid 图 + 文档说明），复杂组件递归嵌套，结果落本地 `.omm/` 目录；`/omm-push` 可选上传到 ohmymermaid.com 云端分享。

**要点**：可补充开发环节的技术文档能力；**本地模式完全离线**（`/omm-scan` + 本地 Mermaid 查看）；TypeScript 单一运行时依赖（yaml），package.json 无 install/postinstall 钩子；与 drawio-skill / archify 互补——本作针对**已有代码库的逆向文档化**。适合项目技术文档与课件图解。

**活跃度**：2,300★ / 更新至 2026-09-15（MIT）；项目账号维护，2.3k★ 有一定社区认可。

**安全审查（七项客观事实，审查于 2026-09）**：① 无隐藏指令，skills 目录为命令工作流文档；② 数据外泄——`/omm-push` 会将代码架构文档（Mermaid 图 + 结构说明）上传到 ohmymermaid.com 第三方云、需 GitHub OAuth，`/omm-scan` 仅本地读取不上传；③ 越权——npm 全局安装 `omm` CLI（标准），GitHub OAuth 令牌本地存储、不读 .ssh/.env；④ 无 `curl|bash`、无 install/postinstall 钩子；⑤ 描述与行为一致，云端分享为可选、文档已说明；⑥ 供应链 TypeScript、运行时仅 yaml 一个依赖、无私有源；⑦ 无凭证窃取，OAuth token 本地管理。

**风险评级**：🟡 中（`/omm-push` 会上传代码架构到第三方；不用云功能则本地完全安全，建议仅本地 `/omm-scan` 或仅对公开项目使用）。

> 安全审查基于审查时（2026-09）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/oh-my-mermaid/oh-my-mermaid)。
