---
title: "Adkid-Zephyr/anti-defensive-writing-Skill：学术论文「反防御性写作」skill"
date: 2026-09-30
source: "Adkid-Zephyr"
src: "https://github.com/Adkid-Zephyr/anti-defensive-writing-Skill"
risk: low
theme: [digital-team]
repo: "Adkid-Zephyr/anti-defensive-writing-Skill"
stars: 1987
pushed: 2026-09-12
stats_at: 2026-10-01
tags: [写作, 学术写作, Skill]
summary: "以「论文是一场学术发布会」为原则的学术写作 skill：叙事、语言、实验、结构四类 12 条规则加交稿前自查清单，用于改写摘要、引言、结论和实验章节；中英双版，纯 Markdown、无代码。"
---

**简介**：学术论文写作 skill，针对「防御性写作」：论文里堆满自我削弱的表达（如「遗憾的是」「效果有限」），结构按工作过程展开、像项目汇报。核心原则是把论文当作一场学术发布会来写：先找出这项工作最值得发表的价值，再围绕它组织叙事。仓库含中文版和英文版 skill，另附可直接粘贴给任意 AI 的精简提示词。

**要点**：12 条规则分四类。叙事：只围绕优势组织、不写工作汇报、不占优的维度不设为比较项、优势要明说、控制比较范围、允许重构故事；语言：禁用自我削弱表达，不把局部现象上升为对整体方法的否定；实验：每个实验承担一项论证职责；结构：摘要和引言先交代问题、缺口、解法与主要结果，结论只强化记忆点。遇到不理想的材料时按顺序处理：删除无关内容、缩小主张、更换评价维度、解释为目标差异或权衡、重组实验、重定义故事，最后一步才是在影响核心结论时作必要说明。README 列出的场景：改写摘要 / 引言 / 结论、压缩篇幅、组织实验章节、写 rebuttal 前自查。安装方式是把 skill 目录复制到 `~/.claude/skills/`。

**作者可信度**：中（Adkid-Zephyr 个人维护，仓库创建于 2026-08）。

**安全审查（七项客观事实，审查于 2026-09）**：① 无隐藏指令，中英文 SKILL.md 都是写作规范文档，内容与目的一致；② 纯 Markdown，无网络调用、无数据外传；③ 无安装脚本、无 package.json、无系统命令执行；④ 无 `curl|bash`、无 base64 混淆、无动态远程执行；⑤ 中英文版内容与描述对应；⑥ 供应链——仓库只有 .md 文档和 .txt 提示词，无 npm / pip 依赖、无私有来源；⑦ 无凭证窃取。

**风险评级**：🟢 低。

> 安全审查基于审查时（2026-09）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/Adkid-Zephyr/anti-defensive-writing-Skill)。
