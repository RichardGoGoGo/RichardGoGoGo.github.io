---
title: "Google 发布 Gemini Omni 1.1 Flash：场景延展按 10 秒递增、累计最长 40 秒，新增首尾帧控制、360p 草稿与 1080p/4K 放大输出"
date: 2026-08-27
icat: 模型
source: "Google 官方博客 / Gemini API 文档与定价页 / Google Flow 博客 / ComfyUI 更新日志 / Higgsfield 更新日志"
src: "https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-omni-1-1-flash/"
tags: [Google, Gemini Omni, 视频生成, 视频延展, 首尾帧, Google Flow]
summary: "Google 8 月 27 日发布 Gemini Omni 1.1 Flash，通过 Gemini API 面向开发者正式可用：场景延展最多参考前 10 秒内容，按 10 秒递增、累计最长 40 秒；新增首尾帧插值、视频参考、360p 草稿（官方称比 720p 快至多 60%、成本为三分之一）和放大到 1080p 或 4K 的输出。Google Flow 同日向全球 Google AI Plus、Pro、Ultra 订阅用户开放这批能力。"
---

2026 年 8 月 27 日，Google 发布 Gemini Omni 1.1 Flash（模型 ID gemini-omni-1.1-flash）。官方博客称这是面向开发者、可用于生产的更新，可在 Google AI Studio 和 Gemini Enterprise Agent Platform 调用；Gemini API 定价页将其标注为在付费层正式可用（generally available）。同日，Google Flow 向全球 Google AI Plus、Pro、Ultra 订阅用户开放这批新能力，场景延展也向上述订阅用户在 Gemini App 中开放。

## 已知事实

- **场景延展**：可以接着已有视频继续生成。Omni 1.1 最多分析前 10 秒的上下文，此前的模型只参考最后一秒；视频可按 10 秒递增延展，累计总长最多 40 秒（官方博客）。API 文档写明：每次延展生成 3 到 10 秒的续接内容，只能接在片尾，不能在开头或中间插入；上传视频用于延展时，时长须在 10 秒以内，多轮续写模型自己生成的视频不受此限；上传视频中有人说话时，不能再延展出新的对白；延展上传视频的功能暂不对欧洲经济区、瑞士和英国用户开放。
- **首尾帧**：提供起始和结束两张关键帧，模型生成两者之间的连续视频，官方举例用于复杂环绕运镜、变焦转场和无缝循环。
- **360p 草稿**：官方称 360p 预览比 Omni 1.1 默认的 720p 生成快至多 60%（按系统吞吐计算），成本为 720p 的三分之一，适合快速原型、分镜迭代。
- **1080p 与 4K**：官方博客把这一项写作「放大到最高 4K」；API 文档的分辨率参数为 360p、720p（默认）、1080p（放大）和 4k（放大），即 1080p 与 4K 为放大输出。
- **视频参考**：可在输入中加入视频参考，以保持视觉语境与角色一致；API 文档限定最多 3 段、每段最长 3 秒，参考视频中的音频会被忽略，暂不支持上传音频参考。
- **定价**：Gemini API 定价页显示，付费层输入每百万 token 1.50 美元，视频输出每百万 token 17.50 美元；按每秒 720p 视频 5,792 个输出 token 计，标准价约合每秒 0.10 美元；免费层不提供该模型。
- **其他特性**：生成的视频带音频；支持多轮对话式编辑，用 previous_interaction_id 延续上一轮的视频状态；所有生成视频都带 SynthID 隐形水印（API 文档）。
- **Google Flow**：Flow 博客列出的更新包括起止帧控制、导出 1080p 或 4K，以及先用积分消耗更低、速度更快的 360p 起草，满意后再下载 720p 或放大，手机端的 Flow App 也可起草后放大。
- **合作方**：官方博客提到 Adobe 已把 Gemini Omni Flash 集成进 Adobe Firefly，并引用了 Figma Weave、GMI Cloud 和 Runway 相关负责人的说法。
- **第三方接入**：ComfyUI 同日发布的 v0.34.2 更新了 Gemini Omni 1.1 Flash 伙伴节点，更新说明写的是生成更快、支持对话式编辑、4K 输出与视频延展；Higgsfield 更新日志显示其 8 月 28 日上线该模型，单次生成最长 10 秒，可选 360p、720p、1080p 或 4K。

## 横向与纵向定位

