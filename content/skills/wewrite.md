---
title: "wewrite：公众号文章全流程 skill"
date: 2026-06-22
source: "oaker-io"
url: "https://github.com/oaker-io/wewrite"
tags: [写作, Skill, 全流程]
summary: "公众号文章全流程：热点抓取→选题→写作→SEO→配图→排版→草稿箱。"
---

**简介**：公众号文章全流程 skill（热点抓取 → 选题 → 写作 → SEO → 配图 → 排版 → 草稿箱）。

**要点**：流程完整，框架可参考。

**作者可信度**：中。

**安全审查（客观事实）**：`install.sh` 本地建 venv（无 `curl|bash` 远程），依赖列在 requirements.txt，文件本地、无动态代码执行；唯一注意点是凭证以明文存于 `config.yaml`（用户自行配置、非上传）。带凭证 / 发布类能力的 skill 建议放隔离环境运行，并对配置文件设权限保护（chmod 600）。

**风险评级**：🟢 低（注意凭证明文）。

> 安全审查基于审查时（2026-06）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/oaker-io/wewrite)。
