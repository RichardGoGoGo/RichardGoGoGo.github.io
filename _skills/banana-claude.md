---
title: "AgriciDaniel/banana-claude：在 Claude Code 里调用 Gemini 出图的 skill"
date: 2026-09-30
source: "AgriciDaniel"
src: "https://github.com/AgriciDaniel/banana-claude"
risk: medium
theme: [design-teaching]
repo: "AgriciDaniel/banana-claude"
stars: 1067
pushed: 2026-09-25
stats_at: 2026-10-01
tags: [设计视觉, 图像生成, Gemini, Skill]
summary: "由 Claude 整理视觉 brief、Google Gemini（Nano Banana 系列模型）生成图像的 skill，支持生成、编辑、多轮续作与多方案对比；每次付费请求前展示完整 Prompt、模型与预估费用，一次批准只放行一次调用；提示词与参考图发往 Google Gemini API。"
---

**简介**：Gemini 图像生成 skill（Claude Code 插件）。用户用自然语言描述需求，skill 先离线整理视觉 brief、选择模型路线，再向 Gemini（Nano Banana 2 Lite / Nano Banana 2 / Nano Banana Pro）发起生成。支持生成、单点编辑（保持人物身份、几何与品牌细节不变）、续作迭代、最多三组 Prompt × 三条模型路线的对比，以及在本地叠加准确的文字、字体与 logo。

**要点**：插件安装后默认停用，需手动启用；每个付费调用先展示 Prompt、参考图、隐私设置、输出位置和预估费用，由用户批准，一次批准只允许一次调用，计划有变需重新批准；生成结果附带元数据文件。README 说明 Gemini 输出有随机性，不保证一致性、拼写、几何、版权清理或最终账单。当前为 3.0.0 版（2026-08-30），通过 Claude Code 插件市场安装，需 Python 3.11+ 和已开通计费的 Gemini API key。MIT。

**作者可信度**：中（AgriciDaniel 个人维护，同时维护 claude-obsidian、claude-seo、claude-blog 等多个 skill）。

**来源说明（客观事实）**：SECURITY.md 说明：一次性请求默认以 `store: false` 发送；启用 Search grounding 时 Google 强制保留 30 天；1.4.1 与 2.1.0 旧版安装可能在 `~/.claude/settings.json` 留下明文 Google key 和未固定版本的第三方 MCP 包（`@ycse/nanobanana-mcp`），3.0.0 提供只读扫描与先备份再清理的迁移，并要求轮换受影响的 key。核查于 2026-09-30。

**安全审查（七项客观事实，审查于 2026-09）**：① 无隐藏指令，SKILL.md 明确要求不隐瞒不被允许的意图、不规避服务商的安全措施；② 数据外泄——图像提示词和用户意图描述发往 Google Gemini API（需计费账号）；批准令牌 30 分钟过期、单次有效，用于控制费用；③ 越权——install.sh 只操作本地文件（相对路径），用标记文件防止误覆盖；④ install.sh 无 `curl|bash`，只调用本地 Python helper，无 base64 混淆；⑤ 描述与行为一致，费用披露在实际调用前执行；⑥ 供应链——MIT，pyproject.toml 为标准 Python 生态；⑦ 凭证——声明不索取、不打印、不写入 API key，也不在命令行传递，`GEMINI_API_KEY` 由用户自行配置。

**风险评级**：🟡 中（提示词与参考图发往 Google Gemini 付费 API；社区验证有限；作者知名度有限）。

> 安全审查基于审查时（2026-09）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/AgriciDaniel/banana-claude)。
