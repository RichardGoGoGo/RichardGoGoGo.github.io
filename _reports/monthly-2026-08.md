---
title: "月报 · 2026 年 8 月"
kind: monthly
period: "2026-08"
start: 2026-08-01
end: 2026-08-31
date: 2026-09-07
summary: "视频与音频模型集中发布，Google、OpenAI 关停旧图像接口，EU AI Act 第 50 条生效。"
stats: { insights: 48, firsthand: 44, calls: 4 }
pending: []
---

## 本月概览

8 月收录资讯 48 条（一手 44 条），7 月为 125 条。分类上以产品 20 条、模型 18 条为主，另有行业 4 条、论文 3 条、赛展 3 条。视频模型发布集中：Google Veo 3.1、BFL FLUX 3 Video、阿里 Wan3.0、Gemini Omni 1.1 Flash 先后上线。音频与音乐相关 9 条，上月 7 条，包括 MiniMax Music 3 开源、Adobe Firefly 音频工具全量开放和 Pika 视频配音模型。图像方向，Midjourney V8.2 Edit Mode 全量开放；Google 于 8 月 17 日关闭 Imagen 4 API，OpenAI 宣布 8 月 30 日关闭 ChatGPT 内的 DALL-E GPT。版权与合规方面，EU AI Act 第 50 条于 8 月 2 日生效，Anthropic 为 Claude 输出加入文本水印。ComfyUI 本月发布 v0.30 至 v0.34 多个版本，陆续接入 LTX-2.5、MiniMax Music 3、Wan 3.0、Gemini Omni 1.1 Flash 等模型。

## 月度十大

