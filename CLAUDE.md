# 浅译万道 · Claude Code 项目规则

## 工作流
1. 读取 `STYLE-GUIDE.md` 了解通用转换规范
2. 读取 `templates/` 下的对应模板了解目标结构
3. 读取 `prompts/` 下的对应提示词了解具体任务
4. 原稿在 `drafts/`，整理后输出到 `content/{category}/`
5. 除非明确要求，不直接修改 `_layouts/`、`_includes/`、`_sass/`

## 文件权限
- 可读写：drafts/, content/, templates/, prompts/, assets/
- 谨慎修改：index.md, _config.yml
- 不得修改（除非明确要求）：_layouts/, _includes/, _sass/, js/

## 输出约束
- 遵循 STYLE-GUIDE.md 的所有规范
- 不新增原稿中没有依据的事实
- 不虚构来源或引用
- 只输出最终 Markdown，不加解释性废话
