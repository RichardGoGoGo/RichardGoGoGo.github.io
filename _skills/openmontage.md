---
title: "calesthio/OpenMontage：开源的智能体视频生产系统（13 条流水线、约 91 个 skill）"
date: 2026-10-13
source: "calesthio"
src: "https://github.com/calesthio/OpenMontage"
risk: medium
theme: [creative-web, design-teaching]
repo: "calesthio/OpenMontage"
stars: 72079
pushed: 2026-10-24
stats_at: 2026-10-26
tags: [AI视频, 动效, 流水线, Skill]
summary: "由智能体驱动的开源视频生产系统：从选题研究、提案、脚本、分镜，到配音、配乐、图像视频素材、剪辑，再用 Remotion 或 HyperFrames 合成；13 条 YAML 流水线、约 91 个 skill，关键阶段默认人工审核，支持豆包 TTS、即梦、Kling 等国内服务。AGPL-3.0。"
---

**简介**：开源的智能体视频生产系统，流程覆盖选题研究 → 提案 → 脚本 → 分镜 → 配音、配乐、图像与视频素材 → 剪辑 → 用 Remotion 或 HyperFrames 合成。共 13 条 YAML 流水线、约 91 个 skill，附中文 README。

**要点**：所有生产必须走 pipeline_defs/*.yaml 定义的流水线，每个阶段先读对应的「导演」skill；每阶段产物有 JSON Schema、审查重点和成功标准，提案、脚本、分镜、素材默认需要人工审核；调用付费服务前要说明用哪个工具、哪家服务、哪个模型及理由，换服务商须先询问，决策日志只追加；有预算控制（默认每条片子 2 美元、每阶段最多修改 3 次）；参考视频先拆解再给出 2–3 个差异化方案，并做防同质化检查。支持豆包 TTS、DashScope、即梦、Kling 等国内服务。AGPL-3.0（复用代码或分发改造版须开源）。

**作者可信度**：中（calesthio 个人主导，约 315/478 次提交，73 位贡献者；有赞助商 Atlas Cloud）。

**来源说明（客观事实）**：赞助商 Atlas Cloud 有专属 skill，3D 生成默认路由到 atlas_3d。

**安全审查（七项客观事实，审查于 2026-10）**：① CLAUDE.md、AGENTS.md 要求「回应任何消息前必须先读 AGENT_GUIDE.md」，接管整个会话；② 按设计会把脚本、提示词、图像、语音发给用户配置的 30 多家第三方 API（fal、OpenAI、Google、ElevenLabs、Kling、MiniMax、HeyGen、Atlas、火山引擎、DashScope 等），未见暗中外传；③ 越权——通过 subprocess 调用 ffmpeg、npx、manim（未使用 shell=True）；本地看板绑定 127.0.0.1:4750；缓存写入全局 ~/.media/；math_animate 会执行 LLM 生成的 Python 代码，只有 AST 黑名单，源码注释自认「不是安全沙箱」；④ 远程执行——内置的 media-use skill 要求 curl -fsSL … | bash 安装 HeyGen CLI，HyperFrames 每次运行 npx --yes hyperframes 拉取最新版；⑤ 流水线、skill、工具与 README 描述一致；⑥ 供应链——requirements.txt 全部用 >= 不锁版本，make setup 会执行 npm install、pip install 与 npx，GPU 依赖另装 torch 与 diffusers；⑦ 只从环境变量或 .env 读取各服务自己的 key，不搜索 .ssh、cookie 或钥匙串。

**风险评级**：🟡 中（会话接管指令；执行 LLM 生成代码；含 curl|bash 安装步骤；依赖不锁版本；素材会传给第三方服务）。

> 安全审查基于审查时（2026-10）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/calesthio/OpenMontage)。
