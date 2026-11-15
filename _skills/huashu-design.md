---
title: "alchaincyf/huashu-design：基于 HTML 的高保真视觉与可编辑 PPTX 综合设计 skill"
date: 2026-10-27
source: "alchaincyf（花叔）"
src: "https://github.com/alchaincyf/huashu-design"
risk: medium
theme: [creative-web, design-teaching]
repo: "alchaincyf/huashu-design"
stars: 26800
pushed: 2026-10-23
stats_at: 2026-11-03
stars_7d: 1350
tags: [设计视觉, 前端设计, PPT, 网页原型, Skill]
summary: "用 HTML 生成网页原型、幻灯片（支持导出 PDF 与可编辑 PPTX）、信息图、iOS 原型与动画视频的综合设计 skill：强制执行「三方向门」候选比选，配 Playwright 渲染 lint、模板装饰黑名单与外观指纹查重。"
---

**简介**：由花叔（alchaincyf）开源的 HTML 高保真视觉综合设计 skill。顶层路由下挂网页/落地页原型、幻灯片（HTML deck 及 PDF / 可编辑 PPTX 导出）、信息图、iOS App 原型、动画视频（MP4/GIF、配音）与专家评审六个模块，附 84 张风格样张及本地体检、外观账本、偏好学习脚本。

**要点**：开篇点名模型常见默认审美（暖奶油底、高反差衬线标题、陶土色点缀、全大写小标签、01/02/03 编号），要求每次从题材重新推导视觉并强制执行「三方向门」（最佳设计师、现实参照截图、风格库轮盘各出候选，挑彼此最不像的 3 张做缩略版供用户选择，落成 `brand-spec.md`、`direction-approved.md` 等门禁文件）；`design_lint.py` 通过 Playwright 渲染获取计算样式，检查字号下限、对比度、模板装饰黑名单，并计算底色/色板/字体/版式向量组成的「外观指纹」防止换皮重复；PPTX 导出支持按 HTML 约束直接生成或从已渲染 DOM 坐标逆向生成并校验文字完整性。MIT 许可。

**作者可信度**：高（花叔 alchaincyf，知名中文 AI 创作者，仓库附详细 `SECURITY.md` 声明数据流与单元测试）。

**安全审查（七项客观事实，审查于 2026-10）**：① 隐藏指令——无隐藏指令或遥测；当缺少同作者其它 skill 时，`capabilities.py` 会提示 `npx skills add alchaincyf/huashu-*` 安装建议，并会将用户对品味的评价写入 `~/.huashu-design/`（须告知用户）；② 外传——核心设计流程纯本地；可选云端配音与视频审稿脚本仅在显式传入 `--yes` 或配置 `HUASHU_CLOUD_OK=1` 时向火山引擎白名单域名发送请求；③ 越权——每 30 天执行一次只读 `git ls-remote --tags` 检查更新；可选的 `hyperframes init` 文档会向 `~/.claude/skills/` 安装多个第三方 skill；④ 远程执行——无混淆、无 `curl|bash`；⑤ 功能与描述一致，但内置风格库中包含部分以真实品牌命名的色彩与版式参考；⑥ 供应链——核心依赖 `pdf-lib`、`playwright`、`pptxgenjs`、`sharp` 有锁文件，部分示例 HTML 从 CDN 加载未锁版本的 `lucide@latest`；⑦ 无凭证窃取，仅在可选云端脚本中按需读取 `.env` 中的对应 API Key。

**风险评级**：🟡 中（偏低；核心流程本地干净，需留意启动版本检查、本地偏好目录写入及示例模板未锁定 CDN 图标版本）。

> 安全审查基于审查时（2026-10）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/alchaincyf/huashu-design)。
