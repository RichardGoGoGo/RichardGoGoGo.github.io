# 浅译万道 · 内容转换规范

> 本文档是通用的内容转换规范，不依赖任何特定 AI 工具。
> 可直接粘贴给 Claude、ChatGPT、DeepSeek、Gemini 或任何 AI 使用。

## 一、定位

本站是学习知识沉淀库，收录方法论、工具教程、研究笔记、翻译文档、实践案例与协作项目。站名「浅译万道 · 方法与文章」，支持多作者。

## 二、基本原则

1. 保留作者原意，不补造事实
2. 不虚构引用、来源、案例、数据
3. 无法确认的信息标记为「> ⚠️ 待核查：...」
4. 统一使用简洁、专业的中文学术风格
5. 术语前后一致，标题层级一致

## 三、Markdown 格式要求

### Front Matter（必须）

每篇文章顶部必须包含：

```yaml
---
layout: page
title: "文章标题"
slug: article-slug
summary: "一句话摘要（50字以内）"
author: "作者名"
category: workflows | essays | translations | resources | cases | collaboration
tags: [标签1, 标签2, 标签3]
updated: 2026-03-06
---
```

### 文件命名

- 使用 kebab-case：`prompt-engineering-guide.md`
- 放入对应目录：`content/{category}/{slug}.md`

### 标题层级

- H1：仅用于文章标题（由 front matter title 自动生成，正文不写 H1）
- H2：主要章节
- H3：子章节
- H4：细节说明

### 标签规范

- 3-6 个标签
- 使用小写中文或英文
- 例：[prompt工程, chatgpt, 写作技巧]

## 四、内容模板

根据文章类型选择对应模板：

| 类型 | 模板文件 | 适用场景 |
|------|---------|---------|
| workflow | templates/workflow.md | 步骤型教程、工具链、案例拆解 |
| essay | templates/essay.md | 研究综述、方法论、长文分析 |
| translation | templates/translation.md | 官方文档翻译 |
| resource | templates/resource.md | 资源清单、链接导航 |
| case | templates/case.md | 实践案例、项目复盘 |
| collaboration | templates/collaboration.md | 协作项目、社区互动 |

## 五、语言风格

- 正文：专业但不晦涩，避免口语化
- 删除重复表达、赘述、无意义过渡句
- 术语首次出现时附英文原文：「提示工程（Prompt Engineering）」
- 不使用"众所周知""不难看出"等空话
- 段落之间留白，每段聚焦一个观点

## 六、待核查标记

对无法验证的信息使用：

> ⚠️ 待核查：此处引用的数据未找到原始来源，需作者确认。

## 七、图片与资源引用

- 图片放入 `assets/images/{category}/`
- 引用格式：`![描述](/assets/images/category/filename.png)`
- PDF 等文件放入 `assets/files/`

## 八、代码块

- 始终标注语言类型：```python、```yaml 等
- 可直接复制的提示词使用 ```text 标注
- 长代码块添加注释说明关键步骤
