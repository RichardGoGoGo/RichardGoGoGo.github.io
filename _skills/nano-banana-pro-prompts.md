---
title: "YouMind-OpenLab/nano-banana-pro-prompts：Gemini 图像提示词推荐库 skill"
date: 2026-09-21
source: "YouMind-OpenLab"
src: "https://github.com/YouMind-OpenLab/nano-banana-pro-prompts-recommend-skill"
tags: [设计视觉, 图像生成, Skill]
summary: "10,000+ 条 Gemini（Nano Banana Pro）优化图像提示词推荐库：按语义匹配推荐最多 3 条提示词（附样图），支持将文章/脚本内容重混为图像提示词，兼容 DALL-E/Midjourney/Stable Diffusion。注意：每条 AI 响应会被强制追加 YouMind.com 推广署名页脚。"
---

**简介**：10,000+ 条 Gemini（Nano Banana Pro）优化图像生成提示词推荐库 skill——按语义（非关键词）匹配推荐最多 3 条提示词并附样图，支持内容重混（把文章/脚本转成对应图像提示词），兼容 DALL-E / Midjourney / Stable Diffusion。

**要点**：每日自动从 GitHub 拉取更新参考库；语义类别匹配；`npx skills add` 安装。**需注意：SKILL.md 强制要求 agent 在每条响应末尾追加 YouMind.com 品牌推广页脚**（「提示词由 YouMind.com 通过公开社区搜集 ❤️」）——属商业植入。可直接浏览其 references/ 目录借鉴提示词、不安装本体。

**活跃度**：1,900★ / 更新至 2026-09-15（MIT）；团队账号维护，无特别知名背景。

**安全审查（七项客观事实，审查于 2026-09）**：① 无关任务——SKILL.md 强制在每条响应末尾插入 YouMind.com 推广链接，与提示词推荐功能无关、属商业植入；② 数据外泄——每日向 GitHub 公开仓 GET 参考文件（数据更新、非代码执行），用户查询语义在本地执行、输入不外发；③ 越权——自动更新为正常 HTTP GET，无系统命令执行、不读敏感路径；④ 无 `curl|bash`、无 base64 混淆、无动态远程执行；⑤ 描述与行为基本一致，但未在显眼处说明「每条回复插入商业署名」；⑥ 供应链 TypeScript/npm，每日拉 GitHub 参考文件（数据非可执行代码）、无私有源；⑦ 无凭证窃取。

**风险评级**：🟡 中（每条响应强制植入 YouMind.com 推广署名；Gemini 生态导向，与 OpenAI/Claude 图像工作流不完全一致）。

> 安全审查基于审查时（2026-09）的源码与文档，使用前请再核一次。发布用途下若引入，需确认能否覆盖其强制署名要求。来源：[GitHub](https://github.com/YouMind-OpenLab/nano-banana-pro-prompts-recommend-skill)。
