---
title: "DietrichGebert/ponytail：主张「最小完整改动」与结构化四段式代码审计的工程纪律 skill"
date: 2026-10-27
source: "Dietrich Gebert"
src: "https://github.com/DietrichGebert/ponytail"
risk: medium
theme: [digital-team]
repo: "DietrichGebert/ponytail"
stars: 177200
pushed: 2026-10-18
stats_at: 2026-10-27
stars_7d: 9387
tags: [开发, 工程规范, 代码审查, 技术债, Skill]
summary: "适配 Claude Code、Codex、Cursor 等 15+ 宿主的编码纪律插件（v5）：核心准则为「能完整解决任务的最小改动」，配六级复用优先级、永不削减安全清单、shortcut 技术债台账与「是什么/问题/修法/后果」四段式审查报告。"
---

**简介**：面向 Claude Code、Codex、Cursor、Copilot 等 15 种以上宿主的编码纪律与质量审查 skill 套件（v5），以「对方案求简、对关联改动与测试绝不偷懒」为核心，配套提供全量代码审计（`review` / `audit`）、`shortcut:` 技术债台账以及可选的本地复用与成本看板（`band`）。

**要点**：动手写代码前要求先列出「改动必须触达的全部调用方、测试、配置与导出」，并按「是否需要存在 → 仓库已有实现 → 标准库/平台原生 → 已安装依赖 → 单行实现 → 最小自建实现」六级阶梯选用第一个可行方案；设「永不削减」硬性红线（信任边界校验、防数据丢失错误处理、安全性、无障碍支持、用户显式需求）；非平凡逻辑必须附带小测试或断言自检，已知上限的临时捷径强制注释 `shortcut: <上限>, <何时升级>` 并可用 `/ponytail-debt` 汇总台账；代码审查按「正确性 → 安全 → 负载能力 → 测试覆盖 → 性能 → 精简度」排序，每条发现必须给出具体触发场景并按固定四段（现状 / 问题 / 修法 / 不修后果）编写。MIT 许可。

**作者可信度**：中（Dietrich Gebert 发起，逾 130 位社区贡献者参与迭代，配跨 15 种宿主的测试套件、公开基准测试方法说明与 npm OIDC provenance 发布）。

**安全审查（七项客观事实，审查于 2026-10）**：① 隐藏指令——无恶意提示注入，但启用插件钩子后会在每次 `SessionStart`、`SubagentStart` 与 `UserPromptSubmit` 注入规则，并首次提示引导配置状态栏；② 外传——默认纯本地运行；但插件配置中含可选的 `webhookUrl`（默认为空），若用户主动填入第三方地址，每轮会将任务元数据及首条提示词前 60 字（`sendNames` 默认开启）POST 至该地址；③ 越权——可选的 `band` 看板模块在会话中会调用 `git grep` 统计复用、读写 `~/.config/ponytail/band/*.csv`，运行 `band import` 时会扫描 `~/.claude/projects/` 下的历史会话统计 token 与字数（仅写本地 CSV）；④ 远程执行——无代码混淆、无 `eval` 或 `curl|bash`，子进程调用均使用参数数组不经 shell；⑤ 功能与描述一致；⑥ 供应链——npm 包零运行时依赖，通过 GitHub OIDC 可信发布；但文档建议开启插件市场自动更新；⑦ 不读取 `.env`、`~/.ssh` 或浏览器凭证，可选的 webhook token 交由系统钥匙串保管。

**风险评级**：🟡 中（纯 Markdown 规则文件本身安全无联网；若完整安装插件并启用 `band` 模块，会注册全局会话钩子、扫描本地历史会话记录并带有可选的 webhook 外发项）。

> 安全审查基于审查时（2026-10）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/DietrichGebert/ponytail)。
