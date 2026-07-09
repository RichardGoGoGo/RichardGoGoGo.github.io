---
title: "Agents365-ai/drawio-skill：自然语言生成技术图表"
date: 2026-07-09
source: "Agents365-ai"
src: "https://github.com/Agents365-ai/drawio-skill"
tags: [设计视觉, 技术图表, drawio, Skill]
summary: "自然语言 → draw.io 技术图表（架构图/UML/ERD/C4/ML 模型/流程图），6 种预设，自带视觉自检，导出 PNG/SVG/PDF/JPG。"
---

**简介**：将自然语言转为 draw.io 技术图表，覆盖架构图、UML、ERD、C4、ML 模型、流程图等 6 种预设，自带视觉自检并可导出 PNG/SVG/PDF/JPG；附 28 个 Python 工具脚本，可从代码 / 基础设施（Python/Go/Terraform/K8s/SQL DDL）反向生成图表，Graphviz 自动排版。

**要点**：本地 CLI 操作为主；28 个反向生成脚本。

**活跃度**：5,392★ / 2026-07-07 更新。作者：多产开发者。

**安全审查（七项客观事实，审查于 2026-07）**：① 无隐藏指令；② 全本地 CLI 操作，CLI 不可用时的 diagrams.net fallback URL 会将 XML 发到 draw.io 官方服务器（仅备用、属官方已知服务）；③ 需本地安装 draw.io CLI（合理需求），Graphviz 可选；④ 无混淆 / 远程执行；⑤ 描述与行为一致；⑥ Python 脚本 + draw.io 官方开源 CLI，无私有来源；⑦ 无凭证窃取。

**风险评级**：🟢 低（diagrams.net fallback 属官方服务，可接受）。

> 安全审查基于审查时（2026-07）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/Agents365-ai/drawio-skill)。
