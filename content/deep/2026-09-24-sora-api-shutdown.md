---
title: "OpenAI Sora API 于 9 月 24 日关停，官方未提供一对一替代接口；迪士尼 3 月已退出合作并取消 10 亿美元入股计划"
date: 2026-09-24
icat: 行业
source: "OpenAI 开发者文档 / Variety / The Decoder / 迪士尼官方新闻稿 / Engadget / VentureBeat / Decrypt / ElevenLabs / ComfyUI"
src: "https://developers.openai.com/api/docs/deprecations#2026-03-24-sora-2-video-generation-models-and-videos-api"
tags: [OpenAI, Sora, API关停, AI视频, 迪士尼]
summary: "OpenAI 于 2026 年 3 月 24 日宣布停止 Sora，并通知开发者 Videos API 与 sora-2、sora-2-pro 系列模型将在 9 月 24 日从 API 移除；据报道的官方时间表，网页版与 App 定于 4 月 26 日先行停止服务。9 月 24 日关停后，官方文档写明没有一对一的替代 API。迪士尼在 3 月 24 日结束与 OpenAI 的合作，不再推进 10 亿美元入股计划。"
---

2026 年 9 月 24 日，OpenAI 的 Videos API 以及 sora-2、sora-2-pro 系列模型从 API 中移除。OpenAI 开发者文档里的 Sora 视频生成指南现在写明：Sora 2 模型与 Videos API 已于 9 月 24 日关停、不再可用，没有一对一的替代 API，该指南仅作历史参考保留。这是 Sora 两阶段退场的第二步：OpenAI 在 3 月 24 日宣布停止 Sora，据 The Decoder 报道的官方时间表，网页版与 App 定于 4 月 26 日先行停止服务。

## 已知事实

- **宣布停止（3 月 24 日）**：Sora 团队发布声明告别 Sora，感谢使用者，并称稍后公布 App 与 API 的时间表和作品保存方式，声明本身没有给出原因（Variety）。同日，OpenAI 通知使用 Videos API 及 Sora 2 模型别名、快照的开发者，这些接口将于 9 月 24 日从 API 移除（OpenAI 弃用公告）。
- **OpenAI 的解释**：OpenAI 发言人向 Engadget 和 VentureBeat 表示，公司决定停止 Sora 的消费级 App 与 API；随着公司收窄重点、算力需求增长，Sora 研究团队将继续做面向机器人的世界模拟研究，用于解决现实中的物理任务。发给 Decrypt 的表态则提到，这一决定出于通往 AGI 的路线图以及交付智能体能力所需的算力。
- **两阶段时间表**：据 The Decoder 3 月 28 日报道（援引 OpenAI 帮助中心「What to know about the Sora discontinuation」页面），Sora 网页版与 App 定于 4 月 26 日停止服务，API 定于 9 月 24 日停止；用户可从 Sora 资料库导出视频和图片，期限之后是否另设导出窗口当时尚未决定，所有期限过后用户数据将被永久删除；负责图像与视频生成的 sora.chatgpt.com 一并关闭。
- **受影响的接口**：Videos API、sora-2、sora-2-pro，以及 sora-2-2025-10-06、sora-2-2025-12-08、sora-2-pro-2025-10-06 三个快照，关停日均为 2026-09-24；弃用表的「推荐替代」一栏为空（OpenAI 弃用公告）。视频生成指南写明没有一对一的替代 API。
- **ChatGPT 中的视频与图像**：Variety 报道，随 Sora App 关停，ChatGPT 也不再根据文本提示生成视频；Decrypt 报道，OpenAI 确认 ChatGPT 内的 AI 图像生成不受影响。OpenAI 开发者更新日志显示，9 月 8 日 API 新发布了图像生成与编辑模型 GPT Image 2.5 Sunburst 与 Flare，弃用公告没有把它们列为 Sora 的替代。
- **关停前的 API 迭代**：Sora 2 与 Sora 2 Pro 于 2025 年 10 月 6 日 OpenAI DevDay 随 v1/videos 接口进入 API。2026 年 3 月 12 日，即宣布停止前 12 天，API 还新增了可复用的角色参考、最长 20 秒的生成、sora-2-pro 的 1080p 输出（每秒 0.70 美元）、视频延展与 Batch API 支持，并新增用于编辑已有视频的 /v1/videos/edits 接口（OpenAI 开发者更新日志）。
- **产品时间线**：2024 年 2 月发布预览，2024 年 12 月推出公开版本，2025 年 9 月底推出 Sora 2 与独立 App（Variety）；App 上线后曾登上美国 App Store 榜首（Engadget）。从 2024 年 2 月预览到 2026 年 9 月 API 关停，约两年七个月。
- **迪士尼协议的原始条款**：迪士尼 2025 年 12 月 11 日的新闻稿称，迪士尼成为 Sora 平台首个大型内容授权合作方（官方称）；三年期授权协议允许 Sora 基于迪士尼、漫威、皮克斯、星球大战旗下 200 多个动画、面具与生物类角色生成用户提示的短视频，不含演员肖像与声音；迪士尼将成为 OpenAI 的主要客户，并对 OpenAI 进行 10 亿美元股权投资、获得追加购股权证；Sora 与 ChatGPT Images 预计 2026 年初开始用授权角色生成内容，Disney+ 将上架精选的 Sora 视频。新闻稿同时写明，交易仍需谈判最终协议，并需取得公司与董事会批准、满足常规交割条件。
- **迪士尼退出**：Variety 3 月 24 日报道，迪士尼已结束与 OpenAI 的合作，其中包括入股 10 亿美元的计划。迪士尼发言人表示，尊重 OpenAI 退出视频生成业务、把优先事项转向别处的决定，会继续与 AI 平台接触，同时采用尊重知识产权和创作者权利的新技术。exchange4media 报道称，这笔投资在关停前尚未完成，没有发生资金转移。
- **下游平台迁移**：ElevenLabs 9 月 23 日的更新日志写明，Sora 2 与 Sora 2 Pro 已从其图像与视频模型选择器中移除，已有生成记录保留，使用 Sora 节点的流程和模板需改用 Gemini Omni 1.1 Flash 等其他视频模型后才能运行；ComfyUI 9 月 29 日发布的 v0.38.0 删除了已退役的 Sora 视频节点。