横向看，Omni 1.1 的几项更新可以和同期其他视频模型的公开参数对照。Google Flow 在 2025 年 10 月的 Veo 3.1 更新中，为已有的「Extend」功能加入音频，官方称可把视频延长到一分钟以上，每段延展基于上一段的最后一秒生成，另有指定起止画面的「Frames to Video」；Omni 1.1 把可参考的上下文加到 10 秒，累计上限定在 40 秒。OpenAI 在 2026 年 3 月为 Sora 2 API 加入最长 20 秒生成和视频延展，sora-2-pro 的 1080p 输出每秒 0.70 美元，这组接口已于 9 月 24 日关停，ElevenLabs 在下架 Sora 时举例的替代模型是 Gemini Omni 1.1 Flash。Black Forest Labs 8 月 4 日正式开放的 FLUX 3 Video 单段最长 20 秒，以 720p 生成、1080p 通过放大输出，带原生音频和草稿模式，官网定价页显示 HD 文生视频、图生视频每秒 0.17 美元；Omni 1.1 标准 720p 按 token 折算约每秒 0.10 美元。ComfyUI 8 月 24 日接入的 Wan 3.0 伙伴节点支持文本、图像和参考生成视频，最长 30 秒，带原生音频。「先低分辨率起草、再出成片」也出现在其他厂商的产品里：FLUX 3 Video 有草稿模式，ComfyUI 9 月 29 日的 v0.38.0 为 Seedance 2.5 加入草稿模式，先渲染 480p 预览，再用其任务 ID 驱动 1080p 成片。

纵向看，Gemini Omni 在三个多月里从消费端走到开发者正式版。5 月 19 日的 Google I/O 上，Google 发布 Gemini Omni，该系列的初始模型 Omni Flash 先通过 Gemini App 和 Google Flow 向全球 Google AI Plus、Pro、Ultra 订阅用户推出，并免费向 YouTube Shorts 与 YouTube Create App 用户推出，所有生成视频带 SynthID 水印，Google 表示会在之后几周通过 API 开放给开发者和企业客户。6 月 30 日，Omni Flash 首次进入 Google AI Studio、Gemini API 和 Gemini Enterprise Agent Platform，定价每秒 0.10 美元，与 Veo 3.1 Fast 相同；当时官方列出的限制是单次生成 10 秒、API 暂不支持上传音频参考和场景延展，3 秒以内的视频参考虽能通过接口校验，模型还无法正确处理。8 月 27 日的 1.1 版补上了场景延展和可用的视频参考，音频参考上传仍未支持。同一时期，Google 较早的 Veo 2 与 Veo 3.0 进入退役：ComfyUI 8 月 26 日的 v0.34.1 以「即将退役」为由把这两个模型从 Veo 节点中移除；Google DeepMind 官网的模型列表目前同时列有 Veo 与 Gemini Omni。

> ⚠️ 待核实：「快至多 60%」按 Google 的系统吞吐测算，实际速度受负载影响；定价页只列出按 token 计费和 720p 的折算价，360p 草稿与 1080p、4K 放大的具体单价未单独列出，「成本为三分之一」为官方博客口径；延展到 40 秒时角色与画面能否保持一致，需以实测检验；Flow 中各分辨率消耗的积分数未公开核对。

**参考来源**：
- Google 官方博客·Build with Gemini Omni 1.1 Flash（2026-08-27）：https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-omni-1-1-flash/
- Gemini API 文档·Gemini Omni Flash：https://ai.google.dev/gemini-api/docs/omni
- Gemini API 定价页：https://ai.google.dev/gemini-api/docs/pricing
- Google 官方博客·Google Flow 新增创作控制（2026-08-27）：https://blog.google/innovation-and-ai/models-and-research/google-labs/new-creative-controls-google-flow/
- Google 官方博客·Introducing Gemini Omni（2026-05-19）：https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-omni/
- Google 官方博客·Nano Banana 2 Lite 与 Gemini Omni Flash 面向开发者（2026-06-30）：https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-omni-flash-nano-banana-2-lite/
- Google 官方博客·Veo 3.1 与 Flow 更新（2025-10-15）：https://blog.google/innovation-and-ai/products/veo-updates-flow/
- ComfyUI 更新日志（v0.34.2、v0.34.1、v0.33.4、v0.38.0 条目）：https://docs.comfy.org/changelog
- Higgsfield 更新日志（2026-08-28 Gemini Omni 1.1 Flash 上线）：https://higgsfield.ai/creator-hub/changelog
- OpenAI 开发者更新日志（2026-03-12 Sora API 扩展）：https://developers.openai.com/api/docs/changelog
- OpenAI 开发者文档·Sora 视频生成指南（9 月 24 日关停说明）：https://developers.openai.com/api/docs/guides/video-generation
- ElevenLabs 更新日志（2026-09-23，下架 Sora 2）：https://elevenlabs.io/docs/changelog/2026/9/23
- Black Forest Labs 博客（FLUX 3 Video 正式可用）：https://bfl.ai/blog/flux-3-video
- Black Forest Labs 定价页：https://bfl.ai/pricing
