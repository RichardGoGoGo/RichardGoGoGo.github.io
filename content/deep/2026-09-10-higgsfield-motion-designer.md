---
title: "Higgsfield 推出 AI Motion Designer：在 ChatGPT 中用自然语言驱动 After Effects，产出可继续编辑的原生图层与关键帧"
date: 2026-09-10
icat: 产品
source: "Higgsfield 官方博客 / Higgsfield 更新日志 / RuntimeWire / No Film School / Runway / Adobe 社区 / ProVideo Coalition"
src: "https://higgsfield.ai/blog/ai-motion-designer-after-effects-gpt"
tags: [Higgsfield, After Effects, ChatGPT, 动态设计, AI Agent, MCP]
summary: "Higgsfield 9 月 10 日推出 AI Motion Designer：用户在 ChatGPT 的 Higgsfield 插件中输入 /use-after-effects 并描述需求，智能体把请求转成 After Effects 合成里的图层、关键帧和时间安排，可做标题动画、Logo 演绎、转场与产品宣传等，产出为可手工修改的 AE 原生元素；使用需同时订阅 Higgsfield、ChatGPT 与 After Effects。"
---

2026 年 9 月 10 日，Higgsfield 在官方博客发布 AI Motion Designer，称它是通过 GPT 把 Higgsfield 与 Adobe After Effects 连起来的智能体。用户先用 Higgsfield 的工具生成素材，再在 ChatGPT 里用文字描述需要的动态图形，智能体直接在当前打开的 After Effects 合成中搭建出来。Higgsfield 的产品页标注其由 OpenAI 的 GPT-6 Astra 驱动。

## 已知事实

- **工作方式**：官方博客给出的示例指令是「给这个标题做动画」「做一个 Logo 演绎」「加一个转场」。智能体把自然语言请求转成图层、关键帧和时间安排，写进打开的 AE 合成，素材不必在两个软件之间导出、导入。
- **使用步骤**：在 ChatGPT 中添加 Higgsfield 插件，通过插件输入 /use-after-effects，然后在对话里描述要在 AE 中完成的工作。官方 FAQ 称，这一智能体也可以通过 Higgsfield MCP 在 Claude、Cursor 等智能体环境中调用。
- **可做的内容**：标题、Logo 演绎、转场、产品宣传片与特效，并可按用户提供的素材、文字和颜色安排节奏。官方博客列出的用途还包括：根据图片或视频参考复刻动画，不手写代码生成表达式或效果，把 Higgsfield 生成的素材放进合成后继续做动画。官方称不需要事先掌握 After Effects。
- **可编辑性**：生成的每一层，包括文字、颜色、时间和动画，都是 AE 原生元素，可以像手工制作的内容一样修改（官方博客 FAQ、更新日志）。
- **模型**：产品页标注「Powered by GPT 6 Astra」。OpenAI 开发者更新日志显示 GPT-6 Astra 于 9 月 3 日发布；Higgsfield 更新日志显示，GPT-6 Astra 9 月 6 日接入其 MCP 与 Supercomputer，9 月 10 日在其 ChatGPT 插件中上线的 Effects 2.0 同样运行在 GPT-6 Astra 上。
- **费用门槛**：需要同时有效订阅 Higgsfield、ChatGPT 与 Adobe After Effects；Higgsfield 生成按网页端相同费率扣积分，ChatGPT 或 MCP 的用量取决于所用套餐和客户端（官方博客）。
- **可用状态**：官方博客与更新日志均按已上线功能介绍，给出了直接使用的步骤，没有提到候补名单。Higgsfield 官方 X 账号 9 月 11 日的发布帖称，其 ChatGPT 插件能理解动画原则、编写表达式，并在 AE 项目中保留上下文，现在即可在 After Effects 中试用。
- **分辨率与时长的官方说法**：官方博客称输出没有固定的分辨率、时长或参考素材上限，可在提示词中指定 1080p、4K 或 8K，时长可要求 5 分钟、30 分钟或更长，代价是生成等待更久；更新日志的写法是「分辨率（1080p 至 8K）与时长在提示词中设定」。RuntimeWire 在报道中指出，这些属于 Higgsfield 的产品说法，尚无来自客户项目的实测。
- **后续更新**：9 月 15 日，Higgsfield 为 After Effects 上线预设库，提供七种基于 GPT Astra 的动效工作流（插画动画、本地化动效、动态设计、纸张拼贴、演示动画、SaaS 动画、白板动画），也打包为 Motion Design Bundle；9 月 23 日推出面向 Claude MCP 的 Production Skills Bundle，含 11 个在 Blender、Adobe 应用、TouchDesigner 与 DaVinci Resolve Studio 中运行的工作流，其中 Premiere Pro 与 After Effects 部分为 Project Sorter、Shot Composer、Shot Cleanup（Higgsfield 更新日志）。
- **此前的 Adobe 插件**：据 No Film School 2026 年 5 月 28 日报道，Higgsfield 发布了面向 Premiere Pro 与 After Effects 的 AI 工具插件。Higgsfield 7 月 21 日的博客介绍，这款插件用同一个安装包覆盖两款软件，面板中有五个核心插件和两个生成工具，功能包括生成视频与图片、调整画幅、去背景、画笔局部编辑、超分（最高 4K 或 8K）以及按描述修改已有素材。Higgsfield 7 月 14 日的更新日志称，这款 AE 插件已可由 Higgsfield Supercomputer 或 Claude（通过 MCP）中的智能体驱动，直接操作合成、图层、关键帧、效果和脚本，并能按描述编写表达式。

