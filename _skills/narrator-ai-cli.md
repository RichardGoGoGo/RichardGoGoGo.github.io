---
title: "NarratorAI-Studio/narrator-ai-cli-skill：AI 视频解说"
date: 2026-07-09
source: "NarratorAI-Studio"
src: "https://github.com/NarratorAI-Studio/narrator-ai-cli-skill"
tags: [内容发布, AI视频, 视频解说, Skill]
summary: "封装 narrator-ai-cli 的 AI 视频解说 skill，快速路径生成原创解说词、标准路径仿参考风格，支持 BGM/配音/90+ 解说模板，成片自动合成（云端处理）。"
---

**简介**：封装 narrator-ai-cli 的 AI 视频解说 skill——快速路径生成原创解说词、标准路径仿参考风格，支持 BGM、配音与 90+ 解说模板，成片自动合成；约 100 部预置影视物料免上传，支持自定义视频 + SRT 上传。CLI 为开源 Python（pip 安装），需 `NARRATOR_APP_KEY` 账号密钥。

**要点**：视频 / 音频上传至 jieshuo.cn（Alibaba OSS）云端处理，非本地；依赖第三方云服务持续运营。

**活跃度**：1,429★ / 2026-07-07 更新。作者：团队背景不公开。

**安全审查（七项客观事实，审查于 2026-07）**：① 无隐藏指令，SKILL.md 为 CLI 封装工作流；② 数据外泄需注意——视频 / 音频经 presigned URL 上传到 Alibaba OSS、由 jieshuo.cn 云端处理（有文档披露，但内容离开本地）；③ 需 `NARRATOR_APP_KEY` 第三方账号凭证、调用 `https://openapi.jieshuo.cn` 外部 API（功能性）；④ 无混淆，CLI 经 pip 从 GitHub 安装；⑤ 描述与行为一致，明确说明为云服务 CLI 封装；⑥ Python 开源 CLI，功能依赖 jieshuo.cn 云服务；⑦ 凭证 `NARRATOR_APP_KEY` 存本地 `~/.narrator-ai/config.yaml`，文档注明不提交。

**风险评级**：🟡 中（云服务型——视频内容上传第三方服务器；作者背景不明；稳定性依赖外部服务，敏感内容慎用）。

> 安全审查基于审查时（2026-07）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/NarratorAI-Studio/narrator-ai-cli-skill)。
