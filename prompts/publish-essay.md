# 发布研究笔记

> 本提示词可用于 Claude Code、ChatGPT、DeepSeek 或任何 AI 工具。

## 输入

1. 原稿文件：`drafts/{input_filename}`
2. 模板文件：`templates/essay.md`
3. 转换规范：`STYLE-GUIDE.md`

## 任务

- 将原稿整理为学术风格长文
- 明确摘要、关键词、问题定义、主体分析、讨论、结论
- 保留作者判断，不夸大、不补造
- 统一学术表达风格
- 生成 front matter：layout: page, title, slug, summary, author, category: essays, keywords, tags, updated
- 输出到：`content/essays/{slug}.md`

## 约束

- 不生成虚假引文
- 没有来源的信息不得包装成"研究结论"
- 对需要作者复核的句子标注「⚠️ 待核查」
- 遵循 STYLE-GUIDE.md 的所有规范
