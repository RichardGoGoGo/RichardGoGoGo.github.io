---
title: "NVIDIA/SkillSpector：结合静态 YARA 规则与十问语义审查的 Agent Skill 安全扫描器"
date: 2026-11-03
source: "NVIDIA"
src: "https://github.com/NVIDIA/SkillSpector"
risk: medium
theme: [digital-team]
repo: "NVIDIA/SkillSpector"
stars: 24015
pushed: 2026-11-03
stats_at: 2026-11-03
stars_7d: 2073
tags: [开发, 安全审计, Skill, NVIDIA]
summary: "NVIDIA 开源的 agent skill 安全扫描工具（v2.12）及配套 skill-inspector：通过静态扫描（YARA 规则、OSV 依赖漏洞核查、MCP 权限比对）与只读语义审查十问，对第三方 skill 输出 APPROVE / CAUTION / REJECT 三级审计报告。"
---

**简介**：NVIDIA 官方开源的 Agent Skill 安全扫描器（v2.12，属 NVIDIA Verified Skills 流水线组件），配套提供 `skill-inspector` 审查 skill，通过「静态确定性扫描 + Agent 语义审查」双线并进，对第三方 skill 给出 `APPROVE`、`CAUTION` 或 `REJECT` 的明确结论。

**要点**：`skill-inspector` 严格要求将被审查的第三方 skill 视为不可信输入，绝不执行其中的任何脚本，仅允许使用 `find`、`rg`、`sed` 等只读命令；风险评分仅作姿态参考而不直接替代定性结论（未获合理解释的 HIGH/CRITICAL 风险不会因仓库高星或总分低而降级）；语义审查围绕十个核心问题展开（真实用途、所需权限、敏感文件访问、数据外传去向、命令执行、持久化驻留、提示注入风险、触发词是否过宽、供应链依赖、用户可控性），并输出固定结构的安全诊断与使用护栏；扫描器本体支持 YARA 规则匹配、锁文件 OSV 漏洞库比对及 MCP 权限清单核验。Apache-2.0 许可。

**作者可信度**：高（NVIDIA 官方开源项目，逾 1,700 次提交、140 余位贡献者）。

**安全审查（七项客观事实，审查于 2026-11）**：① 隐藏指令——无隐藏指令，配套 skill 默认要求开启 `--no-llm` 纯静态模式，不擅自切换模型或并发起多个付费会话；② 外传——扫描器本体在核查依赖时会联网请求 `api.osv.dev` 漏洞库，并从 `registry.npmjs.org` / `pypi.org` 下载锁定的依赖包进行静态检查（带公网 DNS 校验、子进程隔离及字节/超时上限）；若主动开启可选的 LLM 深度分析模式或配置了 LangSmith 环境变量，则会将被审文件内容发送至所选模型 API 或上报 trace；③ 越权——子进程仅用于空环境变量下的隔离包下载与 DNS 解析，不访问 `~/.ssh` 等敏感目录；④ 远程执行——无代码混淆，仓库内的恶意特征字符串均为 YARA 检测规则与测试夹具样本；⑤ 功能与描述一致；⑥ 供应链——扫描器 Python 本体依赖 `langgraph`、`yara-python` 等 20 余个库（部分使用 `>=` 范围）；配套 `skill-inspector` 文档本身可独立参考；⑦ 仅在开启 LLM 模式时读取对应模型商的 API Key。

**风险评级**：🟡 中（偏低；配套审查方法论为纯只读规范，运行 Python 扫描器本体时会联网查询 OSV 与包仓库，开启 LLM/LangSmith 时会外发被审文件内容）。

> 安全审查基于审查时（2026-11）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/NVIDIA/SkillSpector)。
