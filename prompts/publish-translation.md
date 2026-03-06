# 发布翻译文档

> 本提示词可用于 Claude Code、ChatGPT、DeepSeek 或任何 AI 工具。

## 输入

1. 原稿文件：`drafts/{input_filename}`
2. 模板文件：`templates/translation.md`
3. 转换规范：`STYLE-GUIDE.md`

## 任务

- 将原稿整理为标准翻译页面
- 包含译者说明、原文信息、正文翻译、译注
- 确保翻译准确，术语一致
- 生成 front matter：layout: page, title, slug, summary, author, source_url, source_title, category: translations, tags, updated
- 输出到：`content/translations/{slug}.md`

## 约束

- 翻译忠于原文，不擅自删减或添加
- 需要意译的段落标注说明
- 遵循 STYLE-GUIDE.md 的所有规范
