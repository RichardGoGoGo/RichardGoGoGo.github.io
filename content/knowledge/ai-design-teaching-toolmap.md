---
title: "工具地图：设计各环节用哪些 AI"
date: 2026-07-09
tags: [知识库, 设计教学, AI工具]
summary: "按调研 / 构思出图 / 出视频 / 排版 / 评图五个环节盘点可用的 AI 工具与方法，供备课与工作坊选型参考。"
---

> ← 返回主题：[AI 辅助设计教学法](/knowledge/ai-design-teaching/)
>
> 承接[总览篇](/knowledge/ai-design-teaching-overview/)的原则 2（按设计阶段分级使用 AI）：这里按"调研 / 构思出图 / 出视频 / 排版 / 评图"五个环节盘点可用工具与方法，供备课/工作坊选型参考。工具迭代快，选型以"环节需求"为主，具体品牌可替换。

## 使用前提

按总览篇原则，每个环节列出的工具**不是要求全流程都用**，而是给教师一个"这个环节如果要引入 AI，有哪些选项"的清单。是否引入、引入到什么深度，由课程目标决定。

## 1. 调研 / 构思阶段

- 大语言模型（ChatGPT、Claude 等）在这一阶段主要用作"思考伙伴"：梳理设计简报（brief）、汇总用户调研发现、写提示词供后续出图工具使用、生成评图检查清单。（来源：[ChatGPT for Design in 2026, coursiv.io](https://coursiv.io/blog/chatgpt-for-design-2026)，⚠️ 该文为工具厂商/内容站博客，非学术来源，仅作趋势参考）
- 情绪板（moodboard）类工具：Adobe Firefly Boards、Storyflow、Inspo AI 等可以把"生成—编辑—整理视觉参考"整合在一个工作区，官方/行业文章称可将传统需要 4–8 小时的情绪板制作压缩到分钟级。（来源：[Best Mood Board and Storyboard AI Tools, Medium](https://medium.com/@nakpil/next-level-mood-boards-and-storyboards-best-practices-for-using-ai-tools-in-adobe-firefly-boards-a54d286e110c)、[AI-Generated Moodboards, Inspo AI 博客](https://www.inspoai.io/blogs/ai-generated-moodboard)）⚠️ 具体耗时数据来自厂商/内容营销类文章，未做独立核实，教学时按实际测试为准。

## 2. 出图（构思可视化）阶段

- 学术研究里验证过的组合：**ChatGPT（GPT-4o）负责关键词提炼与提示词生成 → Stable Diffusion XL / Leonardo.ai 负责生成 → 人工精修**，这是台湾国立联合大学跨系 GenAI 设计课程系列采用的五阶段流程的核心环节，实测能提升学生的创意多样性与迭代速度。（来源：[Strategic Applications of Generative AI in Design Education, doi:10.3390/engproc2025120056](https://doi.org/10.3390/engproc2025120056)）
- 出图类常用工具还包括 Midjourney、ComfyUI、ControlNet（精确控制构图/姿态）等，具体选型看课程对"可控性 vs 生成自由度"的需求。

## 3. 出视频阶段

这一环节工具迭代最快，中文行业文章多为内容营销性质，本轮暂不引用具体产品与数据，**待更权威的评测或学术来源后再补充**，避免用未经核实的营销信息误导教学选型。

## 4. 排版 / 版式 / 演示文稿

这一环节有三个经安全评估、风险较低的 skill 可参考或用于教学素材制作：

- **`op7418/guizang-social-card-skill`**：小红书图文（1080×1440）+ 公众号封面对（21:9+1:1），Editorial/Swiss 两套视觉风格，28 版式 × 10 主题，HTML → PNG 直接出图。解决"配图只给提示词、还要手动去 MJ"的痛点，适合课程宣传物料、课堂案例展示。（来源：[op7418/guizang-social-card-skill](https://github.com/op7418/guizang-social-card-skill)；经安全评估：无 curl|bash、无凭证读取，联网仅向 Unsplash/Pexels 等取图且自动记录来源，透明）
- **`JimLiu/baoyu-design`**：本地版 UI mockup / 原型 / 幻灯片 / 线框图生成，自包含 HTML 本地预览，Figma `.fig` 离线解码，PPTX 走本地 Playwright，输出全本地不上传，适合作品集排版、竞赛提案 deck。（来源：[JimLiu/baoyu-design](https://github.com/JimLiu/baoyu-design)；经安全评估：无 curl|bash、无凭证外传）
- **`LearnPrompt/humanize-ppt`**：基于对 50+ 场 TED 演讲的研究提炼出的叙事结构，做 PPT 提纲编排（AST-based），本体"零 API、零密钥"，只产出渲染 Brief，交给下游工具出图/出 HTML。适合教"怎么把设计思路讲清楚"这类演示技能课。（来源：[LearnPrompt/humanize-ppt](https://github.com/LearnPrompt/humanize-ppt)；⚠️ 经安全评估：本体干净，但下游依赖 guizang-ppt-skill / baoyu-image-gen 等尚未全审，正式引入前需再审下游）

> 三者的客观介绍与安全评估详见本站 [SKILL 栏目](/skills/)；工具版本与许可迭代较快，引入课堂前建议再核一次最新版本。

## 5. 评图 / 反馈阶段

- ChatGPT 一类工具可用于生成"评图检查清单"（critique checklists），辅助无障碍/可用性检查。（来源：[ChatGPT for Design in 2026, coursiv.io](https://coursiv.io/blog/chatgpt-for-design-2026)，⚠️ 内容营销类来源，趋势参考）
- 更重要的是方法而非工具：研究发现 AI 反馈若被设计成"自我思考训练与评估框架"（追问学生"为什么"而非直接给分），比单纯让学生多做几轮练习更能提升批判性思维。具体活动设计见后续「课堂活动与作业设计」「学生 AI 作业怎么评」两篇。（来源：[Frontiers in Psychology, 10.3389/fpsyg.2026.1806913](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2026.1806913/full)）

## 本轮未纳入 / 待补

- 出视频工具：找到权威评测来源后再补（本轮检索到的中文来源多为内容营销号，未纳入具体产品名与数据，避免以未核实信息指导教学选型）。
- 调研阶段的情绪板工具具体效率数据（4–8 小时→分钟级）来自厂商/内容站，未做独立核实，标 ⚠️待核实。

## 参考来源
- [Strategic Applications of Generative AI in Design Education, doi:10.3390/engproc2025120056](https://doi.org/10.3390/engproc2025120056)
- [ChatGPT for Design in 2026, coursiv.io](https://coursiv.io/blog/chatgpt-for-design-2026)
- [Best Mood Board and Storyboard AI Tools, Medium](https://medium.com/@nakpil/next-level-mood-boards-and-storyboards-best-practices-for-using-ai-tools-in-adobe-firefly-boards-a54d286e110c)
- [AI-Generated Moodboards, Inspo AI 博客](https://www.inspoai.io/blogs/ai-generated-moodboard)
- [Exploring of the impact of AI feedback on college students' critical thinking, Frontiers in Psychology](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2026.1806913/full)
