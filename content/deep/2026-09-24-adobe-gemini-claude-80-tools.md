---
title: "Adobe 工具接入 Google Gemini，Claude 插件并入 Acrobat 并扩至 80 多个工具"
date: 2026-09-24
icat: 产品
source: "Adobe / Google / Anthropic"
src: "https://blog.adobe.com/en/publish/2026/09/24/adobe-comes-to-gemini-expands-what-you-can-do-in-claude"
tags: [Adobe, Gemini, Claude, Acrobat, Firefly, 连接器]
summary: "Adobe 9 月 24 日推出 Adobe in Gemini，用户可在 Gemini 对话中调用 Photoshop、Lightroom、Express 和 Firefly 的工具；同日 Adobe for Claude 插件首次并入 Acrobat 工具，可调用的工具增至 80 多个，并新增 PDF 与 Express 设计的交互式编辑器。两项均从当日起在全球逐步推出，Gemini 端目前仅支持英文。"
---

2026 年 9 月 24 日，Adobe 在官方博客宣布两项对话式 AI 平台接入。第一项是 Adobe in Gemini：用户在 Google Gemini 中描述想要的结果，由 Adobe 调用 Photoshop、Lightroom、Adobe Express 和 Firefly 的工具，完成修图、营销素材制作和设计修改。第二项是 Adobe for Claude 插件更新：首次加入 Acrobat 工具，与原有的创意工具合并为一个插件，可调用的工具增至 80 多个，并新增面向 PDF 和 Express 设计的交互式编辑器。两项都从当天起在全球逐步推出。

## 已知事实

- **Gemini 端的用法**：Adobe 称，用户描述想要的结果后，由 Adobe 编排所需的工具和步骤。官方给了三个例子：上传产品照片并描述想要的效果，由 Adobe 优化光线与色彩、统一裁切，整理成可用于店铺、网站或营销物料的一组图片；把一个设计改成适合各社交渠道的版本，同时保留品牌元素和信息；描述活动、目标受众和风格后，由 Adobe 推荐 Express 模板，再按需修改文字、图片和配色。
- **Gemini 端的使用条件**：Adobe 称 Adobe in Gemini 覆盖所有 Gemini 订阅档位，入口在 Personal Intelligence 设置的 connected apps 中，需要登录 Adobe 账号（可免费注册）。Google 的 Connected Apps 可用性表对 Adobe 的限定是：仅限个人 Google 账号、18 岁以上、仅支持英文，可在 Gemini 网页版和移动 App 中使用。Google 帮助文档另外说明，关闭「保留活动记录」（Keep Activity）后，网页版和 iOS 上无法使用 Connected Apps。
- **Gemini 端的背景**：Google 于 9 月 23 日开始推出新一批 Connected Apps，创意类包括 Adobe、Picsart、Squarespace 和 Webflow。Adobe 把这次上线称为与 Google 合作、把工具带进 Gemini 的「第一步」，并称之后会继续增加创意和生产力工具。
- **Claude 端并入 Acrobat**：Adobe for Claude 插件首次加入 Acrobat 工具。Adobe 称用户可在同一个 Claude 对话中调用 80 多个工具，涉及 Acrobat、Express、Photoshop、Illustrator、Premiere、Lightroom、InDesign、Adobe Stock 等产品。新增的 PDF 处理包括删除、合并、拆分页面，涂黑（redact）敏感信息，以及把 PDF 转换或导出为其他格式。
- **Claude 端的交互式编辑器**：PDF 可以在新的交互式编辑器中调整页面顺序、编辑文字、添加批注和高亮；也可以调用新的 Document Review 技能，让 Claude 分析文档，并把建议和标注直接写进编辑器。Express 设计新增基于图层的交互式编辑器，可单独选择并修改图片、文案、颜色和字体，不必重新生成整个设计。按 Adobe 的说法，用户仍可只描述结果、交给插件编排，也可以直接进入内容手动修改。
- **Claude 端的使用条件**：插件在 Claude 和 Claude Code 的桌面端、移动端、网页端推出。可以访客身份使用；登录 Adobe 账号后可获得更高的使用额度、更多工具和跨会话延续。已安装旧版 Adobe 连接器的用户会自动更新到新插件。

## 横向与纵向定位

