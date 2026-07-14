---
title: "tt-a1i/archify：纯 HTML 技术图表生成 skill"
date: 2026-07-14
source: "tt-a1i"
src: "https://github.com/tt-a1i/archify"
tags: [设计视觉, 技术图表, Skill]
summary: "生成单文件自包含 HTML 技术图表（内联 SVG）的 skill：五种图表类型（架构/工作流/序列/数据流/生命周期），内置明暗主题切换与 PNG/JPEG/WebP/SVG 导出；零运行时依赖，接受自然语言或 Mermaid 输入，与 drawio-skill 互补。"
---

**简介**：纯 HTML 技术图表生成 skill，支持架构、工作流、序列、数据流、生命周期五种图表类型，产出单文件自包含 HTML（内联 SVG），内置明暗主题切换与 PNG/JPEG/WebP/SVG 多格式导出。

**要点**：零运行时依赖（仅 ajv 作 dev 期 JSON schema 验证）；接受自然语言描述或 Mermaid 代码输入；localStorage 持久化主题，离线时 Google Fonts 自动降级为系统等宽字体；与 drawio-skill 互补——后者出 draw.io 格式便于继续编辑，本工具出独立 HTML 便于直接分享。适合课件、工作坊展示、课题报告配图。

**活跃度**：4,218★ / 更新至 2026-07-14（MIT）；作者 tt-a1i 个人维护，4k★ 反映社区认可。

**安全审查（七项客观事实，审查于 2026-07）**：① 无隐藏指令，SKILL.md 内容与目的一致；② 数据外泄——全部本地生成（standalone HTML + inline SVG），Google Fonts 异步加载、离线可降级，无内容上传；③ 越权——唯一 dev 依赖为知名 JSON schema 库 ajv，无 install 脚本，经 `npx skills add` 或 git clone 安装；④ 无 `curl|bash`、无 base64 混淆、无动态远程执行；⑤ 描述与行为一致，「零依赖」主张与 package.json 相符；⑥ 供应链为 npm（ajv）/ MIT，无私有来源；⑦ 无凭证窃取。

**风险评级**：🟢 低。

> 安全审查基于审查时（2026-07）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/tt-a1i/archify)。
