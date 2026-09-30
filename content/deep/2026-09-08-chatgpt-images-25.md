---
title: "OpenAI 发布 ChatGPT Images 2.5：新增 Sketch 手绘参考与模板，API 推出 GPT-Image-2.5 Flare 和 Sunburst"
date: 2026-09-08
icat: 模型
source: "OpenAI / SiliconANGLE / Android Headlines"
src: "https://openai.com/index/introducing-chatgpt-images-2-5/"
tags: [OpenAI, ChatGPT, GPT-Image-2.5, Sketch, 图像生成, API]
summary: "OpenAI 9 月 8 日发布 ChatGPT Images 2.5，官方称生成延迟较 Images 2.0 最多降低 50%，并新增 Sketch 手绘参考、模板、图上评论和提示词分享；API 同步推出 GPT-Image-2.5 Flare 与 Sunburst，两者沿用 GPT Image 2 的 token 费率，图像输入与输出分别为每百万 token 8 美元和 30 美元。"
---

2026 年 9 月 8 日，OpenAI 发布 ChatGPT Images 2.5，向所有档位的 ChatGPT、ChatGPT Work 和 Codex 用户开放，覆盖桌面、移动和网页端。OpenAI 在发布博文中称，每周有超过 30 亿张图像通过 ChatGPT Images 和 API 中的 GPT-Image 模型生成。同日 API 上线两款新模型 GPT-Image-2.5 Flare 和 GPT-Image-2.5 Sunburst，OpenAI 也发布了 ChatGPT Images 2.5 的 system card。

## 已知事实

- **生成质量（官方表述）**：光线更自然、纹理更丰富；更好地保留参考照片中的主体；多轮对话中更可靠地遵循编辑指令，此前的修改更可能保持不变；更擅长只修改指定的内容，主体和背景复杂时也是如此；含现实信息的图像更准确，能处理包括透明背景在内的更复杂版式，对指定视觉风格的还原更准确。system card 另提到信息图的准确性和版式有改进。
- **速度**：官方称与 Images 2.0 相比，图像生成延迟最多降低 50%。在 API 端，官方称 Flare 与 GPT-Image-2 相比延迟低 50%、画质更高。早期客户 Manus 在 OpenAI 博文中称，在其评估中 Flare 的生成速度为 GPT-Image-2 的 2–4 倍。
- **Sketch**：在 ChatGPT 中输入「@Sketch」即可直接绘图，把草图作为最终图像的参考。官方举的例子是快速勾勒房间布局、构思中的服装轮廓或随手涂鸦，再补充风格描述等细节。
- **模板、评论与分享**：模板面向传单、产品照片等常见格式，官方举例「海报」「周边商品」，选定后再补充要传达的信息、设计元素或风格；可以直接在图像上添加评论，做针对性修改；分享图像时可以附上生成所用的提示词，他人可换上自己的照片和细节重做。据 Android Headlines 报道，模板还覆盖图标、Logo 等格式，并以逐步提问的方式引导用户选择风格和光线。
- **API 的两款模型**：Flare 是大多数应用的默认选择，官方称其为 OpenAI 用于高质量日常图像生成的最快模型，列出的适用场景有创作者与社交内容、产品体验、视觉搜索、快速图像原型和大批量生成。Sunburst 在多次编辑中提供更精细的控制，生成时间更长，面向可直接投放的营销创意和精修的产品图，官方称其为 OpenAI 目前能力最强的图像生成与编辑模型。两者都可在 Image API 中直接调用，也可作为 Responses API 图像生成工具的模型，支持 low、medium、high、xhigh、max、auto 质量档，当前快照日期为 2026-09-08。
- **API 定价**：两款模型价格相同，沿用 GPT Image 2 的 token 费率：图像输入每百万 token 8 美元（缓存输入 2 美元），图像输出每百万 token 30 美元，文本输入每百万 token 5 美元（缓存输入 1.25 美元）。OpenAI 注明，GPT Image 2 的费用计算器不能用来估算 2.5 的 token 消耗。
- **旧模型下线安排**：OpenAI 弃用页面把这两款模型列为以下旧模型的推荐替代：gpt-image-1（2026 年 10 月 23 日下线），gpt-image-1-mini、gpt-image-1.5 和 chatgpt-image-latest（2026 年 12 月 1 日下线）。截至 9 月 30 日，gpt-image-2 不在弃用列表中。
- **来源标识**：system card 称，Images 2.5 继续通过 C2PA 符合性计划使用 C2PA 元数据，并在 ChatGPT、Codex 和 OpenAI API 中加入 Google DeepMind 的 SynthID 不可见水印。