纵向看，Adobe 进入第三方对话平台的时间线如下：2025 年 12 月 10 日，Photoshop、Adobe Express 和 Acrobat 以三个独立应用进入 ChatGPT，对 ChatGPT 用户免费；2026 年 4 月 28 日，Adobe for creativity 连接器在 Claude 上线，提供来自 Photoshop、Illustrator、Firefly、Express、Premiere、Lightroom、InDesign 和 Stock 的 50 多个工具；5 月 19 日 Google I/O 期间，Adobe 宣布连接器将在「未来几周」进入 Gemini；8 月 6 日，ChatGPT 端的分立应用合并为统一的 Adobe 插件，工具超过 70 个，也可在 ChatGPT Work 和 Codex 中使用，当时 Adobe 称 Slack 和 Gemini 版本「即将推出」；9 月 2 日，Adobe for Slack 面向 Slack Business+ 和 Enterprise+ 团队上线，同样超过 70 个工具；9 月 24 日，Gemini 版上线，Claude 插件增至 80 多个工具。从 5 月的预告到 Gemini 版实际推出，间隔约四个月。按官方描述，Gemini 首批只覆盖 Photoshop、Lightroom、Express 和 Firefly 四款应用的工具，ChatGPT 与 Claude 插件还包括 Acrobat、Premiere、Illustrator、InDesign 等。

与这些外部接入并行，Adobe 也在做自有的对话式入口：Firefly AI Assistant 于 4 月 27 日开始公测，Adobe 在 5 月的博客中称它将提供 60 多个工具；Adobe 在 8 月的 ChatGPT 插件博客中称，插件调用的工具与 Adobe 应用内自有智能体使用的是同一批。技术接口方面，Adobe 2025 年 12 月的新闻稿称，其 ChatGPT 应用建立在基于智能体 AI 和 Model Context Protocol（MCP）的对话式体验工作之上；Slack 首席产品官在 Adobe for Slack 公告中把这款应用称为 Slack 中 MCP 应用的一个例子。在 Gemini、Claude、ChatGPT 三处，Adobe 对工作方式的描述一致：用户描述结果，由 Adobe 一侧编排调用哪些工具、按什么顺序执行。

横向看，同期把设计与创作工具接入对话助手的还有其他厂商。Google 5 月 19 日宣布 Gemini 可连接更多第三方应用，首批为 OpenTable、Canva 和 Instacart，并预告 Adobe 等合作方将陆续加入；Anthropic 4 月 28 日与 Adobe 连接器一同发布的创意类连接器还包括 Blender、Autodesk Fusion、SketchUp、Affinity by Canva 等；TechCrunch 9 月 2 日的报道提到，Canva、Figma 也在把能力接入 ChatGPT 和 Claude。Adobe 在本次公告中的解释是，越来越多的工作从 AI 对话平台开始，需要更高精度时可以回到 Adobe 的旗舰应用中继续。

> ⚠️ 待核实：Adobe 公告未列出「80 多个工具」的完整清单，访客与登录用户各自可用的工具范围也未逐项说明；Gemini 端首批工具的数量未公布；Gemini 端目前仅支持英文，中文指令的效果和其他语言的开放时间未说明，可用地区以 Gemini 与 Adobe 各自的支持地区为准；各项功能对 Adobe 付费订阅的要求，官方只说明登录账号可解锁更多工具和额度。

**参考来源**：
- Adobe 官方博客（本次公告）：https://blog.adobe.com/en/publish/2026/09/24/adobe-comes-to-gemini-expands-what-you-can-do-in-claude
- Google 官方博客（新一批 Connected Apps）：https://blog.google/innovation-and-ai/products/gemini-app/new-connected-apps-gemini/
- Gemini 帮助中心（Connected Apps 可用性与要求）：https://support.google.com/gemini/table/17434654?hl=en
- Gemini 帮助中心（Keep Activity 与 Connected Apps）：https://support.google.com/gemini/answer/13695044?hl=en
- Adobe 博客（2026-04-28，Claude 连接器上线）：https://blog.adobe.com/en/publish/2026/04/28/adobe-for-creativity-connector
- Anthropic（2026-04-28，Claude for Creative Work）：https://www.anthropic.com/news/claude-for-creative-work
- Adobe 博客（2026-05-19，预告接入 Gemini）：https://blog.adobe.com/en/publish/2026/05/19/adobe-creativity-connector-coming-google-gemini
- Adobe 博客（2026-08-06，ChatGPT 统一插件）：https://blog.adobe.com/en/publish/2026/08/06/introducing-adobe-chatgpt-create-edit-get-work-done-all-in-chatgpt
- Adobe 新闻稿（2025-12-10，Photoshop、Express、Acrobat 进入 ChatGPT）：https://news.adobe.com/news/2025/12/adobe-photoshop-express-acrobat-chatgpt
- Adobe 博客（2026-09-02，Adobe for Slack）：https://blog.adobe.com/en/publish/2026/09/02/introducing-adobe-for-slack
- Gemini 版本说明（2026-05-19 条目）：https://gemini.google/release-notes/
- TechCrunch（Adobe for Slack 报道）：https://techcrunch.com/2026/09/02/adobe-is-making-its-tools-available-in-slack/
- PetaPixel（Gemini 接入报道）：https://petapixel.com/2026/09/25/you-can-edit-your-photos-with-lightroom-and-photoshop-inside-google-gemini/
