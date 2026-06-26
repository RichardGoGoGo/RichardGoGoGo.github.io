---
title: "trailofbits/skills：安全分析 skill 合集"
date: 2026-06-24
source: "Trail of Bits"
src: "https://github.com/trailofbits/skills"
tags: [安全, Skill, 代码审计]
summary: "顶尖安全研究机构 Trail of Bits 出品的 40+ 安全分析插件，含供应链审查、内存安全、静态分析、智能合约审计等。"
---

**简介**：Trail of Bits（安全研究机构）出品的 40+ 安全分析插件，涵盖供应链风险、C/C++ 内存安全、CodeQL / Semgrep 静态分析、智能合约审计、YARA 规则编写、差异代码审查等；采用 `.claude-plugin` 格式而非 SKILL.md。

**要点**：行业机构出品；`supply-chain-risk-auditor` 子插件可用于审查依赖链。

**活跃度**：5.8k★ / 122 commits（CC-BY-SA-4.0）。作者可信度：高。

**安全审查（七项客观事实，审查于 2026-06）**：① 无隐藏指令（AGENTS.md 为标准贡献指南）；② 分析全本地，`supply-chain-risk-auditor` 经 `gh` CLI 查询 GitHub 公开 API；③ `static-analysis` 需本地安装 CodeQL / Semgrep 等工具，属安全分析合理需求；④ 无混淆 / 远程执行；⑤ 描述与行为一致；⑥ 依赖公开安全工具（CodeQL、Semgrep、Burp Suite、Yara-X），无私有来源；⑦ 无凭证窃取。

**风险评级**：🟢 低。

> 安全审查基于审查时（2026-06）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/trailofbits/skills)。