## 横向与纵向定位

纵向看，OpenAI 今年的图像模型更新较密：GPT Image 2 于 4 月 21 日进入 API，据 SiliconANGLE，ChatGPT Images 2.0 也在 4 月推出；DALL·E 2 和 DALL·E 3 于 5 月 12 日从 API 移除；8 月 20 日，gpt-image-2 在 API 中以预览形式支持透明背景；9 月 8 日发布 2.5，API 端分为侧重速度的 Flare 和侧重编辑精度的 Sunburst，两者价格相同。gpt-image-1 系列和 chatgpt-image-latest 将在 10 月和 12 月陆续下线，官方给出的迁移目标都是 2.5 的两款模型。

横向看，发布当天 OpenAI 博文列出的早期客户有 Adobe、Manus、Runway 和 Higgsfield AI，其中 Adobe 称 GPT-Image-2.5 模型已加入 Firefly；ComfyUI 次日（9 月 9 日）发布的 v0.35.0 新增了 GPT Image 2.5 Flare 与 Sunburst 合作节点。编辑类功能方面，Midjourney 8 月 27 日开始让所有用户测试其首个 V8.2 图像编辑模型，支持文字指令编辑、最多 4 张参考图、局部重绘和扩图。透明背景是同期多家都在推进的能力：OpenAI 在 8 月为 gpt-image-2 开放透明背景预览，2.5 博文提到对含透明背景的复杂版式处理更好；阿里 Qwen 团队 9 月 20 日发布的 Qwen-Image 2.1 可直接生成带 alpha 通道的图像。

> ⚠️ 待核实：「延迟最多降低 50%」来自 OpenAI，「2–4 倍速度」来自客户 Manus 的评估，均未公布测试条件；Sketch 和模板在各地区、各语言、各端的可用情况，官方只给出总体开放范围；Flare 与 Sunburst 的画质差异，官方只给出定位描述，没有公布对比数据；单张图像的实际费用取决于 token 消耗，OpenAI 提示旧计算器不适用。

**参考来源**：
- OpenAI 官方博客（发布公告）：https://openai.com/index/introducing-chatgpt-images-2-5/
- OpenAI ChatGPT Images 2.5 System Card：https://deploymentsafety.openai.com/chatgpt-images-2-5
- OpenAI API Changelog（9 月 8 日条目）：https://developers.openai.com/api/docs/changelog
- GPT-Image-2.5 Flare 模型页：https://developers.openai.com/api/docs/models/gpt-image-2.5-flare
- GPT-Image-2.5 Sunburst 模型页：https://developers.openai.com/api/docs/models/gpt-image-2.5-sunburst
- OpenAI API 弃用页面：https://developers.openai.com/api/docs/deprecations
- SiliconANGLE（发布报道）：https://siliconangle.com/2026/09/08/openais-chatgpt-images-gets-faster-with-sharper-details-and-more-refined-edits/
- Android Headlines（模板与编辑工具细节）：https://www.androidheadlines.com/2026/09/openai-launches-chatgpt-images-2-5-sketch-editing-tools.html
- Midjourney 官方更新（Edit Model for V8）：https://updates.midjourney.com/edit-model-for-v8/
- ComfyUI v0.35.0 GitHub Release：https://github.com/Comfy-Org/ComfyUI/releases/tag/v0.35.0
- Qwen-Image 2.1 模型卡（Hugging Face）：https://huggingface.co/Qwen/Qwen-Image-2.1
