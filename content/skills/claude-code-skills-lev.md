---
title: "levnikolaevich/claude-code-skills：全生命周期开发 skill 套件"
date: 2026-06-24
source: "levnikolaevich"
url: "https://github.com/levnikolaevich/claude-code-skills"
tags: [开发, Skill, MCP]
summary: "137 个开发 skill + 4 个 MCP Server（哈希验证编辑、代码知识图谱、远程 SSH 编辑、本地研究索引），覆盖规划到优化全链路。"
---

**简介**：全生命周期开发 skill 套件，137 个 skill + 4 个 MCP Server（hex-line 哈希验证编辑、hex-graph 代码知识图谱、hex-ssh 远程 SSH 文件编辑、hex-research 本地研究索引），覆盖 Agile 规划→代码审计→文档生成→性能优化全链路。

**要点**：链路完整；`hex-ssh-mcp` 启用 SSH 远程操作，属高权限，需严格配置。

**活跃度**：498★ / v2026.05.06（MIT）。作者可信度：中（个人维护）。

**安全审查（七项客观事实，审查于 2026-06）**：① 无隐藏指令；② `hex-ssh-mcp` 操作用户自配置的 SSH 服务器，`hex-research`/`hex-graph` 写本地 SQLite，外部服务（Linear、GitHub、Context7、Ref）均需用户主动配置；③ `hex-ssh-mcp` 开启后可对配置中的 SSH 服务器读写文件，若被 prompt injection 利用可成跳板；④ 无混淆 / 远程执行，安装走标准 npm marketplace；⑤ 描述与行为一致；⑥ npm 发布、无私有来源，npm 包内容未读（建议引入前 `npm pack` 检查）；⑦ 无凭证窃取。

**风险评级**：🟡 中（`hex-ssh-mcp` 为高权限操作，结合 prompt injection 可成远程攻击面；个人维护）。

> 安全审查基于审查时（2026-06）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/levnikolaevich/claude-code-skills)。
