---
title: "AgriciDaniel/claude-obsidian：Obsidian 智能知识库 skill"
date: 2026-07-14
source: "AgriciDaniel"
src: "https://github.com/AgriciDaniel/claude-obsidian"
tags: [取料, 知识管理, Skill]
summary: "基于 LLM Wiki 模式的 Obsidian 知识库 skill：Claude 自动把摄入内容组织成相互关联的 Markdown 知识图谱；15 个 skill、3 个 agent，涵盖摄入/查询/混合语义检索/笔记自检，支持 LYT/PARA/Zettelkasten 三种组织法，本地优先、可 --no-llm 完全离线运行。"
---

**简介**：基于 Karpathy「LLM Wiki」模式的 Obsidian 智能知识库 skill，Claude 自动将摄入的内容组织成相互关联的 Markdown 知识图谱；含 15 个 skill、3 个 agent，涵盖摄入、查询、混合语义检索、笔记自检与架构决策，支持 LYT / PARA / Zettelkasten 三种组织方式。

**要点**：本地优先，核心功能全在本地 Markdown + SQLite 完成；BM25 + cosine reranking 混合检索（可选 ollama 本地向量，无则退化为 BM25）；向 Anthropic API 发送 wiki 内容前会明确弹出同意提示，`--no-llm` 可完全本地运行。与站内 obsidian-second-brain 互补——本作以知识图谱 / wiki 为核心，后者侧重多平台 AI 工具集成。

**活跃度**：9,324★ / 更新至 2026-07-14（MIT）；作者 AgriciDaniel 同时维护 claude-seo（11k★）、claude-ads（7k★）等多个活跃 skill，产出多但非知名个人品牌。

**安全审查（七项客观事实，审查于 2026-07）**：① 无隐藏指令，CLAUDE.md 为贡献 / 发布指南、与目的一致；② 数据外泄——setup-retrieve.sh 读取 `ANTHROPIC_API_KEY` 仅供本地 `claude` CLI 调用，发送 wiki 内容前弹出明确同意提示、`--no-llm` 可完全本地，retrieve.py 无外部网络调用；③ 越权——setup-vault.sh 从 GitHub 下载 Excalidraw 插件 main.js（写盘非 pipe 执行、满足条件才触发），setup-retrieve.sh 的 curl 仅指向 localhost:11434（本地 ollama），不读 .ssh/.env 等敏感路径；④ 无 `curl|bash`、无混淆、无远程代码执行；⑤ 描述与行为一致，各外部依赖均在文档说明；⑥ 供应链为 Python（uv/pyproject.toml）+ Shell / MIT、依赖公开标准库；⑦ 无凭证窃取，API key 仅本地 CLI 使用、不外传。

**风险评级**：🟡 中（Excalidraw 二进制从 GitHub 下载需核实完整性；retrieve 发送 wiki 内容到 Anthropic API 时需人工同意；release-blog 子命令涉及 Vercel 部署）。

> 安全审查基于审查时（2026-07）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/AgriciDaniel/claude-obsidian)。