## 横向与纵向定位

横向看，Sora 退场前后，其他厂商在 2026 年 8 月集中更新了视频模型。Black Forest Labs 8 月 4 日让 FLUX 3 Video 通过 API 正式可用，单段最长 20 秒，以 720p 生成、可放大到 1080p，音频与画面一同生成，并提供草稿模式，官网定价页显示 HD 文生视频、图生视频每秒 0.17 美元；Lightricks 的 LTX-2.5 以开放权重形式发布，模型文件标注为 22B 参数，需在 Hugging Face 接受许可并申请访问，ComfyUI 8 月 11 日的 v0.32.0 即加入原生支持；ComfyUI 8 月 24 日的 v0.33.4 接入 Wan 3.0 伙伴节点，支持文本、图像和参考生成视频，带原生音频，最长 30 秒；Google 8 月 27 日发布 Gemini Omni 1.1 Flash，场景延展可累计到 40 秒。ElevenLabs 下架 Sora 时举例的替代模型是 Gemini Omni 1.1 Flash。Engadget、VentureBeat、Decrypt 引用的 OpenAI 表态只谈算力分配和研究方向，没有提到竞争；另据 Engadget 援引 Appfigures 数据，Sora App 在 2026 年初的新增安装和用户付费连续数月环比下降，2025 年 12 月的新增下载较 11 月减少 32%。迪士尼一侧，Variety 同篇报道回顾了它此前向 Google、Meta、Character.AI 发出停止侵权函，以及与 NBCUniversal、华纳兄弟探索共同起诉 Midjourney 和 MiniMax；与 OpenAI 的合作结束后，迪士尼声明仍会继续与 AI 平台接触。

