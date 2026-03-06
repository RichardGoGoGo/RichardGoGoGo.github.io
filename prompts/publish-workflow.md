# 发布工作流文章

> 本提示词可用于 Claude Code、ChatGPT、DeepSeek 或任何 AI 工具。

## 输入

1. 原稿文件：`drafts/{input_filename}`
2. 模板文件：`templates/workflow.md`
3. 转换规范：`STYLE-GUIDE.md`

## 任务

- 将原稿整理为适合网站发布的 workflow 页面
- 保留原稿观点与信息边界
- 删除重复表达与口语赘述
- 统一术语、标题层级与步骤编号
- 生成 front matter：layout: page, title, slug, summary, author, category: workflows, tags, updated
- 对无法确认的内容使用 `> ⚠️ 待核查：...`
- 输出到：`content/workflows/{slug}.md`

## 约束

- 不新增原稿中没有依据的事实
- 不虚构来源
- 不写解释性废话
- 只输出最终 Markdown 正文
- 遵循 STYLE-GUIDE.md 的所有规范
