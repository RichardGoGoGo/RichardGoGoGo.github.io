# 实践案例发布提示词

## 任务
将 `drafts/` 中的实践案例原稿整理为标准化 Markdown，输出到 `content/cases/`。

## 输入
- 原稿文件：`drafts/{filename}`
- 参考模板：`templates/case.md`
- 转换规范：`STYLE-GUIDE.md`

## 输出
- 文件路径：`content/cases/{slug}.md`
- 文件格式：标准 Markdown + YAML front matter

## 要求
1. 按照 `templates/case.md` 的章节结构组织内容
2. front matter 中 category 设为 `cases`
3. 突出「背景→挑战→方案→实施→成果→经验」的叙事逻辑
4. 保留原稿中的具体数据、截图引用和代码片段
5. 不虚构任何结果或数据
6. 遵循 STYLE-GUIDE.md 的所有格式与语言规范
