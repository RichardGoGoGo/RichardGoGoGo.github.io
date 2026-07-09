---
title: "总览：AI 进设计课的整体框架与原则"
date: 2026-07-09
tags: [知识库, 设计教学, AI教育]
summary: "AI 辅助设计教学法系列总览：AI 进设计课该按什么框架、守什么原则——五条核心原则与一个可操作的备课自查框架。"
---

> ← 返回主题：[AI 辅助设计教学法](/knowledge/ai-design-teaching/)
>
> 本文是「AI 辅助设计教学法」系列的总览篇，回答一个问题：AI 进设计课，该按什么框架、守什么原则？后续文章（[工具地图](/knowledge/ai-design-teaching-toolmap/)、课程/工作坊设计模板、活动库、评估量规、伦理规范、常见坑）都在此框架下展开。

## 为什么现在要谈这件事

生成式 AI 已经进入设计工作的全流程——调研、构思、出图、原型、评审、交付都有工具可用。多篇 2025–2026 年的设计教育研究指出，问题已经不是"要不要让学生用 AI"，而是"AI 教育目标不该止于教工具操作，而要发展学生与 AI 系统批判性、创造性协作的高阶认知能力"（[SuperSkillsStack, arXiv:2603.07016](https://arxiv.org/pdf/2603.07016)）。核心判断是：工具会迭代，但"怎么和 AI 一起想问题"的能力更持久。

## 五条核心原则

### 1. AI 是协作对象，不是替代品——练的是四种人类能力

`SuperSkillsStack` 框架提出，人机协作设计教育要培养四项相互关联的能力：**Agency（主导权/判断何时该自己决定）、Domain Knowledge（专业知识，判断 AI 输出对不对）、Imagination（想象力，AI 只能补全你提出的方向）、Taste（审美判断，AI 产出的取舍标准）**。这四项是教学设计的锚点：一节课如果只教"怎么写提示词"，没有练到这四项里的任何一项，就没有真正的设计教学价值。（来源：[SuperSkillsStack, arXiv:2603.07016](https://arxiv.org/pdf/2603.07016)）

### 2. 按设计阶段分级使用 AI，而不是从头到尾交给 AI

台湾"国立联合大学"跨系 GenAI 创意设计课程系列采用五阶段流程：**问题定义 → 属性框定 → 关键词提取 → AI 生成 → 人工精修**，学生用 ChatGPT（GPT-4o）、Stable Diffusion XL、Leonardo.ai 等工具，结果显示学生参与度、创意多样性、迭代速度均有提升。（来源：[Strategic Applications of Generative AI in Design Education, doi:10.3390/engproc2025120056](https://doi.org/10.3390/engproc2025120056)）

另一项研究提出"分级使用（graded levels of GenAI use）"框架，按设计阶段限定 AI 介入深度以保留学生的批判性参与，实验组相较对照组在设计形式与美感上提升约 14%，同时时间效率与设计质量也有改善。（来源：[Application of Generative Artificial Intelligence in Design Education, MDPI Eng. Proc. 2673-4591/98/1/29](https://www.mdpi.com/2673-4591/98/1/29)）⚠️ 该 14% 数据来自公开摘要/检索结果，具体实验设计与样本量建议引用前查阅原文核实。

**落地含义**：[工具地图篇](/knowledge/ai-design-teaching-toolmap/)会按"调研 / 构思出图 / 出视频 / 排版 / 评图"分环节给工具，但更重要的是——每个环节该不该用 AI、用到多深，要在教案里明确写清楚，而不是让学生从头到尾把整个设计过程外包给 AI。

### 3. 用"理解 → 应用 → 创造"三级进阶，而不是一刀切要求

联合国教科文组织（UNESCO）的学生 AI 素养框架把能力分为 4 个维度、12 项具体能力，并分三个递进层级：**Understand（理解）→ Apply（应用）→ Create（创造）**。这为课程/工作坊分层设计提供了现成的坐标——基础课练"理解"（AI 能做什么、局限是什么），进阶课练"应用"（在设计流程里用工具解决具体问题），高阶课/毕设练"创造"（用 AI 探索没有先例的设计方向）。（来源：检索自 [The AI competency frameworks for teachers and students](https://en.ichei.org/en/news/information/924.html)，⚠️ 具体条目建议查阅 UNESCO 原始框架文件核实。）

### 4. 光靠"多用 AI 练手"不会自动带来批判性思维，要有结构化的认知支架

一项设计学科的干预实验发现，短期内单纯依赖实践活动和工作坊时长的积累，并不能有效促进学生批判性思维的发展，需要额外的结构化认知支持机制来补足实践的局限；AI 反馈若设计得当（例如作为"自我思考训练与评估"的框架，而非直接给答案），可以帮助填补这个缺口。（来源：[Frontiers in Psychology, 10.3389/fpsyg.2026.1806913](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2026.1806913/full)）

这直接指向后续「课堂活动与作业设计」「评估量规」两篇要解决的问题：活动本身要内置"逼学生说出判断依据"的环节，而不是只看最终图好不好看。

### 5. 伦理与使用边界要在课程一开始就讲清楚，不是事后补救

Online Learning Consortium 提出的 GenAI 使用与伦理框架，把宽泛的 AI 原则转化为面向 K-12 到高等教育都适用的具体阶段、任务与护栏（guardrails），目标是在允许使用生成式 AI 的同时，守住诚信、隐私与公共信任。（来源：[GenAI Use and Ethics Framework, Online Learning Consortium](https://onlinelearningconsortium.org/olc-insights/2025/11/genai-use-and-ethics-framework/)）这部分展开见后续「课堂 AI 使用规范与伦理」专篇。

## 一个可操作的框架小结

综合以上五条，一节/一门 AI 设计课在动笔设计教案前，至少要回答：

1. 这节课练四项能力（Agency / Domain Knowledge / Imagination / Taste）里的哪一项或哪几项？
2. 设计流程的哪个阶段允许用 AI、用到什么深度？（不是"全程可用"或"全程禁用"的二选一）
3. 学生处在理解 / 应用 / 创造哪个层级？课程难度和自由度是否匹配？
4. 活动设计有没有强制学生说出"为什么选这个 AI 输出、为什么改"的环节？
5. 使用边界（署名、数据、诚信）有没有在课程说明里写清楚？

> 以上框架不是纯理论推演——结合设计课的 AI 模块与高校工作营的实际教学持续验证与调整。后续文章会结合具体课堂/工作坊场景，把这些原则落成可直接用的模板与活动。

## 参考来源
- [SuperSkillsStack: Agency, Domain Knowledge, Imagination, and Taste in Human-AI Design Education, arXiv:2603.07016](https://arxiv.org/pdf/2603.07016)
- [Strategic Applications of Generative AI in Design Education, doi:10.3390/engproc2025120056](https://doi.org/10.3390/engproc2025120056)
- [Application of Generative Artificial Intelligence in Design Education: An Exploration and Analysis to Enhance Student Creativity, MDPI](https://www.mdpi.com/2673-4591/98/1/29)
- [The AI competency frameworks for teachers and students（引 UNESCO 框架）](https://en.ichei.org/en/news/information/924.html)
- [Exploring of the impact of AI feedback on college students' critical thinking, Frontiers in Psychology](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2026.1806913/full)
- [GenAI Use and Ethics Framework, Online Learning Consortium](https://onlinelearningconsortium.org/olc-insights/2025/11/genai-use-and-ethics-framework/)
- [Gen-AI-tecture: using generative AI to support architectural students in design tasks, arXiv:2605.21361](https://arxiv.org/pdf/2605.21361)（建筑设计场景补充参考）
- [To Use or to Refuse? Re-Centering Student Agency with Generative AI in Engineering Design Education, arXiv:2510.19342](https://arxiv.org/pdf/2510.19342)（工程设计场景，"学生能不能拒绝用 AI"的讨论）
