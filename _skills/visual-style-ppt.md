---
title: "irenerachel/visual-style-ppt-skill：图片式中文视觉 PPT"
date: 2026-07-09
source: "irenerachel"
src: "https://github.com/irenerachel/visual-style-ppt-skill"
tags: [设计视觉, PPT, 图像生成, Skill]
summary: "以 OpenAI GPT-image-2 驱动的中文视觉 PPT skill，风格优先（3 套风格文件，含 Style Lock），每张幻灯片独立成图，产出仅含图片的 PPTX 文件包。"
---

**简介**：中文优先的视觉 PPT 生成 skill，采用「风格优先」思路，内置 3 套风格文件（科技暗色 / 冲击网格 / 法式商业）并含 Style Lock；每张幻灯片以独立图片呈现（非 HTML 方案，规避字体兼容问题），工作流为 提纲→提示词确认→缩略图→正图→PPTX 打包。与 HTML deck 路线（如 frontend-slides）互补。

**要点**：每张幻灯片均为图片；需 OpenAI GPT-image-2（Image 2）API；中文场景友好。

**活跃度**：274★ / 2026-06-30 更新（未标 license）。作者：个人维护。

**安全审查（七项客观事实，审查于 2026-07）**：① 无隐藏指令，SKILL.md 与目的一致；② 数据外泄需注意——每张幻灯片图片均调用 OpenAI GPT-image-2 API，用户内容（标题 / 文案 / 风格提示词）会发往 OpenAI 服务器；③ 安装走 git clone、无 curl|bash，无系统命令执行、不写敏感路径；④ 无 curl|bash、无 base64 混淆；⑤ 描述与行为一致，Image 2 依赖已在 SKILL.md 声明；⑥ 纯 Markdown + YAML 结构、无 npm/pip 依赖，但未标注 license；⑦ 无凭证窃取，OPENAI_API_KEY 由用户自备、skill 不读不传。

**风险评级**：🟡 中（内容发往 OpenAI API、需付费 token；无 license 声明；使用前确认合规、敏感内容不外送）。

> 安全审查基于审查时（2026-07）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/irenerachel/visual-style-ppt-skill)。
