---
title: "cathrynlavery/diagram-design：编辑出版风格的示意图 skill（45 种图型）"
date: 2026-10-13
source: "Cathryn Lavery"
src: "https://github.com/cathrynlavery/diagram-design"
risk: low
theme: [design-teaching, creative-web]
repo: "cathrynlavery/diagram-design"
stars: 61261
pushed: 2026-10-26
stats_at: 2026-10-26
tags: [设计视觉, 示意图, 科研配图, Skill]
summary: "把需求或 draw.io、Mermaid、Excalidraw 源文件重绘成编辑出版风格的单文件 HTML + 内联 SVG 示意图，覆盖 45 种图型，可导出 SVG / PNG；对节点、连线、强调色数量设密度上限，配几何校验脚本。"
---

**简介**：示意图 skill，把文字需求或 draw.io、Mermaid、Excalidraw 源文件重绘成编辑出版风格的单文件 HTML + 内联 SVG，覆盖 45 种图型，可导出 SVG 和 PNG。

**要点**：先选「语义模式」再选「视觉类型」的两级选型；能用表格或一段话说清的就不画图；每张图约 9 个节点、12 条连线、强调色不超过 2 种的密度上限；6 条连线硬规则（直角折线、标签垫底留隙、挂点均分、不从无关节点背后穿过等）配几何校验脚本；重绘旧图时「先抽内容、不照搬版面」，并给出保真清单；色板可换皮，有客户样式预设。默认加载 Google Fonts，中文只带繁体 Noto TC。MIT。

**作者可信度**：中高（Cathryn Lavery，BestSelf.co 创始人；311 次提交、15 篇架构决策记录，SECURITY.md 与 PRIVACY.md 齐全，有 Trail of Bits 安全工程师参与贡献）。

**安全审查（七项客观事实，审查于 2026-10）**：① SKILL.md 与参考文档无推广、遥测或反馈指令；② 脚本只用 Python 标准库读写本地文件，无网络调用，PRIVACY.md 写明无服务端、无统计、无遥测；③ 命令声明 Bash 与 Write 权限，会改写自带的 style-guide.md、写入 ~/.diagram-design/profiles/（覆盖前确认），按网址取品牌色前须用户确认，网页内容按不可信数据处理；④ 唯一的 base64 用于解码 draw.io 自身的压缩格式，无 eval、curl|bash 或远程拉代码；⑤ 描述中的 45 种图型与参考文档一一对应，由 CI 强制同步；⑥ 无运行时依赖、无安装脚本，导出 PNG 需要 Playwright，只检测不自动安装；⑦ 无凭证读取。

**风险评级**：🟢 低。

> 安全审查基于审查时（2026-10）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/cathrynlavery/diagram-design)。