1. [阿里Wan3.0全球正式发布：30秒视频、文档转视频、$0.05–$0.20/秒](/insights/#2026-08-24-alibaba-wan3-30s-multimodal-video) —— 阿里 Wan3.0 全球发布，单次最长生成 30 秒，可直接用 PDF、PPT、Word 文档生成视频。API 定价 $0.05–$0.20/秒。（一手 · 2 家来源）
2. [Gemini Omni 1.1 Flash 发布：40秒视频、首尾帧双锁定、4K分辨率、Draft Mode $0.03/秒](/insights/#2026-08-27-gemini-omni-11-flash) —— Google DeepMind 发布 Gemini Omni 1.1 Flash，单次生成时长从 15 秒增至 40 秒，支持首尾帧双锁定和 4K 输出。新增 Draft Mode，价格为 $0.03/秒。（一手）
3. [MIT CSAIL《Nature Communications》：AI生成图像的归因衰减使版权追责在技术层面趋于不可能](/insights/#2026-08-18-mit-csail-attribution-decay-ai-art) —— MIT CSAIL 在《Nature Communications》发表研究，称扩散模型的多步骤变换会让训练数据的归因信号快速衰减。研究认为，精确归因特定版权作品在计算上趋于不可能。（一手 · 2 家来源）
4. [Runway Solaris：首个界面世界模型，将实时网站与应用UI转化为视频体验](/insights/#2026-08-31-runway-solaris-interface-world-model) —— Runway 发布研究级模型 Solaris，称为界面世界模型，可把网页和应用 UI 实时渲染为连续视频。目前为研究 Demo，未开放商用 API。（一手）
5. [Midjourney V8.2 Edit Mode全量开放：4图参考+Inpaint+Outpaint统一界面](/insights/#2026-08-31-midjourney-v82-edit-mode-four-refs-inpaint-outpaint) —— Midjourney V8.2 Edit Mode 向全量用户开放，在同一网页编辑器里整合 4 张参考图输入、局部重绘（Inpaint）与画布外延（Outpaint）。（一手）
6. [MiniMax Music 3开源：首个产品级AI音乐模型，凭歌词+描述独立生成5分钟完整歌曲](/insights/#2026-08-13-minimax-music3-open-weight-5min-song) —— MiniMax 开源 Music 3 权重，输入歌词和风格描述可生成最长 5 分钟的完整歌曲。最低 8GB 显存可本地运行。（一手 · 2 家来源）
7. [Google于8月17日关闭全部Imagen 4 API，Figma插件/Make/Zapier工作流静默失效，强制迁移至Nano Banana](/insights/#2026-08-17-google-imagen-retired-nano-banana-migration) —— Google 于 8 月 17 日关闭全部 Imagen 4 系列 API，改用 Gemini 3.x 图像族（Nano Banana）。调用旧端点的 Figma 插件、Zapier、Make 等工作流随之停止，需要迁移端点。（一手 · 3 家来源）
8. [LTX-2.5 开源：10 秒 720p 仅需 6.8 秒，支持 4K 与同步音频，ComfyUI 当日 Day-0 支持](/insights/#2026-08-11-ltx25-open-weights-68sec-4k-video) —— Lightricks 开源 LTX-2.5，单张 RTX 4090 生成 10 秒 720p 视频需 6.8 秒，支持 4K、同步音频与多镜头叙事。ComfyUI 发布当日即支持。（一手 · 2 家来源）
9. [Adobe Firefly 音频全面开放：商业授权音乐/配音/音效三合一，创意全链路扩展至有声](/insights/#2026-08-20-adobe-firefly-audio-ga) —— Adobe Firefly 的 Generate Music、Generate Speech、Generate Sound Effects 三个音频工具于 8 月 20 日向所有用户开放，均为商业授权。（一手 · 2 家来源）
10. [Black Forest Labs FLUX 3 Video 正式 GA：20 秒原生音频，Draft 模式 $0.06/秒，1080p 首发](/insights/#2026-08-05-flux3-video-ga-20sec-native-audio) —— Black Forest Labs 将 FLUX 3 Video 推至正式可用，单次最长 20 秒并带原生音频。Draft 模式 $0.06/秒，首发 1080p。（一手 · 2 家来源）

## 主题走势

| 主题 | 本月条数 | 上月条数 | 变化 |
|---|---|---|---|
| 大模型 | 9 | 16 | -7 |
| 音频与音乐 | 9 | 7 | +2 |
| 阿里巴巴 | 8 | 6 | +2 |
| ComfyUI | 8 | 5 | +3 |
| 视频生成 | 8 | 29 | -21 |
| 图像生成 | 7 | 18 | -11 |
| Google | 6 | 12 | -6 |
| Figma | 5 | 4 | +1 |

## 分类回顾

### 模型

- [Google发布Veo 3.1：120秒4K视频+原生音频+三参考图一致性，Gemini API付费预览即开](/insights/#2026-08-05-google-veo-3-1-120s-audio-character)：Veo 3.1 登陆 Gemini API 付费预览，视频时长从 8 秒升至 120 秒，支持 4K 与原生音频，最多 3 张参考图。
- [ChatGPT 全量发布 GPT-5.6 Luna：免费层无限制使用，SOL 推理能力显著提升](/insights/#2026-08-06-chatgpt-gpt56-luna-free-unlimited-sol-smarter)：OpenAI 在 ChatGPT 全量发布 GPT-5.6 Luna，免费用户可不限次数使用，无需订阅 Plus。
- [商汤SenseNova U1.5-Lite-Preview：8B-MoT架构，4K精准「指哪改哪」局部编辑，已开源，中文风格化直出](/insights/#2026-08-03-sensetime-sensenova-u15-lite-4k-8b-mot)：商汤发布 8B 参数 MoT 架构的 SenseNova U1.5-Lite-Preview，支持框选区域局部编辑与 4K 输出，权重已开源。
- [MiniMax H3 Max：fal.ai联合发布，35倍加速，Design Arena全球第一](/insights/#2026-08-27-minimax-h3-max)：MiniMax 与 fal.ai 发布 H3 Max，生成速度比 H3 标准版快 35 倍，在 Design Arena 视频质量排行中列第一。
- [阿里Wan3.0 Prime发布：$0.06–$0.30/秒的快速视频变体，支持文转视频、图转视频、音频输入](/insights/#2026-08-27-wan30-prime-fast-text-video-image-video-audio)：阿里 Wan3.0 Prime 快速变体上线，定价 $0.06–$0.30/秒，支持文生视频、图生视频与音频驱动视频。

另有 6 条，见[全部资讯](/insights/)。

### 产品

- [Anthropic发布「Claude for Creative Work」：接入Adobe/Canva/Blender/Autodesk等六款创意软件，三所艺术学校参与课堂测试](/insights/#2026-08-11-anthropic-claude-for-creative-work-adobe-blender)：Anthropic 发布 Claude for Creative Work，把 Claude 接入 Adobe、Canva、Blender、Autodesk 等六款以上创意软件，并与三所艺术学校开展课堂测试。
- [ComfyUI v0.34系列：Pixal3D+TRELLIS2原生3D、Recraft V4、Gemini Omni 1.1 Flash、Wan3.0 Prime](/insights/#2026-08-26-comfyui-v034-trellis2-wan3prime-recraft-v4)：ComfyUI v0.34 系列集成 Pixal3D+TRELLIS2 3D 管线、Recraft V4、Gemini Omni 1.1 Flash 与 Wan3.0 Prime。
- [Runway Ruby：自然语言描述驱动的专业级视频色彩分级模型](/insights/#2026-08-31-runway-ruby-video-color-grading)：Runway 发布视频调色模型 Ruby，可按自然语言描述执行色彩分级。
- [Figma新增可拆卸AI对话面板、矢量路径橡皮擦、区域填色三大功能](/insights/#2026-08-26-figma-detachable-agent-chat-vector-eraser-recolor)：Figma 新增可拆卸 AI 对话面板、矢量路径橡皮擦与区域智能填色。
- [ComfyUI v0.33.4：Wan 3.0 30秒原生节点+Meshy-7 Ultra 3D生成+ByteDance vCube 8K视频增强](/insights/#2026-08-24-comfyui-v0334-wan3-meshy7-vcube)：ComfyUI v0.33.4 新增 Wan 3.0 原生节点、Meshy-7 Ultra 3D 生成节点与字节跳动 vCube 视频增强节点。

另有 10 条，见[全部资讯](/insights/)。

### 行业

- [Stability AI完成$76M B轮：环球音乐、索尼、华纳、EA联合参投](/insights/#2026-08-25-stability-ai-76m-series-b-music-labels)：Stability AI 完成 7600 万美元 B 轮融资，环球音乐、索尼音乐、华纳音乐与 EA 参投。
- [Anthropic为Claude全平台输出嵌入隐形水印：EU AI Act合规，水印可跨编辑持续存在](/insights/#2026-08-11-anthropic-claude-text-watermark-eu)：Anthropic 为所有 Claude 输出嵌入不可见文本水印，用于 EU AI Act 第 50 条合规，部分编辑后水印仍保留。
- [EU AI Act Article 50正式生效：AI生成视频须机器可读水印，多层标记义务全面启动](/insights/#2026-08-02-eu-ai-act-article50-ai-video-watermark)：EU AI Act 第 50 条于 8 月 2 日生效，AI 生成的图像、视频与音频须嵌入机器可读标记，视频水印子义务宽限至 12 月 2 日。
- [Claude Design对Figma的冲击：AI原生设计工具如何重构SaaS设计软件格局](/insights/#2026-08-04-claude-design-figma-saas-disruption)：Claude Design 与 Figma、Lovable、v0 等 AI 原生设计工具的出现，引发设计行业对 SaaS 设计软件格局的讨论。

### 论文

- [腾讯CoinVE-Edit：22B参数区域感知视频编辑，单次Pass完成多处局部修改](/insights/#2026-08-18-coinve-edit-tencent-22b-video-editing)：腾讯发布 22B 参数视频编辑模型 CoinVE-Edit，单次推理可完成 2–5 处独立局部修改。
- [LiveEdit（清华×港科大）：4步去噪实现12.66 FPS实时逐帧视频编辑，ECCV 2026](/insights/#2026-08-01-liveedit-realtime-video-editing-eccv2026)：清华与港科大提出 LiveEdit，4 步去噪实现 12.66 FPS 实时逐帧视频编辑，已被 ECCV 2026 接收。

### 赛展

- [水墨×AI国际展贝尔格莱德站开幕：中国当代水墨与AI生成的跨文化对话](/insights/#2026-08-25-chinese-ink-ai-belgrade-exhibition)：水墨×AI 国际巡展贝尔格莱德站于 8 月 25 日开幕，展出 AI 辅助生成与传统水墨结合的作品。
- [Walker Art Center澄清：Jeyifous展览作品并非AI生成，认知鸿沟引发行业讨论](/insights/#2026-08-19-walker-art-center-jeyifous-ai-misread)：Walker Art Center 澄清，艺术家 Olalekan Jeyifous 的展出作品为人工创作，并非 AI 生成。
- [Ars Electronica 2026「Future Begins」9月9–13日林茨：AI不再是未来假设，「协商人类性」成47届核心议题](/insights/#2026-09-09-ars-electronica-2026-future-begins-negotiating-humanity)：第 47 届 Ars Electronica 定于 9 月 9–13 日在林茨举行，主题「Future Begins」，同期颁发 Prix Ars Electronica 2026。

## 征集与赛展

### 9 月截止

- [CHI 2027 国际人机交互会议征稿（学术会议）](/calls/#chi-2027) · ACM SIGCHI · 截止 9月10日
- [第13届 INNODESIGN PRIZE · INNO AIGC 设计奖](/calls/#innodesign-aigc-2026) · INNODESIGN PRIZE（北京环艺国际展览） · 截止 9月15日
- [第二届「复新」全球大学生智能影像创作大赛](/calls/#fuxin-ai-video-2026) · 复旦大学新闻学院 · 截止 9月20日
- [2026 常宝 AI 短剧季](/calls/#changbao-ai-drama-2026) · 常州市新闻传媒中心 · 截止 9月30日

## 数据

8 月收录资讯 48 条（一手 44 条），7 月为 125 条。分类分布：模型 18 条、产品 20 条、行业 4 条、论文 3 条、赛展 3 条。主题 Top 3：大模型、音频与音乐各 9 条；阿里巴巴、ComfyUI、视频生成并列第三，各 8 条。