纵向看，Sora 的轨迹可以分成三段。第一段是 2024 年 2 月的预览到 2024 年 12 月推出的公开版本，VentureBeat 指出，公开版推出时 Runway、Luma、可灵、MiniMax 等已经上线了各自的视频模型。第二段从 2025 年 9 月底开始：Sora 2 以社交视频 App 的形态上线，带有让用户把自己放进生成画面的「客串」功能（Decrypt），一度登上 App Store 榜首；10 月 Sora 2 进入 API；要求版权方主动申请排除作品的机制在好莱坞引发担忧，日本内容产业团体 CODA 于 11 月致函 OpenAI，要求停止用其成员作品训练 Sora 2（Variety）；12 月迪士尼授权与入股协议公布。第三段是 2026 年 3 月：12 日 API 还在扩充时长、分辨率和编辑能力，24 日 OpenAI 宣布整体停止，随后公布 App 与 API 分两步停止的时间表，API 于 9 月 24 日按期关停，Sora 研究团队转向面向机器人的世界模拟。对开发者而言，这次弃用从通知到关停约 6 个月，与 OpenAI 弃用页上 DALL·E 快照的节奏相近（2025 年 11 月 14 日通知、2026 年 5 月 12 日移除）；DALL·E 条目给出了 gpt-image-2 等替代模型，Sora 条目的替代栏为空，ElevenLabs 等接入方的做法是改接其他厂商的视频模型。

> ⚠️ 待核实：网页版与 App 定于 4 月 26 日停止服务的时间表，以及数据导出和删除安排，来自 The Decoder 对 OpenAI 帮助中心页面的转述；该帮助页面访问时出现人机验证，未能直接打开核对，也未查到主流媒体对 4 月 26 日当天下线情况的报道。「投资尚未完成、没有资金转移」为 exchange4media 的报道口径，迪士尼与 OpenAI 的公开声明未涉及资金细节。Sora 用户量与付费变化只有 Appfigures 等第三方数据，OpenAI 未公布相关数字。

**参考来源**：
- OpenAI 开发者文档·弃用公告（2026-03-24 Sora 2 与 Videos API 条目）：https://developers.openai.com/api/docs/deprecations#2026-03-24-sora-2-video-generation-models-and-videos-api
- OpenAI 开发者文档·Sora 视频生成指南（关停说明）：https://developers.openai.com/api/docs/guides/video-generation
- OpenAI 开发者更新日志（2025-10-06、2026-03-12、2026-09-08 条目）：https://developers.openai.com/api/docs/changelog
- Variety（2026-03-24，Sora 关停与迪士尼退出）：https://variety.com/2026/digital/news/openai-shutting-down-sora-video-disney-1236698277/
- The Decoder（2026-03-28，两阶段关停时间表）：https://the-decoder.com/openai-sets-two-stage-sora-shutdown-with-app-closing-april-2026-and-api-following-in-september/
- Engadget（OpenAI 发言人表态、Appfigures 数据）：https://engadget.com/ai/openai-is-shutting-down-its-sora-video-generation-app-211023358.html
- VentureBeat（OpenAI 声明、公开版推出时的竞品背景）：https://venturebeat.com/technology/openai-is-shutting-down-sora-its-powerful-ai-video-app
- Decrypt（OpenAI 关于 AGI 路线与算力的表态、ChatGPT 图像生成不受影响）：https://decrypt.co/362243/openai-shut-down-sora-derailing-1-billion-deal-disney
- 迪士尼官方新闻稿（2025-12-11，授权与投资协议）：https://thewaltdisneycompany.com/press-releases/the-walt-disney-company-and-openai-reach-landmark-agreement-to-bring-beloved-characters-from-across-disneys-brands-to-sora/
- exchange4media（投资未完成、无资金转移）：https://www.exchange4media.com/digital-news/openai-shuts-down-sora-ends-disney-deal-153241.html
- ElevenLabs 更新日志（2026-09-23，下架 Sora 2 与 Sora 2 Pro）：https://elevenlabs.io/docs/changelog/2026/9/23
- ComfyUI 更新日志（v0.38.0 删除 Sora 节点、v0.32.0 LTX 2.5、v0.33.4 Wan 3.0、v0.34.2 Gemini Omni 1.1 Flash）：https://docs.comfy.org/changelog
- ComfyUI 文档·LTX-2.5 工作流（开放权重、22B 模型文件）：https://docs.comfy.org/tutorials/video/ltx/ltx-2-5
- Black Forest Labs 博客（FLUX 3 Video 正式可用）：https://bfl.ai/blog/flux-3-video
- Black Forest Labs 定价页：https://bfl.ai/pricing
- Google 官方博客（Gemini Omni 1.1 Flash）：https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-omni-1-1-flash/
