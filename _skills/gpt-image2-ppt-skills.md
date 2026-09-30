---
title: "JuneYaooo/gpt-image2-ppt-skills：GPT-image-2 整页出图的 PPT 生成与模板克隆 skill"
date: 2026-09-30
source: "JuneYaooo"
src: "https://github.com/JuneYaooo/gpt-image2-ppt-skills"
risk: medium
theme: [design-teaching]
repo: "JuneYaooo/gpt-image2-ppt-skills"
stars: 1314
pushed: 2026-08-22
stats_at: 2026-09-30
tags: [设计视觉, PPT, 图像生成, Skill]
summary: "用 OpenAI gpt-image-2 把每页幻灯片当作整页视觉稿生成，交付 16:9 PNG 与打包好的 .pptx；支持上传 .pptx 模板仿版式出新内容、按页自然语言修改和默认关闭的可编辑模式；每页内容发往 OpenAI 或用户配置的兼容接口。"
---

**简介**：PPT 生成 skill，用 OpenAI `gpt-image-2` 把每一页当作完整视觉稿生成，交付每页高清 PNG 和 16:9 `.pptx`。可上传任意 `.pptx` 模板，让模型参考其版式、配色和插画语汇生成新内容（模板克隆）；也可用自然语言只改指定页（如改副标题、换数字），其余页不重新生成。

**要点**：模板库 265 套（README 更新记录：2026-08-02 新增 233 套设计师提供的模板），另有在线模板画廊可检索并复制 Prompt；`examples/` 提供产品发布、融资路演、课程课件、论文答辩等场景的起步大纲。默认整页图片模式；用户明确要求时启用可编辑模式，把视觉稿重建为 PowerPoint 原生文本、形状、连接线和独立图片层。模板克隆和可编辑模式需要本机有 PowerPoint、Keynote 或 LibreOffice 做回渲染。默认 10 路并发出图。README 注明密集表格、财报、法务长文的小字和数字需要更严格的人工核对。Apache 2.0；手动安装为 `git clone` 后运行 `install_as_skill.sh`（装到 `~/.claude/skills/` 或 `~/.codex/skills/`）。

**作者可信度**：中（JuneYaooo 个人维护，无公开机构背景）。

**来源说明（客观事实）**：README 注明早期风格 prompts 与 skill 结构参考了 op7418/NanoBanana-PPT-Skills（图片后端由 Nano Banana Pro 换成 gpt-image-2），并声明未复制其他致谢项目的代码、模板或素材。API 直连需配置 `OPENAI_API_KEY`，`OPENAI_BASE_URL` 默认 `https://api.openai.com`，可改为任意 OpenAI 兼容中转；README 称脚本只读取当前进程环境变量、平台注入变量和 skill 目录下的 `.env`，不向上读取调用者项目的 `.env`。核查于 2026-09-30。

**安全审查（七项客观事实，审查于 2026-09）**：① 无隐藏指令，SKILL.md 是 PPT 生成工作流文档；② 数据外泄——每页幻灯片都要调用 gpt-image-2，幻灯片内容与提示词发往 OpenAI 或用户指定的兼容中转；模板克隆可另配 `VISION_BASE_URL` 接独立的多模态模型分析模板；③ 越权——`install_as_skill.sh` 只写入本地 skills 目录，依赖 LibreOffice / python-pptx 等常见工具；④ `install_as_skill.sh` 无 `curl|bash`、无网络调用、无 base64 混淆；⑤ 描述与行为一致，API 依赖在 SKILL.md 中写明；⑥ 供应链——Apache 2.0，requirements.txt 为常见 Python 库（requests / python-pptx / jsonschema / pymupdf）；⑦ 无凭证窃取，`OPENAI_API_KEY` 由用户自行配置，SKILL.md 不读取、不外传。

**风险评级**：🟡 中（幻灯片内容发往 OpenAI 或第三方兼容中转；社区验证有限；作者无公开机构背景）。

> 安全审查基于审查时（2026-09）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/JuneYaooo/gpt-image2-ppt-skills)。
