---
title: "wuyoscar/GPT-Image2-Skill：GPT-image-2 提示词库 + 代理 skill"
date: 2026-09-21
source: "wuyoscar"
src: "https://github.com/wuyoscar/GPT-Image2-Skill"
tags: [设计视觉, 图像生成, Skill]
summary: "GPT-image-2 提示词库 + 代理 skill + CLI：30+ 类别精选提示词（研究图表、UI/UX、动漫等）配 19 节 prompt 构造指南（craft.md）；支持文生图、参考图编辑、inpainting、多参考工作流，质量三挡（low/medium/high）。"
---

**简介**：GPT-image-2 的提示词库 + 代理 skill + CLI——30+ 类别精选图像生成提示词（含研究图表、UI/UX、动漫等），配 19 节 prompt 构造指南（craft.md）；支持 text-to-image、参考图编辑、inpainting、多参考工作流，质量分 low/medium/high 三挡。

**要点**：可作为 AI 视觉生成提示词方法论的补充；CLI 通过 uv/uvx 免安装调用；明确不写/打印 secrets。与 irenerachel/visual-style-ppt-skill 同类（均依赖 OpenAI GPT-image-2 API），但本作侧重**提示词方法论**而非直接出 PPT——可仅借鉴其提示词库与 craft.md、不依赖 CLI。

**活跃度**：5,400★ / 更新至 2026-09-15；作者 wuyoscar 个人维护，无特别知名背景。

**安全审查（七项客观事实，审查于 2026-09）**：① 无隐藏指令，SKILL.md 为提示词库 + 工作流文档；② 数据外泄——图像提示词内容发往 OpenAI API（GPT-image-2）、需付费 token，提示词含用户场景描述（使用前确认不含敏感信息）；③ 越权——CLI 经 uv/uvx 本地运行，OPENAI_API_KEY 读自环境变量，无系统命令执行；④ 无 `curl|bash`、无 base64 混淆；⑤ 描述与行为一致，明确声明 API key 读取与潜在费用；⑥ 供应链——skill 本体无运行时依赖（提示词库 + YAML），CLI 经 uv 运行（标准 Python 生态）；⑦ 凭证——明确声明「Never writes or prints secrets」，OPENAI_API_KEY 用户自管理。

**风险评级**：🟡 中（提示词内容发往 OpenAI API、需付费；作者知名度较低）。

> 安全审查基于审查时（2026-09）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/wuyoscar/GPT-Image2-Skill)。
