---
title: "Anthropic 发布 MCP 2026 规范：无状态 HTTP 优先、强制 OAuth 2.1 认证"
date: 2026-07-28
icat: 模型与工具
source: "MCP 官方文档"
src: "https://modelcontextprotocol.io/specification/2026"
tags: [MCP, Anthropic, 协议规范, OAuth, 无状态, 开发者工具]
summary: 「Anthropic 发布 MCP 2026 年版规范，将无状态 HTTP 传输列为首选模式并强制要求 OAuth 2.1 认证，大幅简化服务端部署复杂度。」
---

Anthropic 于 2026 年 7 月正式发布 Model Context Protocol（MCP）2026 年版规范。核心变更包括：将无状态 HTTP 传输模式（Streamable HTTP）提升为首选连接方式，取代此前依赖长连接的 SSE 模式；将 OAuth 2.1 列为所有远程 MCP 服务的强制认证标准，废弃原有的自定义 API Key 传递机制；新增资源订阅与采样（Sampling）接口的正式定义，以及多 Transport 并发连接的协商流程。规范变更同步在 Claude.ai 与 Claude Code 中推进落地测试。

> MCP 2026 规范的无状态优先与 OAuth 2.1 强制化，使 MCP 服务的云端部署安全性与互操作性向成熟 Web API 标准靠拢，对生态工具链的升级适配提出了明确的方向要求。
