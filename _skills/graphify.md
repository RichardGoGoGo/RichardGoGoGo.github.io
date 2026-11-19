---
title: "Graphify-Labs/graphify：将代码库、文档与图片转化为可查询知识图谱与 GraphRAG 的分析 skill"
date: 2026-10-27
source: "Safi Shamsi / Graphify Labs"
src: "https://github.com/Graphify-Labs/graphify"
risk: medium
theme: [digital-team]
repo: "Graphify-Labs/graphify"
stars: 141200
pushed: 2026-11-02
stats_at: 2026-11-03
stars_7d: 5224
tags: [开发, 知识图谱, 上下文管理, GraphRAG, Skill]
summary: "将包含约 40 种语言源码、Markdown/PDF/Office 文档及音视频图片的文件夹转化为交互式 graph.html、graph.json 与一页架构报告，支持置信度边标注、覆盖率校验与经验沉淀（LESSONS.md），供 agent 查图替代盲目 grep。"
---

**简介**：将任意项目文件夹（支持约 40 种编程语言、Markdown/PDF/Office 文档、图片及音视频）转化为可查询知识图谱的 CLI 与配套 agent skill。运行后输出交互式可视化 `graph.html`、可供 GraphRAG 调用的 `graph.json` 以及一页核心架构摘要 `GRAPH_REPORT.md`（含核心节点、Leiden/Louvain 聚类社区、跨模块关联与建议追问），并支持导出为 Obsidian vault、Neo4j 或本地 MCP 服务。

**要点**：采用「确定性 AST + 并行子智能体语义抽取」两段式架构——代码文件走 tree-sitter AST 解析（不消耗 LLM token），文档、论文与图片则按块派发子智能体抽取；每条图谱边强制标注 `EXTRACTED`、`INFERRED` 或 `AMBIGUOUS` 并附置信度（禁用 0.5 默认值，不确定必须标 `AMBIGUOUS`）；内置覆盖率校验（比对子智能体实际读取行数与文件总行数，未读完标记 `partial` 待下次增量重抽）与提示词指纹缓存；支持通过 `graphify reflect` 将历次查询的有用路径与死胡同按时间衰减汇总进 `LESSONS.md`。Apache-2.0 许可。

**作者可信度**：高（Safi Shamsi 与 Graphify Labs 团队维护，近 400 位贡献者，配 `SECURITY.md`、Bandit/pip-audit CI 检查及 PyPI OIDC 可信发布）。

**安全审查（七项客观事实，审查于 2026-10）**：① 隐藏指令——无恶意隐藏指令或遥测；但 `graphify claude install` 写入的常驻提示会要求每次 `grep` 或读文件前先跑 `graphify query`，且 CLI 与完成输出中含有赞助链接与商业云版 `app.graphify.com` 推广提示；② 外传——查询日志默认本地关闭；但若环境中存在 `GEMINI_API_KEY` 等变量，处理非代码文档与图片时会自动选择对应云端模型抽取（可通过 `GRAPHIFY_BACKEND=none` 关闭）；抓取外部 URL 时内置内网与云元数据地址 SSRF 拦截；③ 越权——全局安装会向 `~/.claude/CLAUDE.md` 追加注册块、在 `.claude/settings.json` 注册 `PreToolUse` 钩子，并默认在运行命令时静默刷新各宿主目录下的旧版 skill 副本（可设 `GRAPHIFY_NO_AUTO_REFRESH=1` 关闭）；④ 远程执行——无代码混淆或 `curl|bash`，子进程参数均以列表传入防注入；⑤ 功能与描述总体一致，但 CLI 路径会自动探测环境变量中的主流模型 API Key；⑥ 供应链——PyPI 包名为 `graphifyy`（双 y），核心依赖带锁文件，但 skill 缺包自动安装指令带 `--upgrade` 未锁版本；⑦ 语料扫描器默认主动排除 `.env`、`*.pem`、`id_rsa`、`~/.ssh`、`~/.aws` 等敏感凭证文件并在输出中列出跳过项。

**风险评级**：🟡 中（全局安装会改写 `CLAUDE.md`、注册高频工具钩子并自动刷新本地 skill 副本；环境变量存在 API Key 时会默认启用云端抽取非代码文档）。

> 安全审查基于审查时（2026-10）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/Graphify-Labs/graphify)。
