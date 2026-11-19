---
title: "breferrari/obsidian-mind：配确定性校验钩子与本地 MCP 的 Obsidian 第二大脑长期记忆模板"
date: 2026-10-13
source: "Brenno Ferrari"
src: "https://github.com/breferrari/obsidian-mind"
risk: medium
theme: [digital-team]
repo: "breferrari/obsidian-mind"
stars: 5500
pushed: 2026-10-18
stats_at: 2026-11-03
tags: [知识库, Obsidian, 长期记忆, MCP, Skill]
summary: "可直接克隆使用的 Obsidian 知识库模板，配齐 Claude Code / Codex / Gemini 的事件钩子、20 个 /om-* 命令、10 个子智能体与本地 stdio MCP 服务，用确定性脚本校验 frontmatter、双链与笔记体积阈值。"
---

**简介**：将 Obsidian 仓库作为跨会话、跨项目长期记忆中心的开箱即用 vault 模板，内置面向 Claude Code、Codex 与 Gemini 的事件钩子、20 个 `/om-*` 快捷命令、10 个专项子 agent 以及本地 MCP 服务。

**要点**：践行「确定性程序管环境与校验、智能体管语义内容」的分工——分类校验、索引重建与上下文注入全部交由钩子脚本完成；记忆实体保存在 Obsidian vault 内，`~/.claude` 下的 `MEMORY.md` 仅作轻量指针；写入笔记时自动校验 YAML frontmatter、双向链接完整性与 25 KB 拆分阈值（遵循「没有双链的孤立笔记即 bug」原则）；通过 `vault-manifest.json` 严格划清基础设施文件与用户个人笔记边界，便于后续无损升级。MIT 许可。

**作者可信度**：中（柏林工程师 Brenno Ferrari 维护，附完整架构文档 `ARCHITECTURE.md` 与约 40 个自动化测试文件）。

**安全审查（七项客观事实，审查于 2026-10）**：① 隐藏指令——无广告或遥测指令，但 `SessionStart`、`UserPromptSubmit` 与 `Stop` 钩子会向会话注入较多任务状态与路由提示；② 外传——无数据外发，内置 `om` MCP 仅走本地 `stdio` 通信，且设有私密笔记过滤策略；③ 越权——注册 5 个事件钩子运行本地 Node 脚本，检测到原生模块 ABI 不匹配时会在启动阶段自动执行 `npm rebuild better-sqlite3` 并后台更新本地索引；调用 `reason` 工具时会派生只读的 `claude -p` 子会话；会写入 `~/.claude/projects/<slug>/memory/MEMORY.md`；④ 远程执行——无代码混淆或 `curl|bash`，`update-skills` 仅在手动执行时拉取上游；⑤ 主体功能与描述一致，但根目录残留一份沿用自 `kepano/obsidian-skills` 的 `plugin.json` 元数据；⑥ 供应链——完整安装依赖作者维护的 `shardmind` 全局包与 `@tobilu/qmd`（含 `better-sqlite3` 原生编译及首次从 Hugging Face 下载约 2 GB 本地嵌入模型），`update-skills` 拉取上游未锁 commit；⑦ 不读取 `.ssh`、`.env` 或浏览器 cookie。

**风险评级**：🟡 中（无外传与凭证风险，但事件钩子会在启动时自动编译本地原生模块、派生子会话，且首次运行需下载较大体积的本地嵌入模型）。

> 安全审查基于审查时（2026-10）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/breferrari/obsidian-mind)。
