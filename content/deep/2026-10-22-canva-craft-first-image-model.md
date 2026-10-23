---
title: "Canva Craft：Canva Research 自研的首个图像模型，先规划构图再渲染，最高 2K 输出"
date: 2026-10-22
icat: 模型
source: "Canva Newsroom / TechCrunch / Capital Brief / DesignArena"
src: "https://www.canva.com/newsroom/news/canva-craft/"
tags: [Canva, Canva Craft, Canva Research, 图像生成, Dream Lab, Magic Layers, DesignArena]
summary: "Canva 10 月 22 日发布 Craft，官方称这是 Canva Research 从零构建和训练的首个基础模型。Craft 分两阶段工作：规划模型先写出构图方案（元素、空间关系、比例、视觉层级和画面文字），渲染模型再按方案出图，最高 2K、30 多种长宽比，可在 55 种语言中生成文字。训练数据侧重 Canva 内容库中数百万份人工设计模板。即日起向全球所有 Canva 用户开放（Dream Lab 入口），并开放公共 API；Canva MCP 接入标注为即将推出。发布时在 DesignArena 图像榜排第四，前三为 OpenAI 模型。"
---

2026 年 10 月 22 日（美国太平洋时间中午，Canva 新闻室按澳洲时间标为 10 月 23 日），Canva 在官方新闻室发布图像生成模型 Canva Craft。官方称它是内部 AI 实验室 Canva Research 从零构建和训练的首个基础模型。以下内容以 Canva 新闻室原文为准，模型背景和排名另注明 TechCrunch、Capital Brief 和 DesignArena 榜单来源。

## 已知事实

### 架构

- **两阶段生成**：第一阶段是图像规划模型，读取提示词后写出详细的构图方案，包括出现哪些元素、元素之间的空间关系、相对比例、视觉层级，以及画面中需要出现的文字。第二阶段是渲染模型，把方案转成图像，最高 2K 分辨率，支持 30 多种长宽比，也可自定义比例。
- **官方给出的用途**：先确定构图和排版再渲染，用来提高文字可读性、物体位置准确度，并支持只改某个元素而不牵动整张图。
- **与 Magic Layers 的关系**：Canva 称 Craft 输出更适合用 Magic Layers 转成可编辑的设计图层，并提到用 JSON 边界框辅助这一转换。官方同时写明，更进一步的编辑和参考图能力要在后续版本中提供。
- **语言**：提示词可用任意语言书写，画面内文字可用 55 种语言生成。

### 训练与评估

- **训练数据**：Canva 称多数图像模型主要用照片训练，Craft 的训练更侧重设计，数据包括 Canva 内容库中数百万份人工制作的模板，涵盖海报、社交媒体图、演示文稿、信息图、菜单和以文字排版为主的版式。官方没有说明是否完全不用照片。
- **后训练**：预训练之后做了监督微调和强化学习，并引入 Canva 专业设计师的反馈，目标是指令遵循、文字准确度和整体画质。
- **内部评估**：设计师与数十名研究人员对 25,000 多组图像做了与主流模型的两两对比；自动评测与人工判断不一致时，以设计师意见为准。
- **推理加速**：Canva 称通过蒸馏把推理步数降到原模型的一小部分，并为规划阶段做了定制推理引擎，比第一个内部版本快一个数量级。

### DesignArena 排名

- **总榜**：Canva 称 Craft 首发即在 DesignArena 图像榜排第四。10 月 23 日查看 DesignArena 图像排行榜，Canva Craft 排第四（Elo 1333），前三依次为 GPT-Image-2.5 Sunburst、GPT-Image-2.5 Flare 和 GPT Image 2，均为 OpenAI 模型。官方由此称 Canva Research 是图像生成领域排名第二的 AI 实验室，Capital Brief 报道也按这一说法转述，并注明是初步结果。
- **子类别（Canva 自述）**：人物与肖像（87 个模型中）和风景与自然（85 个模型中）排第一，抽象与图案排第二，产品排第四。
- DesignArena 是众包盲测投票平台，排名反映投票者对同一提示词下出图结果的偏好，不是标准化的技术指标；Elo 分数会随投票变化。

### 开放方式

- **Canva 内**：即日起向全球所有 Canva 用户开放，入口在左下方面板的 Dream Lab。新闻稿未提到需要付费套餐。
- **公共 API**：开发者可通过 Canva 公共 API 调用 Craft，官方举例的场景包括营销平台、电商网站、广告制作和印刷服务。API 的价格和配额，新闻稿未说明。
- **Canva MCP**：标注为即将推出（Coming Soon），届时 AI 助手可在多步任务中直接调用 Craft 生成可用于设计的图像。TechCrunch 报道提到会面向 ChatGPT、Gemini 等第三方聊天助手。
- **后续版本**：Craft-fast 和 Craft-ultrafast 两个低成本版本即将推出，目前尚未上线；官方还表示会继续改进小字和技术图纸等场景。

## 横向与纵向定位

纵向看，Craft 之前 Canva 的生图功能并非只用外部模型。据 TechCrunch 报道，Canva 此前使用过多种图像模型，2024 年收购的 Leonardo.ai 的研究人员也参与了 Craft 的开发；Canva 2025 年还发布过自研的设计理解模型。Craft 的变化在于由 Canva Research 从零训练图像生成底座，TechCrunch 认为这可能帮助 Canva 降低调用外部 API 的成本。

横向看，Craft 在 DesignArena 图像榜位于 OpenAI 三款模型之后，排在 Reve、微软 MAI-Image、xAI Grok Imagine 和 Google Nano Banana 等模型之前。与通用图像模型相比，Craft 的不同之处在于训练数据侧重设计模板，以及把构图和文字规划单独作为一个阶段。对使用 Canva 做海报、社交媒体图和演示文稿的用户来说，主要变化是生成结果可以接着用 Magic Layers 拆成图层，在 Canva 编辑器里继续修改。

> ⚠️ 待核实：DesignArena 子类别排名为 Canva 自述，榜单名次和 Elo 会随投票变化；规划阶段与渲染模型的参数规模、训练数据中模板与照片的比例，官方未公开；公共 API 的价格、支持的长宽比是否与应用内一致，新闻稿未说明；Craft-fast、Craft-ultrafast 与 Canva MCP 接入尚未上线。