## 横向与纵向定位

横向看，2026 年 9 月前后进入 After Effects 与 Premiere Pro 的 AI 功能大致分成两类，交付物也不同：一类把生成能力放进时间线，交付生成好的画面或声音片段；另一类让智能体直接操作软件，交付图层、关键帧、表达式仍可逐项修改的工程。第一类里，Runway 9 月 8 日推出 Premiere Pro 与 After Effects 插件，在软件内的面板里生成图片和视频、对时间线上的素材做风格化，Edit Studio 可对选中片段重绘锚点帧后由 Aleph 2 按原时长重渲染整段，另有 HDR 转换、去背景和超分；Adobe 在 IBC 期间为 Premiere 推出 Generative Media Tool，在轨道上框选一段范围、写提示词、选模型即可生成视频或音效（ProVideo Coalition）；Higgsfield 5 月的 Adobe 插件也属于这一类。第二类里，Adobe 8 月 6 日在 After Effects Beta 版中加入原生 AI Assistant，官方称目前最擅长项目整理和表达式（解读、按描述编写、排查报错），测试期免费、含 Firefly 生成，但有每日与每周用量上限，IBC 期间进入公开测试；Higgsfield 的 AI Motion Designer 同属这一类，入口放在 ChatGPT 或 Claude 等外部对话助手里，把 Higgsfield 的素材生成和 AE 内的搭建放进同一段对话，Adobe 的助手则以面板形式内置在 AE 中。

纵向看，Higgsfield 更新日志里与专业软件相关的条目有两条线：给设计与剪辑软件做插件，以及让 ChatGPT、Claude 等通用助手通过插件或 MCP 调用这些软件。AI Motion Designer 处在两条线的交汇处，它与 Adobe 插件的生成都按网页端费率从同一个 Higgsfield 积分余额中扣除。2026 年 5 月下旬，Higgsfield 先推出 Premiere Pro 与 After Effects 插件，6 月陆续推出 Figma 与 FigJam、Minecraft、DaVinci Resolve、Photoshop 插件，8 月推出 Blender 插件；7 月 14 日起，AE 插件可以由 Claude（通过 MCP）或 Higgsfield Supercomputer 中的智能体驱动；9 月 10 日的 AI Motion Designer 把对 AE 的智能体操作放进了 ChatGPT，并以 GPT-6 Astra 作为驱动模型；之后又补上 AE 动效预设库（9 月 15 日）和覆盖 Blender、Adobe 应用、TouchDesigner、DaVinci Resolve Studio 的 Claude 工作流合集（9 月 23 日）。

> ⚠️ 待核实：「无固定分辨率和时长上限」「可生成 8K、30 分钟以上」为官方产品说法，尚无独立测试；智能体在复杂工程中的成功率、生成的图层结构是否便于设计师接手，需以实际项目检验；官方博客的使用步骤没有写明 ChatGPT 与本机 After Effects 之间如何连接（例如是否需要先安装 Higgsfield 的 Adobe 插件）；上线日期方面，官方博客标注 9 月 10 日，官方更新日志条目与 X 发布帖为 9 月 11 日（UTC）。

**参考来源**：
- Higgsfield 官方博客·AI Motion Designer（2026-09-10）：https://higgsfield.ai/blog/ai-motion-designer-after-effects-gpt
- Higgsfield 产品页·AI Motion Designer：https://higgsfield.ai/ai-motion-designer
- Higgsfield 更新日志（AI Motion Designer、AE 预设库、Production Skills Bundle、AE 插件接入 MCP、GPT-6 Astra 等条目）：https://higgsfield.ai/creator-hub/changelog
- Higgsfield 官方博客·Higgsfield Inside Adobe After Effects（2026-07-21）：https://higgsfield.ai/blog/higgsfield-after-effects
- Higgsfield 官方 X 发布帖（2026-09-11）：https://x.com/higgsfield/status/2098409362041753708
- RuntimeWire（上线日期与产品说法的说明）：https://runtimewire.com/article/higgsfield-chatgpt-after-effects-ai-motion-designer-astra
- No Film School（2026-05-28，Higgsfield 的 Premiere 与 AE 插件）：https://nofilmschool.com/higgsfield-adobe-ai-plugin
- OpenAI 开发者更新日志（2026-09-03 GPT-6 Astra）：https://developers.openai.com/api/docs/changelog
- Runway News·Introducing Runway for Premiere Pro & After Effects（2026-09-08）：https://runway.com/news/company-news/runway-for-adobe
- Adobe 社区公告·After Effects Beta 加入 AI Assistant（2026-08-06）：https://community.adobe.com/announcements-532/new-in-after-effects-beta-after-effects-ai-assistant-1635658
- ProVideo Coalition（2026-09-08，Adobe IBC 更新：Premiere Generative Media Tool 与 AE AI 助手）：https://www.provideocoalition.com/adobes-ibc-release-for-premiere-and-after-effects/
